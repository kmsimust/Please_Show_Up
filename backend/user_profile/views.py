from django.shortcuts import render
from .serializers import UserProfileSerializer
from .models import UserProfile
from rest_framework import generics


class UserProfileList(generics.ListAPIView):
    queryset = UserProfile.objects.all() # SELECT * FROM group_event
    serializer_class = UserProfileSerializer
    
    
