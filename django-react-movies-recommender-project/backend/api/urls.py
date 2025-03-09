from django.urls import path
from . import views

urlpatterns = [
    path("notes/", views.NoteListCreate.as_view(), name="note-list"),
    # - When a request is made to `/notes/`, it will be handled by the `NoteListCreate` view.
    # - The `name="note-list"` allows you to refer to this URL in templates or code using the name `note-list`.
    path("notes/delete/<int:pk>/", views.NoteDelete.as_view(), name="delete-note"),
    path("movie/recommendations/", views.fetch_recommendations, name="get_movie_recommendations"),
    path("movie/fetch_movie_id/", views.fetch_movie_id, name="fetch_movie_id"),
    path("movie/fetch_movie_ratings/", views.fetch_rating, name="fetch_rating")
]
