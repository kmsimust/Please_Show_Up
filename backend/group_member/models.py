from django.db import models

# Create your models here.
class GroupMember(models.Model):
    group_id = models.IntegerField()
    member_id = models.IntegerField()
    created_at = models.DateField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]
        db_table = "group_member"