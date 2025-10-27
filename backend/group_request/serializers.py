from rest_framework import serializers
from .models import GroupRequest

class GroupRequestSerializers(serializers.ModelSerializer):
    class Meta:
        model = GroupRequest
        field = ('id', 'group_id', 'invite_user_id', 'status', 'created_at')