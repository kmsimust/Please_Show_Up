from django.core.management.base import BaseCommand
from group.models import Group
from group_member.models import GroupMember
from event.models import Event
from available_date.models import AvailableDate
from datetime import timedelta


class Command(BaseCommand):
    help = 'Ensure all group owners are members and have available dates for events'

    def handle(self, *args, **options):
        groups = Group.objects.all()
        fixed_groups = 0
        fixed_events = 0

        for group in groups:
            # Check if owner is a member
            group_member, created = GroupMember.objects.get_or_create(
                group=group,
                member=group.owner
            )
            
            if created:
                self.stdout.write(
                    self.style.SUCCESS(
                        f'Added {group.owner.username} as member of group "{group.group_name}"'
                    )
                )
                fixed_groups += 1

                # Create available dates for all events in this group
                events = Event.objects.filter(group=group)
                for event in events:
                    if event.start_date:
                        # Check if owner already has available dates for this event
                        if not AvailableDate.objects.filter(event=event, group_member=group_member).exists():
                            # Create 7 days of available dates
                            for i in range(7):
                                date_val = event.start_date + timedelta(days=i)
                                AvailableDate.objects.create(
                                    event=event,
                                    group_member=group_member,
                                    date=date_val,
                                    status="maybe"
                                )
                            self.stdout.write(
                                self.style.SUCCESS(
                                    f'  Created available dates for event "{event.name}"'
                                )
                            )
                            fixed_events += 1

        self.stdout.write(
            self.style.SUCCESS(
                f'\nSummary: Fixed {fixed_groups} groups and {fixed_events} events'
            )
        )
