from django.db import models
from group.models import Group

# Create your models here.
class Event(models.Model):
    name = models.CharField(max_length=50)
    group = models.ForeignKey(Group, on_delete=models.CASCADE, related_name="event_group_id", db_column="group_id")
    description = models.CharField(max_length=255)
    start_date = models.DateField()
    end_date = models.DateField()
    event_date = models.DateField(null = True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]
        db_table = "event"
