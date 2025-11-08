from rest_framework import serializers
from .models import FriendRequest
from user.serializers import UserSerializer

class FriendRequestSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    friend = UserSerializer()
    class Meta:
        model = FriendRequest
        fields = ('id', 'user', 'friend', 'status', 'created_at')

class FriendRequestSerializerSave(serializers.ModelSerializer):
    class Meta:
        model = FriendRequest
        fields = ('id', 'user', 'friend', 'status', 'created_at')
