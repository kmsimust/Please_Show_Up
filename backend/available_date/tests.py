from django.test import TestCase
from datetime import datetime, timedelta
from .models import AvailableDate
from event.models import Event
from group.models import Group
from group_member.models import GroupMember
from user.models import User


class UpdateStatusFunctionTest(TestCase):
    """Test the update_status function logic"""
    
    def setUp(self):
        """Create test data - mimics what update_status needs"""
        # Create test user
        self.user = User.objects.create_user(
            username="testuser",
            email="test@example.com",
            password="testpass123"
        )
        
        # Create test group
        self.group = Group.objects.create(
            owner=self.user,
            group_name="Test Group",
            banner_image="/path/to/banner.jpg",
            max_member=10
        )
        
        # Create test group member
        self.group_member = GroupMember.objects.create(
            group=self.group,
            member=self.user
        )
        
        # Create test event with FUTURE end_date (crucial for update_status to work)
        future_date = datetime.now().date() + timedelta(days=10)
        self.event = Event.objects.create(
            name="Test Event",
            group=self.group,
            description="Test event",
            start_date=datetime.now().date(),
            end_date=future_date
        )
        
        # Create test available date
        self.available_date = AvailableDate.objects.create(
            event=self.event,
            group_member=self.group_member,
            date=datetime.now().date() + timedelta(days=5),
            status="maybe"
        )
    
    def test_update_status_find_available_date(self):
        """Simulates: available_date = AvailableDate.objects.get(pk = pk)"""
        pk = self.available_date.pk
        available_date = AvailableDate.objects.get(pk=pk)
        self.assertIsNotNone(available_date)
        self.assertEqual(available_date.pk, self.available_date.pk)
    
    def test_update_status_find_event(self):
        """Simulates: event = Event.objects.get(pk = available_date.event_id)"""
        available_date = self.available_date
        event = Event.objects.get(pk=available_date.event_id)
        self.assertIsNotNone(event)
        self.assertEqual(event.pk, self.event.pk)
    
    def test_update_status_event_end_date_check_passes(self):
        """Simulates: if datetime.now().date() > datetime.strptime(date_str, '%Y-%m-%d').date()"""
        # Should NOT be greater (end_date is in future)
        event = self.event
        event_end_date = event.end_date
        current_date = datetime.now().date()
        
        # This check should PASS (return False, meaning we CAN update)
        can_update = not (current_date > event_end_date)
        self.assertTrue(can_update)
    
    def test_update_status_change_status_to_yes(self):
        """Simulates: serializer.save() for status change to 'yes'"""
        available_date = self.available_date
        available_date.status = "yes"
        available_date.save()
        
        # Verify it persisted
        updated = AvailableDate.objects.get(pk=available_date.pk)
        self.assertEqual(updated.status, "yes")
    
    def test_update_status_change_status_to_no(self):
        """Simulates: serializer.save() for status change to 'no'"""
        available_date = self.available_date
        available_date.status = "no"
        available_date.save()
        
        # Verify it persisted
        updated = AvailableDate.objects.get(pk=available_date.pk)
        self.assertEqual(updated.status, "no")
    
    def test_update_status_change_status_to_maybe(self):
        """Simulates: serializer.save() for status change to 'maybe'"""
        available_date = self.available_date
        available_date.status = "maybe"
        available_date.save()
        
        # Verify it persisted
        updated = AvailableDate.objects.get(pk=available_date.pk)
        self.assertEqual(updated.status, "maybe")
