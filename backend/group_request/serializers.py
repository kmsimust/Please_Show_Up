from rest_framework import serializers
from .models import GroupRequest
from group.serializers import GroupSerializer
from user.serializers import UserSerializer

class GroupRequestSerializersSave(serializers.ModelSerializer):
    class Meta:
        fields = ('id', 'group', 'invited_user', 'status', 'created_at')

class GroupRequestSerializers(serializers.ModelSerializer):
    group = GroupSerializer()
    invited_user = UserSerializer()
    class Meta:
        model = GroupRequest()
        fields = ('id', 'group', 'invited_user', 'status', 'created_at')