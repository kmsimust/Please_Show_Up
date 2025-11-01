from rest_framework import serializers
from .models import Group
from user.serializers import UserSerializer

class GroupSerializer(serializers.ModelSerializer):
    owner = UserSerializer()
    class Meta:
        model = Group
        fields = ('id', 'owner', 'group_name', 'banner_image', 'max_member', 'created_at')

class GroupSerializerSave(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ('id', 'owner', 'group_name', 'banner_image', 'max_member', 'created_at')