from group_member.models import GroupMember
from group_member.serializers import GroupMemberSerializer
from datetime import datetime, timedelta
from available_date.serializer import AvailableDateSerializerSave

def create_date(serializer):
    serializer_dict = dict(serializer.data)
    group_member = GroupMember.objects.filter(group = serializer_dict["group"])
    
    if len(group_member) > 0:
        group_member_serializer = GroupMemberSerializer(group_member, many = True)
        group_member_serializer_list = list(group_member_serializer.data)

        start_date = datetime.strptime(serializer_dict["start_date"], '%Y-%m-%d').date() # type date


        #for group member
        for group_member_serializer_dict in group_member_serializer_list: #add 7 days in available date table
            for i in range(7):
                current_date = start_date + timedelta(days=i)
                available_date_serializer = AvailableDateSerializerSave(data = {"event": serializer_dict["id"],\
                                                                                "group_member": group_member_serializer_dict["id"],\
                                                                                "date": str(current_date),
                                                                                "status":"maybe"})
                if available_date_serializer.is_valid(): 
                    available_date_serializer.save()