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

def initialize():
    global spark, movie_sparse, knn_model, movie_title_to_index, movie_titles

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