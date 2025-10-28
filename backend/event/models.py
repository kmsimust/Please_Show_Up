from django.db import models

# Create your models here.
class Event(models.Model):
    name = models.CharField(max_length=50)
    group_id = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]
        db_table = "event"