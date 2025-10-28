from rest_framework import serializers
from .models import GroupMember

class GroupMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = GroupMember
        fields = ('id', 'group_id', 'member_id', 'created_at')
