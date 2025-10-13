from django.db import models

# Create your models here.
class Friend(models.Model):
    user_id = models.IntegerField()
    friend_id = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]
        db_table = "friend"