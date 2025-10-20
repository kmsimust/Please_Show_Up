from django.db import models

# Create your models here.
class Group(models.Model):
    owner_id = models.IntegerField()
    group_name = models.CharField(max_length=20)
    banner_image = models.CharField(max_length=100)
    max_member = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]
        db_table = "group"