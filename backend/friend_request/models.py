from django.db import models

# Create your models here.
class FriendRequest(models.Model):
    user_id = models.IntegerField()
    friend_id = models.IntegerField()
    status = models.CharField(max_length = 30)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"user_id = {self.user_id} | friend_id = {self.friend_id} | status = {self.status}"

    class Meta:
        ordering = ["id"]
        db_table = "friend_request"