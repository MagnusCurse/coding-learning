from pyspark.sql import SparkSession
from pyspark.sql.functions import col  # the count is every user's rating counting
# The agg() function in this code is used to apply one or more aggregate functions to a DataFrame after grouping it by a specific column (in this case, "title").
from pyspark.sql.functions import count
# Get the pivot table of final data "ratings"
from pyspark.sql.functions import avg
from pyspark.sql.functions import monotonically_increasing_id
import numpy as np
from scipy.sparse import csr_matrix
from sklearn.neighbors import NearestNeighbors

spark.stop()

# create session with adjusted memory settings based on your cluster
# .config("spark.local.dir", r"E:\Apache Spark\spark-temp"): change the spark local dir, as the c disk memory is not enough, may cause Py4JJavaError exception ***
spark = SparkSession.builder.appName("MovieRecommender_SQL_Movielens") \
    .config("spark.executor.memory", "32g") \
    .config("spark.driver.memory", "16g") \
    .config("spark.local.dir", r"E:\Apache Spark\spark-temp") \
    .config("spark.jars", r"D:\MySQL\MySQL ConnectorJ\mysql-connector-j-8.4.0\mysql-connector-j-8.4.0\mysql-connector-j-8.4.0.jar") \
    .getOrCreate()

spark.conf.set("spark.sql.pivotMaxValues", 20000)  # Adjust based on your data

movie_pivot_indexed_collected = None


def read_movies():
    movies = spark.read \
    .format("jdbc") \
    .option("url", "jdbc:mysql://localhost:3307/db_movie_recommender_sys?useSSL=false&serverTimezone=UTC") \
    .option("dbtable", "tb_movie") \
    .option("user", "root") \
    .option("password", "137162") \
    .option("driver", "com.mysql.cj.jdbc.Driver") \
    .load()

    return movies

def read_ratings():
    ratings = spark.read \
    .format("jdbc") \
    .option("url", "jdbc:mysql://localhost:3307/db_movie_recommender_sys?useSSL=false&serverTimezone=UTC") \
    .option("dbtable", "tb_rating") \
    .option("user", "root") \
    .option("password", "137162") \
    .option("driver", "com.mysql.cj.jdbc.Driver") \
    .load()

    rating_count = ratings.groupBy("user_id") \
       .count() \
       .orderBy(col("count"), ascending=False)
    
    rating_count_nums_row = rating_count.count()

    user_ids = rating_count.select("user_id")

    user_id_list = [row['user_id'] for row in user_ids.collect()]  # get the user id list

    # filters the ratings DataFrame to include only rows with user IDs that are in y—that is, 
    # only ratings by users with more than 200 ratings.
    ratings = ratings.filter(ratings.user_id.isin(user_id_list))

    return ratings

def analyze_movies_ratings():
    ratings = read_ratings
    movies = read_movies

    ratings_with_movies = ratings.join(movies, on="movie_id", how="inner") # join the ratings with the movies
    ratings_with_movies = ratings_with_movies.dropDuplicates(['movie_id', 'user_id']) # this is quite important, each user can rate the same movie multiple times
    
    rating_count_every_title = ratings_with_movies.groupBy('title').agg(count('rating').alias('rating_count'))

    ratings_with_movies = ratings_with_movies.join(rating_count_every_title, on='title', how='inner')
    ratings_with_movies = ratings_with_movies.filter(ratings_with_movies['rating_count'] >= 50)

    user_id_count = ratings_with_movies.groupBy('user_id').count().orderBy("count", ascending=False).show()

    return ratings_with_movies


def get_movie_sparse():
    ratings_with_movies = analyze_movies_ratings

    # Pivot the table with user_id as columns, title as rows, and average rating as values
    movie_pivot = ratings_with_movies.groupBy("title") \
                            .pivot("user_id") \
                            .agg(avg("rating")) \
                            .fillna(0)  # Optional: Replace nulls with 0
    
    movie_pivot = movie_pivot.withColumn("index", monotonically_increasing_id())  # Add an "index" column using monotonically_increasing_id()
    movie_pivot_indexed = movie_pivot.select("index", *[col for col in movie_pivot.columns if col != "index"]) # Reorder columns: Move "index" to the first column

    movie_pivot_indexed_collected = movie_pivot_indexed.collect()

    movie_pivot_pandas = movie_pivot_indexed.toPandas()

    # remove the non-numeric 'title' column
    # (Alternatively, if 'title' is the index, you could reset the index or extract it separately)
    numeric_matrix = movie_pivot_pandas.drop(columns=["index", "title"]).values.astype(np.float64)

    movie_sparse = csr_matrix(numeric_matrix) # now create the sparse matrix

    return movie_sparse

def recommend_movies(search_movie_index):
    recommened_movie = []
    model = NearestNeighbors(algorithm= 'brute')
    movie_sparse = get_movie_sparse
    model.fit(movie_sparse)

    row = movie_pivot_indexed_collected[search_movie_index] # this gets suggested_book_index th row from the DataFrame

    row_values = np.array(row[2:]) # the first col is index, the second row is title, we don't need it

    distance, suggestion = model.kneighbors(row_values.reshape(1,-1), n_neighbors=6 )

    for i in range(len(suggestion[0])):
        index = int(suggestion[0][i]) # convert NumPy array value to integer
        recommend_movies.append(movie_pivot_indexed_collected[index]['title'])
    
    return recommend_movies
        






    

