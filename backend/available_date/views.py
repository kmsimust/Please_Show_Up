from rest_framework.decorators import api_view, permission_classes, throttle_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from .models import AvailableDate
from .serializer import AvailableDateSerializer, AvailableDateSerializerSave
from datetime import datetime
from event.models import Event
from event.serializers import EventSerializer, EventSerializerSave

from rest_framework.throttling import UserRateThrottle

# Create your views here.
@api_view(["GET"])
@throttle_classes([UserRateThrottle])
@permission_classes([IsAuthenticated])
def get_available_date(request):
    available_date = AvailableDate.objects.all()
    serializer = AvailableDateSerializer(available_date, many = True)
    return Response(serializer.data)

@api_view(["GET"])
@throttle_classes([UserRateThrottle])
@permission_classes([IsAuthenticated])
def get_available_date_info_by_pk(request, pk):
    available_date = AvailableDate.objects.get(pk=pk)
    serializer = AvailableDateSerializer(available_date)
    return Response(serializer.data)

@api_view(["GET"])
@throttle_classes([UserRateThrottle])
@permission_classes([IsAuthenticated])
def get_available_date_by_event_id(request, event_id):
    available_date = AvailableDate.objects.filter(event = event_id)
    serializer = AvailableDateSerializer(available_date, many=True)
    return Response(serializer.data)

@api_view(["POST"])
@throttle_classes([UserRateThrottle])
@permission_classes([IsAuthenticated])
def create_available_date(request):
    body = request.data

    serializer = AvailableDateSerializerSave(data = body)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["PUT"])
@throttle_classes([UserRateThrottle])
@permission_classes([IsAuthenticated])
def update_available_date(request, pk):
    try:
        available_date = AvailableDate.objects.get(pk = pk)
    except AvailableDate.DoesNotExist:
         return Response(status=status.HTTP_404_NOT_FOUND)
    
    body = request.data
    
    serializer = AvailableDateSerializerSave(available_date, data = body)

    if serializer.is_valid():
        serializer.save() # UPDATE
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["PATCH"])
@throttle_classes([UserRateThrottle])
@permission_classes([IsAuthenticated])
def update_status(request, pk):
    try:
        available_date = AvailableDate.objects.get(pk = pk)
    except AvailableDate.DoesNotExist:
         return Response(status=status.HTTP_404_NOT_FOUND)
    
    body = request.data
    status_val = body.get("status")
    if not status_val:
        return Response({"message": "Status is required"}, status=status.HTTP_400_BAD_REQUEST)

    serializer = AvailableDateSerializerSave(available_date, data = {"status": status_val}, partial = True)

    if serializer.is_valid():
        try:
            event = Event.objects.get(pk = available_date.event_id)
        except Event.DoesNotExist:
            return Response(status= status.HTTP_404_NOT_FOUND)
        
        # Check end date directly using the model field
        if event.end_date and datetime.now().date() > event.end_date:
            return Response({"message":"Cannot edit anything after the end_date"} ,status = status.HTTP_400_BAD_REQUEST)
    
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)

@api_view(["DELETE"])
@throttle_classes([UserRateThrottle])
@permission_classes([IsAuthenticated])
def delete_available_date(request, pk):
    try:
        available_date = AvailableDate.objects.get(pk=pk)
    except AvailableDate.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    available_date.delete()
    return Response(status = status.HTTP_204_NO_CONTENT)

