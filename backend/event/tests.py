from datetime import datetime, timedelta

from django.contrib.auth import get_user_model
from django.test import TestCase

from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate

from group.models import Group
from .views import create_event


class CreateEventViewTests(TestCase):
    """
    Tests for the create_event view.

    IMPORTANT:
    - Change the body fields in _base_body() so they match EventSerializerSave.
    """

    def setUp(self):
        self.factory = APIRequestFactory()
        User = get_user_model()
        self.user = User.objects.create_user(
            username="alice",
            email="alice@example.com",
            password="pw",
        )
        # Create a group for testing
        self.group = Group.objects.create(
            owner=self.user,
            group_name="Test Group",
            banner_image="/path/to/banner.jpg",
            max_member=10
        )

    def _base_body(self, start_date_str: str) -> dict:
        """
        Build a valid body for your serializer.
        TODO: change fields to match EventSerializerSave.
        """
        return {
            # TODO: change/extend fields to match your serializer
            "name": "Test Event",
            "description": "Some description",
            "group": self.group.id,  # Add required group field
            "start_date": start_date_str,
            # DO NOT include end_date – view sets it
        }

    def test_create_event_rejects_past_start_date(self):
        past_date = (datetime.now().date() - timedelta(days=1)).strftime("%Y-%m-%d")
        body = self._base_body(past_date)

        request = self.factory.post("/events/", data=body, format="json")
        force_authenticate(request, user=self.user)

        response = create_event(request)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(
            response.data.get("message"),
            "Event can only start today and the day after",
        )

    def test_create_event_success_sets_end_date_plus_six_days(self):
        today = datetime.now().date()
        start_date_str = today.strftime("%Y-%m-%d")
        expected_end_date_str = (today + timedelta(days=6)).strftime("%Y-%m-%d")

        body = self._base_body(start_date_str)

        request = self.factory.post("/events/", data=body, format="json")
        force_authenticate(request, user=self.user)

        response = create_event(request)

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["start_date"], start_date_str)
        self.assertEqual(response.data["end_date"], expected_end_date_str)

    def test_create_event_invalid_serializer_returns_400(self):
        today_str = datetime.now().date().strftime("%Y-%m-%d")
        # Intentionally invalid: only start_date, missing other required fields
        body = {"start_date": today_str}

        request = self.factory.post("/events/", data=body, format="json")
        force_authenticate(request, user=self.user)

        response = create_event(request)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIsInstance(response.data, dict)
