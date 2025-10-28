from django.db import models

# Create your models here.
from django.db import models

# Create your models here.
class MemberRole(models.Model):
    group_id = models.IntegerField()
    group_member_id = models.IntegerField()
    role = models.CharField(max_length=20)
    created_at = models.DateTimeField(auto_now_add=True)

    # def __str__(self):
    #     return f"user_id = {self.user_id} | friend_id = {self.friend_id} | status = {self.status}"

    class Meta:
        ordering = ["created_at"]
        db_table = "member_role"