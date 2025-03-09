from django.db import models
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

