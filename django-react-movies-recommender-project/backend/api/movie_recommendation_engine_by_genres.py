# Add these global variables
genre_sparse = None
genre_knn_model = None
genre_movie_titles = []
genre_title_to_index = {}

def initialize():
    global spark, movie_sparse, knn_model, movie_title_to_index, movie_titles, genre_sparse, genre_knn_model, genre_movie_titles, genre_title_to_index

    # Previous initialization code remains the same until after creating movie_sparse and knn_model

    # Process genres for content-based filtering
    # Extract unique movies with genres from the filtered ratings_with_movies
    unique_movies_with_genres = ratings_with_movies.select("title", "genres").dropDuplicates(['title'])

    # Split genres into array and explode to individual rows
    from pyspark.sql import functions as F
    movies_genres = unique_movies_with_genres.withColumn("genre", F.explode(F.split(F.col("genres"), r"\|")))

    # Pivot to create binary genre columns
    genre_pivot = movies_genres.groupBy("title").pivot("genre").agg(F.count("genre")).fillna(0)

    # Convert to Pandas DataFrame for processing
    genre_pivot_pd = genre_pivot.toPandas()

    # Prepare genre matrix and titles
    genre_columns = [col for col in genre_pivot_pd.columns if col != 'title']
    genre_matrix = genre_pivot_pd[genre_columns].values.astype(np.int8)
    genre_sparse = csr_matrix(genre_matrix)
    genre_movie_titles = genre_pivot_pd['title'].tolist()
    genre_title_to_index = {title: idx for idx, title in enumerate(genre_movie_titles)}

    # Train KNN model for genres using Jaccard similarity
    genre_knn_model = NearestNeighbors(algorithm='brute', metric='jaccard')
    genre_knn_model.fit(genre_sparse)

    print("Genre-based recommender initialized!")

def recommend_by_genres(movie_title):
    global genre_title_to_index, genre_knn_model, genre_sparse, genre_movie_titles

    if not genre_title_to_index:
        return ["System not initialized"]

    idx = genre_title_to_index.get(movie_title)
    if idx is None:
        return ["Movie not found in genre database"]

    # Find nearest neighbors
    distances, indices = genre_knn_model.kneighbors(genre_sparse[idx], n_neighbors=11)  # Get more to filter out

    # Exclude the movie itself and return top 10
    recommendations = [genre_movie_titles[i] for i in indices[0] if i != idx][:10]
    return recommendations