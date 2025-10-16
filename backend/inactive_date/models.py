from django.db import models

# Create your models here.
class InactiveDate(models.Model):
    event_id = models.IntegerField()
    group_member_id = models.IntegerField()
    date = models.DateField()
    status = models.CharField(max_length=10)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ["created_at"]
        db_table = "inactive_date"
