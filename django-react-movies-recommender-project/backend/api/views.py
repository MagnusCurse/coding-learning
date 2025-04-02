from .models import Movie, Rating, Link, Profile
from django.contrib.auth.models import User
from django.db.models import Avg
from rest_framework import generics, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny # DRF's permission classes.
from rest_framework.response import Response
from rest_framework import status
from sklearn.neighbors import NearestNeighbors
from .serializers import UserSerializer, ProfileSerializer
import pandas as pd
import numpy as np
import requests
import random
from api.movie_recommendation_engine import recommend_movies
from api.movie_recommendation_engine import recommend_by_genres
from api.movie_recommendation_engine import genre_movie_titles


API_KEY = "9d0e3e371ecee50a7c190f46aeafadec"

@api_view(['GET'])
def fetch_recommendations(request):
    try:
        movie_title = request.query_params.get("title")
        recommendations = recommend_movies(movie_title)
        return Response({'recommendations': recommendations})
    except Exception as e:
        return Response({"error": str(e)}, status=500)


@api_view(['GET'])
def fetch_recommendations_by_genre(request):
    try:
        movie_genre = request.query_params.get("genre")
        movie_title = get_random_movie_by_genre(movie_genre)
        print(movie_title)
        recommendations = recommend_by_genres(movie_title)
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
def fetch_ratings_agg(request):
    movie_id = request.query_params.get("movie_id")

    if not movie_id:
        return Response(
            {"error": "Can't find the movie_id through the movie_title"},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    ratings = Rating.objects.filter(movie_id = movie_id) # fetch all the ratings about this movie

    if ratings.exists():
        if ratings.exists():
            count =  ratings.count()
            average = ratings.aggregate(Avg('rating'))['rating__avg']
            return Response({"ratings_count": count,
                             "ratings_average": average}, status=status.HTTP_200_OK)
        else:
            return Response(
            {"error": "No ratings found for the given movie_id"},
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


@api_view(['GET'])
def fetch_image_url(request):
    movie_id = request.query_params.get("movie_id")

    if not movie_id:
        return Response(
            {"error": "Can't find the movie_id through the movie_title"},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    
    link = Link.objects.get(movie_id=movie_id)

    tmbd_id = link.tmbd_id

    response = requests.get(
        f"https://api.themoviedb.org/3/movie/{tmbd_id}",
        params={"api_key": API_KEY}
    ).json()

    poster_path = response.get("poster_path")
    poster_url = f"https://image.tmdb.org/t/p/w500/{poster_path}"

    if poster_url: # check whether poster_url exists and is not empty or None.
        return Response({"poster_url": poster_url}, status=status.HTTP_200_OK)
    else:
        return Response(
            {"error": "poster_url doesn't exist"},
            status=status.HTTP_404_NOT_FOUND)


@api_view(['PUT', 'PATCH'])
@permission_classes([IsAuthenticated])
def update_profile(request):
    try:
        profile = request.user.profile # get the Profile instance
        
        # extract allowed fields from request data
        allowed_fields = {
            'nickname', 
            'bio', 
            'avatar_url', 
            'location', 
            'birth_date'
        }

        # filter request data to only keep allowed fields
        data = {
            field: request.data[field] 
            for field in allowed_fields # iterate through each field in allowed_fields
            # checks if a field exists in the request, If yes, add it to the new data dictionary
            if field in request.data
        }

        # - existing profile instance
        # - new data from request
        # - partial=True allows updating individual fields (PATCH semantics)
        serializer = ProfileSerializer(
            instance=profile, # use the instance
            data=data, 
            partial=True  # allow partial updates
        )
        
        if serializer.is_valid():
            print("serializer is valid")
            serializer.save()
            # return updated profile data with 200 status
            print(serializer.data)
            return Response(serializer.data)
        else:
            print("Serializer errors:", serializer.errors)  
            return Response(serializer.errors, status=400)

    except Profile.DoesNotExist:
        return Response({"error": "Profile not found"}, status=404)
    except Exception as e:
        return Response({"error": str(e)}, status=500)


def get_random_movie_by_genre(genre):
    # split the provided genre into individual genres (if it's a multi-genre filter)
    genre = genre.lower()

    # filter movies that contain the specified genre and whose title is in genre_movie_titles list
    movies = Movie.objects.filter(
        genres__icontains=genre,
        title__in=genre_movie_titles
    )

    # if no movies are found, return None
    if not movies:
        return None

    # randomly select one movie
    random_movie = random.choice(movies)

    return random_movie.title


class CreateUserView(generics.CreateAPIView): 
    queryset = User.objects.all()
    serializer_class = UserSerializer # Specify the queryset to fetch all users
    permission_classes = [AllowAny] # Allows any user (even unauthenticated) to access this view

class ProfileUpdateView(generics.UpdateAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user.profile

