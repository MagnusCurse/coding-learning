from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Movie, Rating, Link, Profile


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
        profile_data = validated_data.pop('profile', {}) # extract profile data from the main validated data
        user = User.objects.create_user(**validated_data)

        # update the automatically created Profile (via post_save signal)
        # the signal already created an empty Profile instance when User was created
        # now we populate it with the profile data from the request
        Profile.objects.filter(user=user).update(**profile_data)
        return user


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = [
            'nickname', 
            'bio', 
            'avatar_url', 
            'location', 
            'birth_date'
        ]


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


class LinkSerializer(serializers.ModelSerializer):
    # The Meta class defines the model and fields to serialize
    class Meta:
        model = Link  # Specify the Rating model
        fields = ["movie_id", "imbd_id", "tmbd_id"]  # Fields to include in the serialized data
