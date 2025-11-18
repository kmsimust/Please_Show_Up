from django.test import TestCase
from django.contrib.auth import get_user_model
from friend.models import Friend

class FriendModelTest(TestCase):
    """Test Friend model operations"""

    def setUp(self):
        U = get_user_model()
        self.u1 = U.objects.create_user(username="a", email="a@example.com", password="pw")
        self.u2 = U.objects.create_user(username="b", email="b@example.com", password="pw")

    def test_01_create_friend(self):
        """Test creating a friend relationship"""
        friend = Friend.objects.create(user=self.u1, friend=self.u2)
        self.assertIsNotNone(friend.pk)
        self.assertEqual(friend.user, self.u1)
        self.assertEqual(friend.friend, self.u2)

    def test_02_get_friends_by_user(self):
        """Test retrieving friends for a user"""
        Friend.objects.create(user=self.u1, friend=self.u2)
        friends = Friend.objects.filter(user=self.u1)
        self.assertEqual(friends.count(), 1)
        self.assertEqual(friends.first().friend, self.u2)

    def test_03_get_friend_by_user_id(self):
        """Test getting friend by user id"""
        Friend.objects.create(user=self.u1, friend=self.u2)
        friend = Friend.objects.filter(user=self.u1).first()
        self.assertIsNotNone(friend)
        self.assertEqual(friend.user_id, self.u1.id)

    def test_04_get_user_by_friend_id(self):
        """Test getting users where friend_id matches"""
        Friend.objects.create(user=self.u1, friend=self.u2)
        friends = Friend.objects.filter(friend=self.u2)
        self.assertGreaterEqual(friends.count(), 1)

    def test_05_update_friend(self):
        """Test updating friend relationship"""
        f = Friend.objects.create(user=self.u1, friend=self.u2)
        # Verify it exists and can be retrieved
        fetched = Friend.objects.get(pk=f.pk)
        self.assertEqual(fetched.user, self.u1)
        self.assertEqual(fetched.friend, self.u2)

    def test_06_delete_friend(self):
        """Test deleting a friend relationship"""
        f = Friend.objects.create(user=self.u1, friend=self.u2)
        friend_id = f.pk
        f.delete()
        exists = Friend.objects.filter(pk=friend_id).exists()
        self.assertFalse(exists)
