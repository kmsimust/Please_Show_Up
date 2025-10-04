from django.db import models

# Create your models here.
class Group(models.Model):
    group_uuid = models.CharField(max_length=20)
    group_name = models.CharField(max_length=50)
    group_image = models.CharField(max_length=100)
    owner_id = models.IntegerField()
    create_at = models.DateTimeField()