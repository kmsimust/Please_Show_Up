from django.shortcuts import render
from .serializers import InactiveDateSerializer
from .models import InactiveDate
from rest_framework import generics


# Create your views here.
class InactiveDateList(generics.ListAPIView):
    queryset = InactiveDate.objects.all()
    serializer_class = InactiveDateSerializer