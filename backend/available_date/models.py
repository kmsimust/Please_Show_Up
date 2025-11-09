from django.db import models
from event.models import Event
from group_member.models import GroupMember
# Create your models here.


class AvailableDate(models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name="available_date_event_id", db_column="event_id")
    group_member = models.ForeignKey(GroupMember, on_delete=models.CASCADE, related_name="available_date_group_member", db_column="group_member_id")
    date = models.DateField()
    status = models.CharField(max_length = 10, choices=[("yes", "yes"), ("no", "no"), ("maybe", "maybe")], default="maybe")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["id"]
        db_table = "available_date"