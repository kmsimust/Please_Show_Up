from rest_framework import serializers
from .models import GroupMember
from group.serializers import GroupSerializer
from user.serializers import UserSerializer

class GroupMemberSerializerSave(serializers.ModelSerializer):
    class Meta:
        model = GroupMember
        fields = ('id', 'group', 'member', 'created_at')

class GroupMemberSerializer(serializers.ModelSerializer):
    group = GroupSerializer()
    member = UserSerializer
    class Meta:
        model = GroupMember
        fields = ('id', 'group', 'member', 'created_at')