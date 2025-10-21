from rest_framework import serializers
from .models import Group

class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ('id', 'owner_id', 'group_name', 'banner_image', 'max_member', 'created_at')
