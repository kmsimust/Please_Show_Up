from django.test import TestCase
from django.contrib.auth import get_user_model
from group.models import Group


class GroupModelTest(TestCase):
    """Test Group model operations"""

    def setUp(self):
        U = get_user_model()
        self.user = U.objects.create_user(username="owner", email="o@example.com", password="pw")
        self.group = Group.objects.create(
            owner=self.user,
            group_name="Test Group",
            banner_image="/upload/group/dummy/dummy.png",
            max_member=10
        )

    def test_create_group(self):
        """Test creating a group"""
        self.assertIsNotNone(self.group.pk)
        self.assertEqual(self.group.group_name, "Test Group")
        self.assertEqual(self.group.owner, self.user)

    def test_get_group_by_owner(self):
        """Test retrieving groups by owner"""
        groups = Group.objects.filter(owner=self.user)
        self.assertEqual(groups.count(), 1)
        self.assertEqual(groups.first().group_name, "Test Group")

    def test_get_group_by_pk(self):
        """Test retrieving group by primary key"""
        group = Group.objects.get(pk=self.group.pk)
        self.assertIsNotNone(group)
        self.assertEqual(group.id, self.group.id)

    def test_update_group_name(self):
        """Test updating group name"""
        self.group.group_name = "Updated Group"
        self.group.save()
        updated = Group.objects.get(pk=self.group.pk)
        self.assertEqual(updated.group_name, "Updated Group")

    def test_update_group_banner(self):
        """Test updating group banner"""
        self.group.banner_image = "/upload/group/new/banner.png"
        self.group.save()
        updated = Group.objects.get(pk=self.group.pk)
        self.assertEqual(updated.banner_image, "/upload/group/new/banner.png")

    def test_delete_group(self):
        """Test deleting a group"""
        group_id = self.group.pk
        self.group.delete()
        exists = Group.objects.filter(pk=group_id).exists()
        self.assertFalse(exists)

    def test_group_has_owner(self):
        """Test that group has owner relationship"""
        self.assertIsNotNone(self.group.owner)
        self.assertEqual(self.group.owner.username, "owner")

    def test_group_has_max_member(self):
        """Test that group has max_member field"""
        self.assertEqual(self.group.max_member, 10)
