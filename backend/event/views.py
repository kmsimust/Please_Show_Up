from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status


from .models import Event
from .serializers import EventSerializer, EventSerializerSave

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_event(request):
    group = Event.objects.all() # get all data from DB
    serializer = EventSerializer(group, many=True) # convert datas to serializer (JSON)
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
        friend = Event.objects.get(pk=pk)
    except Event.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    serializer = EventSerializerSave(friend, data=body)
    if serializer.is_valid():
        serializer.save() # UPDATE
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def delete_event(request, pk):
    try:
        friend = Event.objects.get(pk=pk)
    except Event.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    friend.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)
