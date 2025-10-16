from django.shortcuts import render
from .serializers import MemberRoleSerializer
from .models import MemberRole
from rest_framework import generics

# Create your views here.
class MemberRoleList(generics.ListAPIView):
    queryset = MemberRole.objects.all()
    serializer_class = MemberRoleSerializer