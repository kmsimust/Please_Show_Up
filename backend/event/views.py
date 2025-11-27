from rest_framework.decorators import api_view, permission_classes, throttle_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from datetime import datetime, timedelta

from available_date.models import AvailableDate
from available_date.serializer import AvailableDateSerializerSave
from .models import Event
from group_member.models import GroupMember
from group_member.serializers import GroupMemberSerializer
from .serializers import EventSerializer, EventSerializerSave
from util.create_date import create_date

from rest_framework.throttling import UserRateThrottle


@api_view(["GET"])
@throttle_classes([UserRateThrottle])
@permission_classes([IsAuthenticated])
def get_event(request):
    event = Event.objects.all() # get all data from DB
    serializer = EventSerializer(event, many=True) # convert datas to serializer (JSON)
    return Response(serializer.data)

@api_view(["GET"])
@throttle_classes([UserRateThrottle])
@permission_classes([IsAuthenticated])
def get_event_info(request, pk):
    event = Event.objects.get(pk = pk) # get all data from DB

    # Ensure owner is a member and has available dates
    try:
        group_member, created = GroupMember.objects.get_or_create(group=event.group, member=event.group.owner)
        
        if event.start_date and not AvailableDate.objects.filter(event=event, group_member=group_member).exists():
            for i in range(7):
                date_val = event.start_date + timedelta(days=i)
                AvailableDate.objects.create(
                    event=event,
                    group_member=group_member,
                    date=date_val,
                    status="maybe"
                )
    except Exception as e:
        print(f"Error ensuring owner membership/dates: {e}")

    serializer = EventSerializer(event) # convert datas to serializer (JSON)
    return Response(serializer.data)

@api_view(["GET"])
@throttle_classes([UserRateThrottle])
@permission_classes([IsAuthenticated])
def get_event_by_group_id(request, group_id):
    event = Event.objects.filter(group = group_id) # get all data from DB
    serializer = EventSerializer(event, many=True) # convert datas to serializer (JSON)
    return Response(serializer.data)

@api_view(["POST"])
@throttle_classes([UserRateThrottle])
@permission_classes([IsAuthenticated])
def create_event(request):
    body = request.data

    if (datetime.strptime(body["start_date"], '%Y-%m-%d').date() < datetime.now().date()):
        return Response({"message":"Event can only start today and the day after"},status = status.HTTP_400_BAD_REQUEST)

    body["end_date"] = str(datetime.strptime(body["start_date"], '%Y-%m-%d').date() + timedelta(days=6)) #"2025-11-26"

    serializer = EventSerializerSave(data=body)
    if serializer.is_valid():
        serializer.save() # INSERT 

        create_date(serializer)

        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["PUT"])
@throttle_classes([UserRateThrottle])
@permission_classes([IsAuthenticated])
def update_event(request, pk):
    body = request.data
    try:
        event = Event.objects.get(pk=pk)
    except Event.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    date_str =  dict(EventSerializer(event).data)["end_date"]
    if datetime.now().date() > datetime.strptime(date_str, '%Y-%m-%d').date():
        return Response({"message":"Cannot edit anything after the end_date"} ,status = status.HTTP_400_BAD_REQUEST)
    
    if (datetime.strptime(body["start_date"], '%Y-%m-%d').date() < datetime.now().date()):
        return Response({"message":"Event can only start today and the day after"},status = status.HTTP_400_BAD_REQUEST)
    

    body["end_date"] = str(datetime.strptime(body["start_date"], '%Y-%m-%d').date() + timedelta(days=6))
    serializer = EventSerializerSave(event, data=body)
    if serializer.is_valid():
        serializer.save() # UPDATE
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["PATCH"])
@throttle_classes([UserRateThrottle])
@permission_classes([IsAuthenticated])
def update_name_and_description(request, pk):
    try:
        event = Event.objects.get(pk=pk)
    except Event.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    date_str =  dict(EventSerializer(event).data)["end_date"]
    if datetime.now().date() > datetime.strptime(date_str, '%Y-%m-%d').date():
        return Response({"message":"Cannot edit anything after the end_date"} ,status = status.HTTP_400_BAD_REQUEST)

    body = request.data
    serializer = EventSerializerSave(event, data={"name": body["name"], "description": body["description"]}, partial=True)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)

@api_view(["PATCH"])
@throttle_classes([UserRateThrottle])
@permission_classes([IsAuthenticated])
def update_start_and_end_date(request, pk):
    try:
        event = Event.objects.get(pk=pk)
    except Event.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    

    date_str =  dict(EventSerializer(event).data)["end_date"]
    if datetime.now().date() > datetime.strptime(date_str, '%Y-%m-%d').date():
        return Response({"message":"Cannot edit anything after the end_date"} ,status = status.HTTP_400_BAD_REQUEST)

    body = request.data

    if (datetime.strptime(body["start_date"], '%Y-%m-%d').date() < datetime.now().date()):
        return Response({"message":"Event can only start today and the day after"},status = status.HTTP_400_BAD_REQUEST)
    
    end_date = str(datetime.strptime(body["start_date"], '%Y-%m-%d').date() + timedelta(days=6))
    serializer = EventSerializerSave(event, data = {"start_date": body["start_date"], "end_date": end_date, "event_date":None}, partial = True)

    if serializer.is_valid():
        serializer.save()
        try:
            available_date = AvailableDate.objects.filter(event = pk)
            available_date.delete()
        except AvailableDate.DoesNotExist:
            print(f"available date not found at event_id:{pk}")


        create_date(serializer)

        return Response(serializer.data)
    return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)

@api_view(["PATCH"])
@throttle_classes([UserRateThrottle])
@permission_classes([IsAuthenticated])
def update_event_date(request, pk):
    try:
        event = Event.objects.get(pk=pk)
    except Event.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    date_str =  dict(EventSerializer(event).data)["end_date"]
    if datetime.now().date() > datetime.strptime(date_str, '%Y-%m-%d').date():
        return Response({"message":"Cannot edit anything after the end_date"} ,status = status.HTTP_400_BAD_REQUEST)
    
    body = request.data
    event_serializer = EventSerializer(event)

    # print("start_date", event_serializer["start_date"].value)
    start_date = datetime.strptime(event_serializer["start_date"].value, '%Y-%m-%d').date()
    end_date = datetime.strptime(event_serializer["end_date"].value, '%Y-%m-%d').date()
    event_date = datetime.strptime(body["event_date"], '%Y-%m-%d').date()

    if not(start_date <= event_date <= end_date):
        return Response({"message":"event date must be between start and end date"}, status = status.HTTP_400_BAD_REQUEST)

    serializer = EventSerializerSave(event, data = {"event_date": body["event_date"]}, partial = True)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)

@api_view(["DELETE"])
@throttle_classes([UserRateThrottle])
@permission_classes([IsAuthenticated])
def delete_event(request, pk):
    try:
        event = Event.objects.get(pk=pk)
    except Event.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    event.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)
