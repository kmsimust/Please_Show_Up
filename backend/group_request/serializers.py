from rest_framework import serializers
from .models import GroupRequest

class GroupRequestSerializers(serializers.ModelSerializer):
    class Meta:
        model = GroupRequest
        fields = ('id', 'group_id', 'invited_user_id', 'status', 'created_at')