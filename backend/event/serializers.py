from rest_framework import serializers
from .models import Event
from group.serializers import GroupSerializer

class EventSerializer(serializers.ModelSerializer):
    group = GroupSerializer()
    class Meta:
        model = Event
        fields = ('id', 'name', 'group', 'description','start_date', 'end_date', 'event_date' ,'created_at')

class EventSerializerSave(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ('id', 'name', 'group', 'description','start_date', 'end_date', 'event_date' ,'created_at')