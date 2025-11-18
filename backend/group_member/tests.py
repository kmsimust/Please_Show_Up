from django.test import TestCase
from django.contrib.auth import get_user_model
from group.models import Group
from group_member.models import GroupMember


class GroupMemberModelTest(TestCase):
    """Test GroupMember model operations"""

    def setUp(self):
        """Create test data"""
        U = get_user_model()
        self.user1 = U.objects.create_user(username="user1", email="user1@example.com", password="pw")
        self.user2 = U.objects.create_user(username="user2", email="user2@example.com", password="pw")
        
        self.group = Group.objects.create(
            owner=self.user1,
            group_name="Test Group",
            banner_image="/upload/group/dummy/dummy.png",
            max_member=10
        )

    def test_create_group_member(self):
        """Test creating a group member"""
        member = GroupMember.objects.create(
            group=self.group,
            member=self.user2
        )
        self.assertIsNotNone(member.pk)
        self.assertEqual(member.group, self.group)
        self.assertEqual(member.member, self.user2)

    def test_group_member_has_group(self):
        """Test group member is linked to group"""
        member = GroupMember.objects.create(
            group=self.group,
            member=self.user2
        )
        self.assertEqual(member.group.group_name, "Test Group")

    def test_group_member_has_member(self):
        """Test group member has user"""
        member = GroupMember.objects.create(
            group=self.group,
            member=self.user2
        )
        self.assertEqual(member.member.username, "user2")

    def test_get_group_members(self):
        """Test retrieving group members"""
        GroupMember.objects.create(group=self.group, member=self.user1)
        GroupMember.objects.create(group=self.group, member=self.user2)
        
        members = GroupMember.objects.filter(group=self.group)
        self.assertEqual(members.count(), 2)

    def test_get_groups_for_user(self):
        """Test retrieving groups for a user"""
        GroupMember.objects.create(group=self.group, member=self.user2)
        
        user_groups = GroupMember.objects.filter(member=self.user2)
        self.assertEqual(user_groups.count(), 1)
        self.assertEqual(user_groups.first().group, self.group)

    def test_group_member_by_pk(self):
        """Test retrieving group member by primary key"""
        member = GroupMember.objects.create(
            group=self.group,
            member=self.user2
        )
        fetched = GroupMember.objects.get(pk=member.pk)
        self.assertEqual(fetched.pk, member.pk)
        self.assertEqual(fetched.member, self.user2)

    def test_delete_group_member(self):
        """Test deleting a group member"""
        member = GroupMember.objects.create(
            group=self.group,
            member=self.user2
        )
        member_id = member.pk
        member.delete()
        exists = GroupMember.objects.filter(pk=member_id).exists()
        self.assertFalse(exists)

    def test_multiple_users_in_group(self):
        """Test multiple users can be members of same group"""
        U = get_user_model()
        user3 = U.objects.create_user(username="user3", email="user3@example.com", password="pw")
        
        GroupMember.objects.create(group=self.group, member=self.user1)
        GroupMember.objects.create(group=self.group, member=self.user2)
        GroupMember.objects.create(group=self.group, member=user3)
        
        members = GroupMember.objects.filter(group=self.group)
        self.assertEqual(members.count(), 3)

    def test_user_in_multiple_groups(self):
        """Test user can be member of multiple groups"""
        group2 = Group.objects.create(
            owner=self.user1,
            group_name="Another Group",
            banner_image="/upload/group/dummy/dummy.png",
            max_member=5
        )
        
        GroupMember.objects.create(group=self.group, member=self.user2)
        GroupMember.objects.create(group=group2, member=self.user2)
        
        user_groups = GroupMember.objects.filter(member=self.user2)
        self.assertEqual(user_groups.count(), 2)
