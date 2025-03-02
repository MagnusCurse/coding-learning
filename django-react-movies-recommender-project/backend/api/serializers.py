from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Note, Movie, Rating


# Serializers in DRF are used to convert complex data types like Django models into Python data types 
# (such as dictionaries) that can easily be rendered into JSON or other content types.
class UserSerializer(serializers.ModelSerializer):
    class Meta:  # The Meta class defines the model and fields that will be serialized
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}} # Set password as write-only to prevent it from appearing in responses

    # Custom create method to hash password before saving user to the database
    def create(self, validated_data):
        print(validated_data)
        user = User.objects.create_user(**validated_data) 
        return user


class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ["id", "title", "content", "created_at", "author"]
        extra_kwargs = {"author": {"read_only": True}}


class MovieSerializer(serializers.ModelSerializer):
    # The Meta class defines the model and fields to serialize
    class Meta:
        model = Movie  # Specify the Movie model
        fields = ["id", "title", "genres"]  # These are the fields to include in the serialized data


class RatingSerializer(serializers.ModelSerializer):
    # The Meta class defines the model and fields to serialize
    class Meta:
        model = Rating  # Specify the Rating model
        fields = ["user_id", "movie_id", "rating", "timestamp"]  # Fields to include in the serialized data