from django.urls import path
from . import views

urlpatterns = [
    path("movie/recommendations/", views.fetch_recommendations, name="fetch_movie_recommendations"),
    path("movie/recommendations_genre/", views.fetch_recommendations_by_genre, name="fetch_movie_recommendations_by_genre"),
    path("movie/fetch_movie_id/", views.fetch_movie_id, name="fetch_movie_id"),
    path("movie/fetch_movie_ratings/", views.fetch_rating, name="fetch_rating"),
    path("movie/fetch_ratings/agg/", views.fetch_ratings_agg, name="fetch_ratings_agg"),
    path("movie/fetch_image_url/", views.fetch_image_url, name="fetch_image_url")
]
