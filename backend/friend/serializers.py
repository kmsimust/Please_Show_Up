from rest_framework import serializers
from .models import Friend
from user.serializers import UserSerializer

class FriendSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    friend = UserSerializer()
    class Meta:
        model = Friend
        fields = ('id', 'user', 'friend', 'created_at')
        

class FriendSerializerSave(serializers.ModelSerializer):
    class Meta:
        model = Friend
        fields = ('id', 'user', 'friend', 'created_at')