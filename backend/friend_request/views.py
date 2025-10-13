from django.shortcuts import render
from .serializers import FriendRequestSerializer
from .models import FriendRequest
from rest_framework import generics

# Create your views here.

# get all data from friend_request table
class FriendRequestList(generics.ListAPIView):
    queryset = FriendRequest.objects.all() # SELECT * FROM friend_request
    serializer_class = FriendRequestSerializer
