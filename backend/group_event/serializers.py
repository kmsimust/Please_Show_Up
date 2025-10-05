from rest_framework import serializers
from .models import GroupEvent

class GroupEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = GroupEvent
        fields = ("id", "event_uuid", "event_name", "event_description", "event_archieved", "event_starttime", "event_endtime", "created_at")