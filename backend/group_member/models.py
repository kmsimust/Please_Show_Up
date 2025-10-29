from django.db import models
from user.models import User
from group.models import Group

# Create your models here.
class GroupMember(models.Model):
    group_id = models.ForeignKey(Group, on_delete=models.CASCADE, related_name="member_group_id", db_column="group_id")
    member_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name="member_user_id", db_column="member_id")
    created_at = models.DateField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]
        db_table = "group_member"