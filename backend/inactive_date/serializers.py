from rest_framework import serializers
from .models import InactiveDate


class InactiveDateSerializer(serializers.ModelSerializer):
    class Meta:
        model = InactiveDate
        fields = ('id', 'event_id', 'group_member_id','date','status', 'created_at')
