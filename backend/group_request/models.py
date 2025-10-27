from django.db import models
from group.models import Group
from user.models import User

# Create your models here.
class GroupRequest(models.Model):
    group_id = models.ForeignKey(Group, on_delete=models.CASCADE, related_name="group_request_group_id", db_column="group_id")
    invited_user_id = models.ForeignKey(User, on_delete = models.CASCADE, related_name="group_request_invited_user_id", db_column="invited_user_id")
    status = models.CharField(max_length=10, choices=[("pending", "pending"), ("reject", "reject"), ("approved", "approved")], default="pending")
    created_at = models.DateTimeField(auto_created=True)
    class Meta:
        ordering = ["-created_at"]
        db_table = "group_request"