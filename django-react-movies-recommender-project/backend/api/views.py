from .models import Note, Movie, Rating
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, NoteSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny # DRF's permission classes.

from rest_framework.decorators import api_view
from sklearn.neighbors import NearestNeighbors
from rest_framework.response import Response
import pandas as pd
import numpy as np
from rest_framework import status



from api.movie_recommendation_engine import recommend_movies

@api_view(['GET'])
def fetch_recommendations(request):
    try:
        movie_title = request.query_params.get("title")
        recommendations = recommend_movies(movie_title)
        return Response({'recommendations': recommendations})
    except Exception as e:
        return Response({"error": str(e)}, status=500)

@api_view(['GET'])
def fetch_movie_id(request):
    movie_title = request.query_params.get("title")

    if not movie_title:
        return Response(
            {"error": "Title parameter is required"},
            status = status.HTTP_400_BAD_REQUEST
        )
    
    try:
        movie = Movie.objects.get(title = movie_title) # use Django ORM to fetch the movie_id
        return Response({"movie_id": movie.movie_id}, status=status.HTTP_200_OK)
    except Movie.DoesNotExist:
        return Response(
            {"error": "Movie not found"},
            status=status.HTTP_404_NOT_FOUND
        )
    


@api_view(['GET'])
def fetch_rating(request):
    movie_id = request.query_params.get("movie_id")

    if not movie_id:
        return Response(
            {"error": "Can't find the movie_id through the movie_title"},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    ratings = Rating.objects.filter(movie_id = movie_id).order_by('-rating')[:5]

    if ratings.exists():
        if ratings.exists():
            # if ratings exist, create a list of dictionaries containing 'user_id' and 'rating' for each rating.
            top_ratings = [{"user_id": rating.user_id, "rating": rating.rating} for rating in ratings]
            # return a 200 OK response with the 'movie_id' and the top 5 ratings.
            return Response({"movie_id": movie_id, "top_ratings": top_ratings}, status=status.HTTP_200_OK)
        else:
            return Response(
            {"error": "No ratings found for the given movie_id"},
            status=status.HTTP_404_NOT_FOUND
        )


"""
I don't know why when I doing this, I always can't find the .pkl file, even though I actually have it, so this method can't work
Hoping I can find a solution in the future
"""
@api_view(['GET'])
def get_movie_recommendations(request):
    print('get the request')
    movie_pivot_indexed_collected = pd.read_pickle("../models/models_data/movie_pivot_indexed_collected.pkl")
    movie_sparse = pd.read_pickle("../models/models_data/movie_sparse.pkl")

    model = NearestNeighbors(algorithm='brute', metric='cosine')
    model.fit(movie_sparse)

    """
    API endpoint to get movie recommendations based on a movie title provided as a query parameter.
    Example URL: /api/recommendations/?title=Inception
    """
    try:
        title = request.query_params.get("title")
        if not title:
            return Response({"error": "Please provide a movie title using the 'title' query parameter."}, status=400)
        
        # Search for the movie in the DataFrame
        filtered = movie_pivot_indexed_collected[movie_pivot_indexed_collected["title"].str.lower() == title.lower()]
        if filtered.empty: 
            return Response({"error": f"Movie title '{title}' not found."}, status=404)
        
        # Assuming the title is unique, select the first match
        movie_row = filtered.iloc[0]

        # Get the movie_index from the DataFrame (adjust the column name if necessary)
        movie_index = movie_row["index"] if "index" in movie_row else None

        row = movie_pivot_indexed_collected.iloc[movie_index]  # Fetch the row corresponding to the given index
        row_values = np.array(row[2:])  # Exclude index and title
        
        # Find nearest neighbors
        distance, suggestions = model.kneighbors(row_values.reshape(1, -1), n_neighbors=6)
        
        # Extract movie recommendations
        recommended_movies = []
        for i in range(len(suggestions[0])):
            index = int(suggestions[0][i])  # Convert to integer
            recommended_movies.append(movie_pivot_indexed_collected.iloc[index]['title'])
        
        return Response({'recommended_movies': recommended_movies})

    except IndexError:
        return Response({'error': 'Invalid movie index'}, status=400)
    movie_title = request.query_params.get("title")

# NoteListCreate is a class-based view in Django REST Framework (DRF) that combines two functionalities:
# Listing notes (via a GET request).
# Creating a new note (via a POST request).
# It inherits from generics.ListCreateAPIView, which provides the logic for both listing and creating objects.

class NoteListCreate(generics.ListCreateAPIView):
    serializer_class = NoteSerializer  # specifies the serializer to use for converting the Note model instances to JSON (for responses) and JSON to model instances (for requests).
    permission_classes = [IsAuthenticated] # ensures that only authenticated users (logged-in users) can access this view
    # When a user sends a GET request to /notes/, the get_queryset method is called. 
    def get_queryset(self):
        user = self.request.user # Get the currently authenticated user.
        return Note.objects.filter(author=user) # Return only notes authored by the user.

    # When a user sends a POST request to /notes/, the perform_create method is called
    def perform_create(self, serializer):
        if serializer.is_valid(): # checks if the data sent in the request (e.g., title and content) is valid according to the NoteSerializer
            serializer.save(author=self.request.user) # If the data is valid, it saves the new note to the database with the authenticated user as the author
        else:
            print(serializer.errors)


class NoteDelete(generics.DestroyAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    # get_queryset method is called to filter the notes authored by the authenticated user.
    def get_queryset(self):
        user = self.request.user  # Get the currently authenticated user.
        return Note.objects.filter(author=user)  # Return only notes authored by the user.
    
    # The destroy method (inherited from DestroyAPIView) is called to delete the note. but the code is not in here


class CreateUserView(generics.CreateAPIView): 
    queryset = User.objects.all()
    serializer_class = UserSerializer # Specify the queryset to fetch all users
    permission_classes = [AllowAny] # Allows any user (even unauthenticated) to access this view



