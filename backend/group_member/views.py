from django.shortcuts import render
from .serializers import GroupMemberSerializer
from .models import GroupMember
from rest_framework import generics

# Create your views here.
class GroupMemberList(generics.ListAPIView):
    queryset = GroupMember.objects.all()
    serializer_class = GroupMemberSerializer