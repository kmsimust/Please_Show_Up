from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from .models import AvailableDate
from .serializer import AvailableDateSerializer, AvailableDateSerializerSave

# Create your views here.
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_available_date(request):
    available_date = AvailableDate.objects.all()
    serializer = AvailableDateSerializer(available_date, many = True)
    return Response(serializer.data)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_available_date_info_by_pk(request, pk):
    available_date = AvailableDate.objects.get(pk=pk)
    serializer = AvailableDateSerializer(available_date)
    return Response(serializer.data)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_available_date_by_event_id(request, event_id):
    available_date = AvailableDate.objects.filter(event = event_id)
    serializer = AvailableDateSerializer(available_date, many=True)
    return Response(serializer.data)

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_available_date(request):
    body = request.data

    serializer = AvailableDateSerializerSave(data = body)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["PUT"])
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
@permission_classes([IsAuthenticated])
def update_status(request, pk):
    try:
        available_date = AvailableDate.objects.get(pk = pk)
    except AvailableDate.DoesNotExist:
         return Response(status=status.HTTP_404_NOT_FOUND)
    
    body = request.data
    serializer = AvailableDateSerializerSave(available_date, data = {"status": body["status"]}, partial = True)
    
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)

@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def delete_available_date(request, pk):
    try:
        available_date = AvailableDate.objects.get(pk=pk)
    except AvailableDate.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    available_date.delete()
    return Response(status = status.HTTP_204_NO_CONTENT)

