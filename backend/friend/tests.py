from django.urls import reverse
from rest_framework.test import APITestCase
from django.contrib.auth import get_user_model
from friend.models import Friend

class FriendAPITest(APITestCase):

    def setUp(self):
        U = get_user_model()
        self.u1 = U.objects.create_user(username="a", password="pw")
        self.u2 = U.objects.create_user(username="b", password="pw")
        self.client.force_authenticate(self.u1)

    def test_01_get_friends(self):
        res = self.client.get(reverse("get_friends"))
        self.assertEqual(res.status_code, 200)

    def test_02_create_friend(self):
        payload = {"user": self.u1.id, "friend": self.u2.id}
        res = self.client.post(reverse("create_friend"), payload)
        self.assertEqual(res.status_code, 201)

    def test_03_get_friend_by_user_id(self):
        Friend.objects.create(user=self.u1, friend=self.u2)
        res = self.client.get(reverse("get_friend_by_user_id", args=[self.u1.id]))
        self.assertEqual(res.status_code, 200)

    def test_04_get_user_by_friend_id(self):
        res = self.client.get(reverse("get_user_by_friend_id", args=[self.u1.id]))
        self.assertIn(res.status_code, [200, 404])

    def test_05_update_friend(self):
        f = Friend.objects.create(user=self.u1, friend=self.u2)
        payload = {"user": self.u1.id, "friend": self.u1.id}
        res = self.client.put(reverse("update_friend", args=[f.id]), payload)
        self.assertIn(res.status_code, [200, 400])

    def test_06_delete_friend(self):
        f = Friend.objects.create(user=self.u1, friend=self.u2)
        res = self.client.delete(reverse("delete_friend", args=[f.id]))
        self.assertIn(res.status_code, [204, 404])
