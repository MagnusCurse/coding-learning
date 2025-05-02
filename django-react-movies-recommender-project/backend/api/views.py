from .models.models import Movie, Rating, Link, Profile
from django.contrib.auth.models import User
from django.db.models import Avg
from django.utils import timezone
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
from api.movie_recommendation_engine import movie_titles


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


@api_view(['GET'])
def fetch_movie_detail(request):
    movie_id = request.query_params.get("movie_id")

    if not movie_id:
        return Response(
            {"error": "Can't find the movie_id through the movie_title"},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    link = Link.objects.get(movie_id=movie_id)

    tmbd_id = link.tmbd_id
    
    try:
        # fetch movie details with credits appended
        tmdb_response = requests.get(
            f"https://api.themoviedb.org/3/movie/{tmbd_id}",
            params={
                "api_key": API_KEY,
                "append_to_response": "credits"  # get credits data
            }
        )
        tmdb_response.raise_for_status()  # raise exception for HTTP errors
        movie_data = tmdb_response.json()  # get the movie_data of tmdb
    except requests.exceptions.RequestException as e:
        return Response(
            {"error": f"Failed to fetch data from TMDB: {str(e)}"},
            status=status.HTTP_503_SERVICE_UNAVAILABLE
        )

   
    imdb_id = movie_data.get("imdb_id")   # IMDb Page URL (if available)
    imdb_url = f"https://www.imdb.com/title/{imdb_id}" if imdb_id else None

    synopsis = movie_data.get("overview", "No synopsis available")  # get the synopsis of the movie

    crew = movie_data.get("credits", {}).get("crew", [])  # director (from credits)
    director = next(
        (member["name"] for member in crew if member.get("job") == "Director"),
        None  # default if no director found
    )

    cast = movie_data.get("credits", {}).get("cast", [])  # top 5 actors (from credits)
    actors = [actor["name"] for actor in cast[:5] if actor.get("name")]

    response_data = {  # compile response data
        "imdb_url": imdb_url,
        "synopsis": synopsis,
        "director": director,
        "actors": actors
    }

    return Response(response_data, status=status.HTTP_200_OK)


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


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_profile(request):
    """
    Retrieve the profile for the authenticated user.
    """
    try:
        # access the profile via the OneToOne relationship on the user
        profile = request.user.profile
        serializer = ProfileSerializer(profile)
        return Response(serializer.data)
    except Profile.DoesNotExist:
        return Response({"error": "Profile not found"}, status=404)


@api_view(['GET'])
def fetch_random_movie_title(request):
    random_movie_title = random.choice(movie_titles)
    return Response(random_movie_title)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def rate_movie(request):

    try:
        user_id = int(request.user.id) 
        print(f"user_id: {user_id}")  # use f-string for safe string formatting
        
        movie_id = int(request.data["movie_id"])
        rating_value = float(request.data["rating"])
  
        print(movie_id)
        print(rating_value)

        # add explicit parameter checks
        if not all([movie_id, rating_value]):
            raise ValueError


    except (TypeError, ValueError):
        return Response(
            {"detail": "Invalid or missing user_id, movie_id or rating."},
            status=status.HTTP_400_BAD_REQUEST
        )

    rating_obj, created = Rating.objects.update_or_create(  # ceate or update the rating
        user_id=user_id,
        movie_id=movie_id,
        defaults={
            'rating': rating_value,
            'timestamp': timezone.now()
        }
    )

    data = {
        "user_id":    rating_obj.user_id,
        "movie_id":   rating_obj.movie_id,
        "rating":     rating_obj.rating,
        "timestamp":  rating_obj.timestamp.isoformat(),
        "created":    created
    }  # prepare response data

    return Response(data, status=status.HTTP_201_CREATED if created else status.HTTP_200_OK)
    

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

