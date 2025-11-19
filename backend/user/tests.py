from django.test import TestCase
from django.contrib.auth.hashers import make_password
from .models import User


class UserModelTest(TestCase):
    """Test User model operations"""
    
    def setUp(self):
        """Create test users"""
        self.user1 = User.objects.create_user(
            username="testuser1",
            email="test1@example.com",
            password="testpass123"
        )
        self.user2 = User.objects.create_user(
            username="testuser2",
            email="test2@example.com",
            password="testpass456"
        )
    
    def test_create_user(self):
        """Test creating a user"""
        user = User.objects.create_user(
            username="newuser",
            email="new@example.com",
            password="newpass123"
        )
        self.assertEqual(user.username, "newuser")
        self.assertEqual(user.email, "new@example.com")
        self.assertTrue(user.pk)
    
    def test_user_password_hashing(self):
        """Test that password is hashed"""
        self.assertNotEqual(self.user1.password, "testpass123")
        self.assertTrue(self.user1.check_password("testpass123"))
    
    def test_get_user_by_username(self):
        """Test getting user by username"""
        user = User.objects.get(username="testuser1")
        self.assertEqual(user.email, "test1@example.com")
    
    def test_get_user_by_email(self):
        """Test getting user by email"""
        user = User.objects.get(email="test1@example.com")
        self.assertEqual(user.username, "testuser1")
    
    def test_user_exists(self):
        """Test checking if user exists"""
        exists = User.objects.filter(username="testuser1").exists()
        self.assertTrue(exists)
    
    def test_user_does_not_exist(self):
        """Test checking if non-existent user exists"""
        exists = User.objects.filter(username="nonexistent").exists()
        self.assertFalse(exists)
    
    def test_duplicate_username_check(self):
        """Test duplicate username detection"""
        from django.db.models import Q
        try:
            user = User.objects.get(Q(username="testuser1"))
            self.assertIsNotNone(user)
        except User.DoesNotExist:
            self.fail("User should exist")
    
    def test_duplicate_email_check(self):
        """Test duplicate email detection"""
        from django.db.models import Q
        try:
            user = User.objects.get(Q(email="test1@example.com"))
            self.assertIsNotNone(user)
        except User.DoesNotExist:
            self.fail("User should exist")
    
    def test_update_user(self):
        """Test updating user fields"""
        self.user1.email = "updated@example.com"
        self.user1.save()
        updated_user = User.objects.get(pk=self.user1.pk)
        self.assertEqual(updated_user.email, "updated@example.com")
    
    def test_user_serializer_data(self):
        """Test that user data can be serialized"""
        from .serializers import UserSerializer
        serializer = UserSerializer(self.user1)
        data = serializer.data
        self.assertEqual(data['username'], 'testuser1')
        self.assertEqual(data['email'], 'test1@example.com')
    
    def test_authenticate_user_with_correct_password(self):
        """Test authenticating user with correct password"""
        from django.contrib.auth import authenticate
        user = authenticate(username="testuser1", password="testpass123")
        self.assertIsNotNone(user)
        self.assertEqual(user.username, "testuser1")
    
    def test_authenticate_user_with_wrong_password(self):
        """Test authenticating user with wrong password"""
        from django.contrib.auth import authenticate
        user = authenticate(username="testuser1", password="wrongpass")
        self.assertIsNone(user)
