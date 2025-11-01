from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from group.models import Group
# from group_member.serializers import GroupMemberSerializer
from group_member.serializers import GroupMemberSerializer, GroupMemberSerializerSave
from .serializers import GroupRequestSerializers, GroupRequestSerializersSave
from .models import GroupRequest


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_group_request(request):
    group_request = GroupRequest.objects.all()
    serializer = GroupRequestSerializers(group_request, many = True)
    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_invitation_by_user_id(request, invited_id):
    group_request = GroupRequest.objects.filter(invited_user = invited_id, status = "pending")
    serializer = GroupRequestSerializers(group_request, many = True)
    return Response(serializer.data)

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_group_request(request):
    body = request.data

    try:
        group = Group.objects.get(pk = body["group_id"])
    except Group.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if group.owner_id.id == body["invited_user_id"]:
        return Response(status = status.HTTP_400_BAD_REQUEST)

    serializer = GroupRequestSerializersSave(data=body)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.error, status=status.HTTP_400_BAD_REQUEST)


@api_view(["PATCH"])
@permission_classes([IsAuthenticated])
def update_status_group_request(request, pk, g_status):
    try:
        group_request = GroupRequest.objects.get(pk=pk)
    except GroupRequest.DoesNotExist:
        return Response(status = status.HTTP_404_NOT_FOUND)
    
    serializer = GroupRequestSerializersSave(group_request, data = {"status":g_status}, partial = True)
    if serializer.is_valid():
        serializer.save()
        if g_status == "approved":
            data = {"group_id": group_request.group_id.id, "member_id": group_request.invited_user_id.id}
            
            group_member_serializer = GroupMemberSerializerSave(data = data)
            if group_member_serializer.is_valid():
                group_member_serializer.save()
                
        return Response(serializer.data)
    return Response(status = status.HTTP_400_BAD_REQUEST)

@api_view(["PUT"])
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
@permission_classes([IsAuthenticated])
def delete_group_request(request, pk):
    try:
        group_request = GroupRequest.objects.get(pk = pk)
    except GroupRequest.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    group_request.delete()
    return Response(status = status.HTTP_204_NO_CONTENT)
