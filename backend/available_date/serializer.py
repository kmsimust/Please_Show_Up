from rest_framework import serializers
from .models import AvailableDate
from event.serializers import EventSerializer
from group_member.serializers import GroupMemberSerializer

class AvailableDateSerializerSave(serializers.ModelSerializer):
    class Meta:
        model = AvailableDate
        fields = ('id', 'event', 'group_member', 'date','status', 'created_at')

class AvailableDateSerializer(serializers.ModelSerializer):
    event = EventSerializer()
    group_member = GroupMemberSerializer()
    class Meta:
        model = AvailableDate
        fields = ('id', 'event', 'group_member', 'date','status', 'created_at')