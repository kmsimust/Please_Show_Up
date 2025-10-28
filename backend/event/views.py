from django.shortcuts import render
from .serializers import EventSerializer
from .models import Event
from rest_framework import generics


# Create your views here.
class EventList(generics.ListAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer