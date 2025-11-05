from django.db import models
from user.models import User

# Create your models here.
class Friend(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="friend_user_1", db_column="user_id")
    friend = models.ForeignKey(User, on_delete=models.CASCADE, related_name="friend_user_2", db_column="friend_id")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]
        db_table = "friend"