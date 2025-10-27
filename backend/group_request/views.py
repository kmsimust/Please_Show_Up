from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
# from group_member.models import GroupMember
# from group_member.serializers import GroupMemberSerializer
from .serializers import GroupRequestSerializers
from .models import GroupRequest


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_group_request(request):
    group_request = GroupRequest.objects.all()
    serializer = GroupRequestSerializers(GroupRequest, many = True)
    return Response(serializer.data)

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_group_request(request):
    body = request.data
    serializer = GroupRequestSerializers(data = body)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.error, status = status.HTTP_400_BAD_REQUEST)

@api_view(["put"])
@permission_classes([IsAuthenticated])
def update_group_request(request, pk):
    body = request.data
    try:
        group_request = GroupRequest.objects.get(pk = pk)
    except GroupRequest.DoesNotExist:
        return Response(status = status.HTTP_404_NOT_FOUND)
    
    serializer = GroupRequestSerializers(group_request,data=body)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)

@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def delete_group_request(request,pk):
    try:
        group_request = GroupRequest.objects.get(pk = pk)
    except GroupRequest.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    group_request.delete()
    return Response(status = status.HTTP_204_NO_CONTENT)