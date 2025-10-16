# Create your views here.
from django.shortcuts import render
from .serializers import GroupEventSerializer
from .models import GroupEvent
from rest_framework import generics

class GroupEventList(generics.ListAPIView):
    queryset = GroupEvent.objects.all() # SELECT * FROM group_event
    serializer_class = GroupEventSerializer
    
    #return Response(queryset.data)