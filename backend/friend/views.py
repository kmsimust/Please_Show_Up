from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .serializers import FriendSerializer, FriendSerializerSave
from .models import Friend
from user.models import User
from django.db.models import Q
from user.serializers import UserSerializer

# Create your views here.
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_friends(request):
    #print(request.GET.get('y'))
    friends = Friend.objects.all() # get all data from DB
    serializer = FriendSerializer(friends, many=True) # convert datas to serializer (JSON)
    return Response(serializer.data)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_friend_by_user_id(request, user_id):
    try:
        friends = Friend.objects.filter(Q(user_id = user_id) | Q(friend_id = user_id))
        serializer = FriendSerializer(friends, many = True)
    except Friend.DoesNotExist:
        return Response([], status=status.HTTP_404_NOT_FOUND)
    return Response(serializer.data)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_user_by_friend_id(request, friend_id):
    try:
        user = User.objects.filter(user_id = friend_id)
        serializer = UserSerializer(user, many = True)
    except User.DoesNotExist:
        return Response([], status=status.HTTP_404_NOT_FOUND)
    return Response(serializer.data)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_friends_from_user_id(request, user_id):
    try:
        friends = Friend.objects.filter(user_id = user_id) | Friend.objects.filter(friend_id = user_id)
        serializer = FriendSerializer(friends, many = True)
    except Friend.DoesNotExist:
        return Response([], status=status.HTTP_404_NOT_FOUND)
    return Response(serializer.data)

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_friend(request):
    body = request.data
    serializer = FriendSerializerSave(data=body)
    if serializer.is_valid():
        serializer.save() # INSERT 
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def update_friend(request, pk):
    body = request.data
    try:
        friend = Friend.objects.get(pk=pk)
    except Friend.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    serializer = FriendSerializerSave(friend, data=body)
    if serializer.is_valid():
        serializer.save() # UPDATE
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def delete_friend(request, pk):
    try:
        friend = Friend.objects.get(pk=pk)
    except Friend.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    friend.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)


    