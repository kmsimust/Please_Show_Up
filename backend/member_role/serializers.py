from rest_framework import serializers
from group.serializers import GroupSerializer
from group_member.serializers import GroupMemberSerializer
from .models import MemberRole

class MemberRoleSerializerSave(serializers.ModelSerializer):
    class Meta:
        model = MemberRole
        fields = ('id', 'group', 'group_member', 'role', 'created_at')


class MemberRoleSerializer(serializers.ModelSerializer):
    group = GroupSerializer()
    group_member = GroupMemberSerializer()
    class Meta:
        model = MemberRole
        fields = ('id', 'group', 'group_member', 'role', 'created_at')