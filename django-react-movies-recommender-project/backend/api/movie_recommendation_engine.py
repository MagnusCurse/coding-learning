from pyspark.sql import SparkSession
from pyspark.sql.functions import col, count, avg, monotonically_increasing_id
import numpy as np
from scipy.sparse import csr_matrix
from sklearn.neighbors import NearestNeighbors

# global variables to hold initialized data
spark = None
movie_sparse = None
knn_model = None
movie_title_to_index = {}
movie_titles = []

genre_sparse = None
genre_knn_model = None
genre_movie_titles = []
genre_title_to_index = {}

def initialize():
    global spark, movie_sparse, knn_model, movie_title_to_index, movie_titles
    global genre_sparse, genre_knn_model, genre_movie_titles, genre_title_to_index

    # stop existing Spark session if any
    if spark is not None:
        spark.stop()

    # create Spark session
    spark = SparkSession.builder \
        .appName("MovieRecommender_SQL_Movielens") \
        .config("spark.executor.memory", "32g") \
        .config("spark.driver.memory", "16g") \
        .config("spark.local.dir", r"E:\Apache Spark\spark-temp") \
        .config("spark.jars", r"D:\MySQL\MySQL ConnectorJ\mysql-connector-j-8.4.0\mysql-connector-j-8.4.0\mysql-connector-j-8.4.0.jar") \
        .getOrCreate()

    spark.conf.set("spark.sql.pivotMaxValues", 20000)

    # read data from database
    movies = read_movies()
    ratings = read_ratings()

    # process data
    ratings_with_movies = process_data(movies, ratings)

    # create sparse matrix and title mappings
    movie_sparse, movie_titles = create_sparse_matrix(ratings_with_movies)
    movie_title_to_index = {title: idx for idx, title in enumerate(movie_titles)}

    # train KNN model
    knn_model = NearestNeighbors(algorithm='brute', metric='cosine')
    knn_model.fit(movie_sparse)

    # ----------------------------------------------- below is movie recommender by genre -----------------------------------------------

    # process genres for content-based filtering
    # extract unique movies with genres from the filtered ratings_with_movies
    unique_movies_with_genres = ratings_with_movies.select("title", "genres").dropDuplicates(['title'])

    # split genres into array and explode to individual rows
    from pyspark.sql import functions as F
    movies_genres = unique_movies_with_genres.withColumn("genre", F.explode(F.split(F.col("genres"), r"\|")))

    # pivot to create binary genre columns
    genre_pivot = movies_genres.groupBy("title").pivot("genre").agg(F.count("genre")).fillna(0)

    # convert to Pandas DataFrame for processing
    genre_pivot_pd = genre_pivot.toPandas()

    # prepare genre matrix and titles
    genre_columns = [col for col in genre_pivot_pd.columns if col != 'title']
    genre_matrix = genre_pivot_pd[genre_columns].values.astype(np.int8)
    genre_sparse = csr_matrix(genre_matrix)
    genre_movie_titles = genre_pivot_pd['title'].tolist()
    genre_title_to_index = {title: idx for idx, title in enumerate(genre_movie_titles)}

    # train KNN model for genres using Jaccard similarity
    genre_knn_model = NearestNeighbors(algorithm='brute')
    genre_knn_model.fit(genre_sparse)

    print("All data have successfully initialized!!")

def read_movies():
    return spark.read \
        .format("jdbc") \
        .option("url", "jdbc:mysql://localhost:3307/db_movie_recommender_sys?useSSL=true&serverTimezone=UTC&allowPublicKeyRetrieval=true") \
        .option("dbtable", "tb_movie") \
        .option("user", "root") \
        .option("password", "137162") \
        .option("driver", "com.mysql.cj.jdbc.Driver") \
        .load()

def read_ratings():
    ratings = spark.read \
        .format("jdbc") \
        .option("url", "jdbc:mysql://localhost:3307/db_movie_recommender_sys?useSSL=false&serverTimezone=UTC") \
        .option("dbtable", "tb_rating") \
        .option("user", "root") \
        .option("password", "137162") \
        .option("driver", "com.mysql.cj.jdbc.Driver") \
        .load()

    # filter users with enough ratings
    user_ids = ratings.groupBy("user_id").count().filter(col("count") > 200).select("user_id")
    return ratings.join(user_ids, "user_id", "inner")

def process_data(movies, ratings):
    # join ratings with movie data
    ratings_with_movies = ratings.join(movies, "movie_id", "inner").dropDuplicates(['movie_id', 'user_id'])

    # filter movies with enough ratings
    rating_counts = ratings_with_movies.groupBy("title").agg(count("rating").alias("rating_count"))
    return ratings_with_movies.join(rating_counts, "title", "inner").filter(col("rating_count") >= 50)

def create_sparse_matrix(ratings_with_movies):
    # create pivot table
    pivot = ratings_with_movies.groupBy("title").pivot("user_id").agg(avg("rating")).fillna(0)
    pandas_df = pivot.toPandas()

    # store titles and create numeric matrix
    titles = pandas_df['title'].tolist()
    numeric_matrix = pandas_df.drop(columns=["title"]).values.astype(np.float64)

    return csr_matrix(numeric_matrix), titles

def recommend_movies(movie_title):
    global movie_title_to_index, knn_model, movie_sparse, movie_titles

    if not movie_title_to_index:
        return ["System not initialized"]

    idx = movie_title_to_index.get(movie_title)
    if idx is None:
        return ["Movie not found"]

    distances, indices = knn_model.kneighbors(movie_sparse[idx], n_neighbors=6)
    return [movie_titles[i] for i in indices[0] if i != idx][:5]  # exclude self and get top 5

def recommend_by_genres(movie_title):
    global genre_title_to_index, genre_knn_model, genre_sparse, genre_movie_titles

    if not genre_title_to_index:
        return ["system not initialized"]

    idx = genre_title_to_index.get(movie_title)
    if idx is None:
        return ["movie not found"]

    # find nearest neighbors
    distances, indices = genre_knn_model.kneighbors(genre_sparse[idx], n_neighbors=11)  # Get more to filter out

    # exclude the movie itself and return top 6
    recommendations = [genre_movie_titles[i] for i in indices[0] if i != idx][:6]
    return recommendations