from django.db import models
from user.models import User

# Create your models here.
class FriendRequest(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name="request_user_1", db_column="user_id")
    friend_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name="request_user_2", db_column="friend_id")
    status = models.CharField(max_length = 30, choices=[("pending", "pending"), ("reject", "reject"), ("approved", "approved")], default="pending")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"user_id = {self.user_id} | friend_id = {self.friend_id} | status = {self.status}"

    class Meta:
        ordering = ["id"]
        db_table = "friend_request"