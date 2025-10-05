from django.db import models

class GroupEvent(models.Model):
    event_uuid = models.CharField(max_length=20)
    event_name = models.CharField(max_length=50)
    event_description = models.CharField(max_length=200)
    event_archieved = models.BooleanField()
    event_starttime = models.DateTimeField()
    event_endtime = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ["-created_at"]
        db_table = "group_event"
