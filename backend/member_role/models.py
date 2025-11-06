from django.db import models

# Create your models here.
from django.db import models
from group.models import Group
from group_member.models import GroupMember

# Create your models here.
class MemberRole(models.Model):
    group = models.ForeignKey(Group, on_delete=models.CASCADE, related_name="Member_role_group_id", db_column="group_id")
    group_member = models.ForeignKey(GroupMember, on_delete=models.CASCADE, related_name="Member_role_group_member_id", db_column="group_member_id")
    role = models.CharField(max_length=20)
    created_at = models.DateTimeField(auto_now_add=True)

    # def __str__(self):
    #     return f"user_id = {self.user_id} | friend_id = {self.friend_id} | status = {self.status}"

    class Meta:
        ordering = ["created_at"]
        db_table = "member_role"