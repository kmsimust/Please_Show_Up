from rest_framework.decorators import api_view, permission_classes, throttle_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from group.models import Group
from friend.models import Friend
# from group_member.serializers import GroupMemberSerializer
from group_member.serializers import GroupMemberSerializer, GroupMemberSerializerSave
from group_member.models import GroupMember
from .serializers import GroupRequestSerializers, GroupRequestSerializersSave
from .models import GroupRequest
from django.db.models import Q

from rest_framework.throttling import UserRateThrottle


@api_view(["GET"])
@throttle_classes([UserRateThrottle])
@permission_classes([IsAuthenticated])
def get_group_request(request):
    group_request = GroupRequest.objects.all()
    serializer = GroupRequestSerializers(group_request, many = True)
    return Response(serializer.data)


@api_view(["GET"])
@throttle_classes([UserRateThrottle])
@permission_classes([IsAuthenticated])
def get_invitation_by_user_id(request, invited_id):
    group_request = GroupRequest.objects.filter(invited_user = invited_id, status = "pending")
    serializer = GroupRequestSerializers(group_request, many = True)
    return Response(serializer.data)

@api_view(["GET"])
@throttle_classes([UserRateThrottle])
@permission_classes([IsAuthenticated])
def get_invitation_by_group_id(request, group_id):
    group_request = GroupRequest.objects.filter(group = group_id)
    serializer = GroupRequestSerializers(group_request, many = True)
    return Response(serializer.data)

@api_view(["POST"])
@throttle_classes([UserRateThrottle])
@permission_classes([IsAuthenticated])
def create_group_request(request):
    body = request.data
    current_user = request.user

    try:
        group = Group.objects.get(pk=body["group"])
    except Group.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    # Check if current user is friends with invited user (both directions)
    try:
        Friend.objects.filter(user=current_user.id, friend=body["invited_user"])
    except Friend.DoesNotExist:
        try:
            Friend.objects.filter(user=body["invited_user"], friend=current_user.id)
        except Friend.DoesNotExist:
            return Response({"message": "Cannot add a non-friend into group"}, status=status.HTTP_400_BAD_REQUEST)
    
    if group.owner.id == body["invited_user"]:
        return Response({"message": "Cannot self invite"}, status=status.HTTP_400_BAD_REQUEST)
    
    # Check for existing invite
    if GroupRequest.objects.filter(invited_user=body["invited_user"], group=body["group"]).exists():
        return Response({"message": f"this user (id = {body['invited_user']}) has already invite"}, status=status.HTTP_400_BAD_REQUEST)
    
    serializer = GroupRequestSerializersSave(data=body)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["PATCH"])
@throttle_classes([UserRateThrottle])
@permission_classes([IsAuthenticated])
def update_status_group_request(request, pk, g_status):
    try:
        group_request = GroupRequest.objects.get(pk=pk, status = "pending")
    except GroupRequest.DoesNotExist:
        return Response({"message":"grouprequest not found or status already setted"},status=status.HTTP_404_NOT_FOUND)
    
    serializer = GroupRequestSerializersSave(group_request, data={"status": g_status}, partial=True)
    if serializer.is_valid():
        serializer.save()

        if g_status == "approved":
            data = { "group": group_request.group.id , "member": group_request.invited_user.id }
            group_member_serializer = GroupMemberSerializerSave(data=data)
            if group_member_serializer.is_valid():
                group_member_serializer.save()

        return Response(serializer.data)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["PUT"])
@throttle_classes([UserRateThrottle])
@permission_classes([IsAuthenticated])
def update_group_request(request, pk):
    body = request.data
    try:
        group_request = GroupRequest.objects.get(pk = pk)
    except GroupRequest.DoesNotExist:
        return Response(status = status.HTTP_404_NOT_FOUND)
    
    serializer = GroupRequestSerializersSave(group_request,data=body)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)

@api_view(["DELETE"])
@throttle_classes([UserRateThrottle])
@permission_classes([IsAuthenticated])
def delete_group_request(request, pk):
    try:
        group_request = GroupRequest.objects.get(pk = pk)
    except GroupRequest.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    group_request.delete()
    return Response(status = status.HTTP_204_NO_CONTENT)
