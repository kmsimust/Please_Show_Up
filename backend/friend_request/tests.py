from django.test import TestCase
from user.models import User
from .models import FriendRequest


class FriendRequestModelTest(TestCase):
    """Test the FriendRequest model"""
    
    def setUp(self):
        """Create test users"""
        self.user1 = User.objects.create_user(username="user1", email="user1@test.com", password="pass123")
        self.user2 = User.objects.create_user(username="user2", email="user2@test.com", password="pass123")
    
    def test_create_friend_request(self):
        """Test creating a friend request"""
        friend_request = FriendRequest.objects.create(
            user=self.user1,
            friend=self.user2,
            status="pending"
        )
        self.assertEqual(friend_request.status, "pending")
        self.assertEqual(friend_request.user, self.user1)
        self.assertEqual(friend_request.friend, self.user2)
    
    def test_friend_request_default_status(self):
        """Test friend request has pending status by default"""
        friend_request = FriendRequest.objects.create(
            user=self.user1,
            friend=self.user2
        )
        self.assertIsNotNone(friend_request.id)
        self.assertTrue(FriendRequest.objects.filter(id=friend_request.id).exists())
    
    def test_friend_request_query(self):
        """Test querying friend requests"""
        FriendRequest.objects.create(user=self.user1, friend=self.user2, status="pending")
        requests = FriendRequest.objects.filter(user=self.user1)
        self.assertEqual(requests.count(), 1)
        self.assertEqual(requests.first().friend, self.user2)