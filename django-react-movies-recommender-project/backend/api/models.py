from django.db import models
from django.dispatch import receiver
from django.db.models.signals import post_save
from django.contrib.auth.models import User



# Define the Note model that will be used to store notes in the database
class Note(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    # Define a foreign key to the User model to associate each note with a specific user (author)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="notes")

    # Define the string representation of the Note model, returning the title when the note is printed
    def __str__(self):
        return self.title


# Movie model to store movies data
class Movie(models.Model):
    movie_id = models.IntegerField(primary_key=True)

    title = models.CharField(max_length=255)

    genres = models.TextField()

    class Meta:
        db_table = 'tb_movie'

    def __str__(self):
        return self.title


# Rating model to store ratings data
class Rating(models.Model):
    # Django will automatically use the 'id' column as the primary key.
    # id = models.IntegerField(primary_key=True) 

    # userId is an integer field and can be used as a foreign key to a User model if you have one
    user_id = models.IntegerField()
    
    # movieId is an integer field and can be used as a foreign key to a Movie model if you have one
    movie_id = models.IntegerField()
    
    # rating is a float field to store the rating given to the movie
    rating = models.FloatField()
    
    # timestamp is a DateTime field to store the time when the rating was given
    timestamp = models.DateTimeField()

    # Meta class to specify the table name
    class Meta:
        db_table = 'tb_rating'  # Optional: You can specify the table name here
        constraints = [
            models.UniqueConstraint(
                fields=['user_id', 'movie_id'], 
                name='unique_user_movie'
            )
        ]

    
    # String representation of the model
    def __str__(self):
        return f"Rating {self.rating} for movie {self.movie_id} by user {self.user_id}"


# Link model to store links data
class Link(models.Model):
    movie_id = models.IntegerField(primary_key=True)

    imbd_id = models.CharField(max_length=255)

    tmbd_id = models.CharField(max_length=255)

    # Meta class to specify the table name
    class Meta:
        db_table = 'tb_link'  


class Profile(models.Model):
    # one-to-one relationship with the User model (each user has one profile)
    user = models.OneToOneField(User, 
                                on_delete=models.CASCADE, # delete profile when user is deleted
                                related_name='profile') # access profile via user.profile ??
    nickname = models.CharField(max_length=30, unique=True, blank=True)
    bio = models.TextField(max_length=500, blank=True)
    avatar_url = models.URLField(
        max_length=500,
        blank=True,
        default='../../frontend/src/assets/pic/default.png'
    )
    location = models.CharField(max_length=100, blank=True)
    birth_date = models.DateField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    # Meta class to specify the table name
    class Meta:
        db_table = 'tb_profile'  

    def __str__(self):
        return f"{self.user.username}'s Profile"


"""
    sender: The model class that sent the signal (User model in this case).

    instance: The actual User object instance that was just saved to the database.

    created: A boolean (True/False):
    True: A new user was created (not an update).
    False: An existing user was updated.

    **kwargs: Extra keyword arguments (not used here, but required for signal handlers).
"""

@receiver(post_save, sender=User) # signal to create profile when user is created
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        # create a Profile instance linked to the newly created User
        # user=instance: Links the new profile to the specific user instance that triggered the signal.
        """
            example: If a user User(id=1, username="alice") is created, instance refers to this user object.
            the profile will have user_id=1 in the database to establish the one-to-one relationship.
        """
        Profile.objects.create(user=instance)


@receiver(post_save, sender=User) # signal to save profile when user is saved
def save_user_profile(sender, instance, **kwargs):
    # save the associated profile whenever the user is saved
    # this ensures any profile changes made via the user relationship are persisted
    instance.profile.save()


