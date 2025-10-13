from django.shortcuts import render
from .serializers import FriendSerializer
from .models import Friend
from rest_framework import generics

# Create your views here.
class FriendList(generics.ListAPIView):
    queryset = Friend.objects.all()
    serializer_class = FriendSerializer