from django.db import models
from models import Movie  # Import related model



class OfflineRecommendation(models.Model):
    """
    Stores precomputed recommendations generated through batch processing
    """
    # link to the Movie model - OneToOne ensures each movie has only one recommendation entry
    movie = models.OneToOneField(
        Movie,  # references the Movie model
        on_delete=models.CASCADE,  # delete recommendations if movie is deleted
        primary_key=True,  # use movie_id as primary key
        db_column='movie_id',  # explicit database column name
        help_text="The movie these recommendations are for"  # admin interface documentation
    )
    
    # stores collaborative filtering recommendations (user behavior-based)
    collab_recommended_ids = models.JSONField(
        help_text="Array of movie IDs recommended by collaborative filtering, format: [157, 603, 680]"  # example format
    )
    
    # stores content-based genre recommendations
    genre_recommended_ids = models.JSONField(
        help_text="Array of movie IDs recommended by genre similarity, format: [157, 1198, 4306]"  # example format
    )
    
    # automatic timestamp for recommendation freshness tracking
    created_at = models.DateTimeField(
        auto_now_add=True,  # Automatically set when created
        help_text="When these recommendations were generated"  # shows creation time in admin
    )

    class Meta:
        db_table = 'tb_offline_recommendations'  # match your SQL table name
        # these two lines in the Django model's Meta class control 
        # how your model's name is displayed in the Django admin interface and other human-facing parts of your application. 
        verbose_name = 'Offline Recommendation'
        verbose_name_plural = 'Offline Recommendations'

    def __str__(self):
        return f"Recommendations for {self.movie.title}"
