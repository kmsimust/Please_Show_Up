from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status


from .models import Event
from .serializers import EventSerializer, EventSerializerSave

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_event(request):
    event = Event.objects.all() # get all data from DB
    serializer = EventSerializer(event, many=True) # convert datas to serializer (JSON)
    return Response(serializer.data)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_event_info(request, pk):
    event = Event.objects.get(pk = pk) # get all data from DB
    serializer = EventSerializer(event) # convert datas to serializer (JSON)
    return Response(serializer.data)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_event_by_group_id(request, group_id):
    event = Event.objects.filter(group = group_id) # get all data from DB
    serializer = EventSerializer(event, many=True) # convert datas to serializer (JSON)
    return Response(serializer.data)

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_event(request):
    body = request.data

    serializer = EventSerializerSave(data=body)
    if serializer.is_valid():
        serializer.save() # INSERT 
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def update_event(request, pk):
    body = request.data
    try:
        event = Event.objects.get(pk=pk)
    except Event.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    serializer = EventSerializerSave(event, data=body)
    if serializer.is_valid():
        serializer.save() # UPDATE
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["PATCH"])
@permission_classes([IsAuthenticated])
def update_name_and_description(request, pk):
    try:
        event = Event.objects.get(pk=pk)
    except Event.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    body = request.data
    serializer = EventSerializerSave(event, data={"name": body["name"], "description": body["description"]}, partial=True)

    if serializer.is_valid():
        serializer.save
        return Response(serializer.data)
    return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)

@api_view(["PATCH"])
@permission_classes([IsAuthenticated])
def update_start_and_end_date(request, pk):
    try:
        event = Event.objects.get(pk=pk)
    except Event.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    body = request.data
    serializer = EventSerializerSave(event, data = {"start_date": body["start_date"], "end_date": body["end_date"]}, partial = True)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)

@api_view(["PATCH"])
@permission_classes([IsAuthenticated])
def update_event_date(request, pk):
    try:
        event = Event.objects.get(pk=pk)
    except Event.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    body = request.data
    serializer = EventSerializerSave(event, data = {"event_date": body["event_date"]}, partial = True)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)

@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def delete_event(request, pk):
    try:
        event = Event.objects.get(pk=pk)
    except Event.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    event.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)
