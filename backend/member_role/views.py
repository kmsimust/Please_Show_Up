from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .serializers import MemberRoleSerializer, MemberRoleSerializerSave
from .models import MemberRole

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_member_role(request):
    group_member = MemberRole.objects.all()
    serializer = MemberRoleSerializer(group_member, many = True)
    return Response(serializer.data)

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_member_role(request):
    body = request.data
    serializer = MemberRoleSerializerSave(data = body)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def update_member_role(request, pk):
    body = request.data
    try:
        group_member = MemberRole.objects.get(pk = pk)
    except MemberRole.DoesNotExist:
         return Response(status=status.HTTP_404_NOT_FOUND)
    
    serializer = MemberRoleSerializerSave(group_member, data = body)
    if serializer.is_valid():
        serializer.save() # UPDATE
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def delete_member_role(request, pk):
    try:
        group_member = MemberRole.objects.get(pk=pk)
    except MemberRole.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    group_member.delete()
    return Response(status = status.HTTP_204_NO_CONTENT)