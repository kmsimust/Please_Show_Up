from rest_framework import serializers
from .models import MemberRole

class MemberRoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = MemberRole
        fields = ('id', 'group_id', 'group_member_id', 'role', 'created_at')
