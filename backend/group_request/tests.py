from django.test import TestCase
from django.contrib.auth import get_user_model
from group.models import Group
from friend.models import Friend
from group_member.models import GroupMember
from group_request.models import GroupRequest


class GroupRequestModelTest(TestCase):
    """Test GroupRequest model operations"""

    def setUp(self):
        """Create test data"""
        U = get_user_model()
        self.owner = U.objects.create_user(username="owner", email="o@example.com", password="pw")
        self.invited = U.objects.create_user(username="user2", email="u2@example.com", password="pw")
        self.user3 = U.objects.create_user(username="user3", email="u3@example.com", password="pw")
        
        self.group = Group.objects.create(
            owner=self.owner,
            group_name="Test Group",
            banner_image="/upload/group/dummy/dummy.png",
            max_member=10
        )

    def test_create_group_request(self):
        """Test creating a group request"""
        gr = GroupRequest.objects.create(
            group=self.group,
            invited_user=self.invited,
            status="pending"
        )
        self.assertIsNotNone(gr.pk)
        self.assertEqual(gr.group, self.group)
        self.assertEqual(gr.invited_user, self.invited)
        self.assertEqual(gr.status, "pending")

    def test_get_pending_requests_by_user(self):
        """Test retrieving pending requests for a user"""
        GroupRequest.objects.create(group=self.group, invited_user=self.invited, status="pending")
        GroupRequest.objects.create(group=self.group, invited_user=self.invited, status="approved")
        
        pending = GroupRequest.objects.filter(invited_user=self.invited, status="pending")
        self.assertEqual(pending.count(), 1)

    def test_group_request_by_pk(self):
        """Test retrieving group request by primary key"""
        gr = GroupRequest.objects.create(
            group=self.group,
            invited_user=self.invited,
            status="pending"
        )
        fetched = GroupRequest.objects.get(pk=gr.pk)
        self.assertEqual(fetched.pk, gr.pk)
        self.assertEqual(fetched.status, "pending")

    def test_update_group_request_status(self):
        """Test updating group request status"""
        gr = GroupRequest.objects.create(
            group=self.group,
            invited_user=self.invited,
            status="pending"
        )
        gr.status = "approved"
        gr.save()
        
        updated = GroupRequest.objects.get(pk=gr.pk)
        self.assertEqual(updated.status, "approved")

    def test_group_request_has_group(self):
        """Test group request is linked to group"""
        gr = GroupRequest.objects.create(
            group=self.group,
            invited_user=self.invited,
            status="pending"
        )
        self.assertEqual(gr.group.group_name, "Test Group")

    def test_group_request_has_invited_user(self):
        """Test group request has invited user"""
        gr = GroupRequest.objects.create(
            group=self.group,
            invited_user=self.invited,
            status="pending"
        )
        self.assertEqual(gr.invited_user.username, "user2")

    def test_multiple_requests_for_same_group(self):
        """Test multiple users can be invited to same group"""
        GroupRequest.objects.create(group=self.group, invited_user=self.invited, status="pending")
        GroupRequest.objects.create(group=self.group, invited_user=self.user3, status="pending")
        
        requests = GroupRequest.objects.filter(group=self.group)
        self.assertEqual(requests.count(), 2)

    def test_multiple_requests_for_same_user(self):
        """Test user can have multiple group requests"""
        group2 = Group.objects.create(
            owner=self.owner,
            group_name="Another Group",
            banner_image="/upload/group/dummy/dummy.png",
            max_member=5
        )
        
        GroupRequest.objects.create(group=self.group, invited_user=self.invited, status="pending")
        GroupRequest.objects.create(group=group2, invited_user=self.invited, status="pending")
        
        user_requests = GroupRequest.objects.filter(invited_user=self.invited)
        self.assertEqual(user_requests.count(), 2)

    def test_group_request_status_values(self):
        """Test valid status values"""
        gr = GroupRequest.objects.create(
            group=self.group,
            invited_user=self.invited,
            status="pending"
        )
        self.assertIn(gr.status, ["pending", "approved", "declined"])
