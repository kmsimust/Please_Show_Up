from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from friend.serializers import FriendSerializer
from .serializers import FriendRequestSerializer
from .models import FriendRequest

# Create your views here.
@api_view(["GET"])
@permission_classes([AllowAny])
def get_friend_requests(request):
    #print(request.GET.get('y'))
    friends = FriendRequest.objects.all() # get all data from DB
    serializer = FriendRequestSerializer(friends, many=True) # convert datas to serializer (JSON)
    return Response(serializer.data)

@api_view((["GET"]))
@permission_classes([AllowAny])
def get_user_friend_request(request, friend_id):
    user = FriendRequest.objects.filter(friend_id=friend_id, status = "pending")
    serializer = FriendRequestSerializer(user, many=True)
    return Response(serializer.data)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_friend_request(request):
    body = request.data
    serializer = FriendRequestSerializer(data=body)
    if serializer.is_valid():
        serializer.save() # INSERT 
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def update_friend_request(request, pk):
    body = request.data
    try:
        friend = FriendRequest.objects.get(pk=pk)
    except FriendRequest.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    serializer = FriendRequestSerializer(friend, data=body)
    if serializer.is_valid():
        serializer.save() # UPDATE
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["PATCH"])
@permission_classes([IsAuthenticated])
def update_status_friend_request(request, pk, f_status):
    try:
        friend_request = FriendRequest.objects.get(pk=pk)
    except FriendRequest.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = FriendRequestSerializer(friend_request, data={"status": f_status}, partial=True)
    if serializer.is_valid():
        serializer.save()  # Save status first
        if f_status == "approved":
            data = {"user_id": friend_request.user_id.id, "friend_id": friend_request.friend_id.id}

            friend_serializer = FriendSerializer(data=data)
            if friend_serializer.is_valid():
                friend_serializer.save()
        
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def delete_friend_request(request, pk):
    #id = request.GET.get('pk') # 4
    try:
        friend = FriendRequest.objects.get(pk=pk)
    except FriendRequest.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    friend.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)
