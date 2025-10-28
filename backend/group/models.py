from django.db import models
from user.models import User

# Create your models here.
class Group(models.Model):
    owner_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name="group_owner_id", db_column="owner_id")
    group_name = models.CharField(max_length=20)
    banner_image = models.CharField(max_length=100)
    max_member = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]
        db_table = "group"