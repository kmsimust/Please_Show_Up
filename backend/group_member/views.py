from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .serializers import GroupMemberSerializer
from .models import GroupMember

# Create your views here.
@api_view(["GET"])
@permission_classes([AllowAny])
def get_group_member(request):
    group_member = GroupMember.objects.all()
    serializer = GroupMemberSerializer(group_member, many = True)
    return Response(serializer.data)

@api_view(["POST"])
@permission_classes([AllowAny])
def create_group_member(request):
    body = request.data
    serializer = GroupMemberSerializer(data = body)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["PUT"])
@permission_classes([AllowAny])
def update_group_member(request, pk):
    body = request.data
    try:
        group_member = GroupMember.objects.get(pk = pk)
    except GroupMember.DoesNotExist:
         return Response(status=status.HTTP_404_NOT_FOUND)
    
    serializer = GroupMemberSerializer(group_member, data = body)
    if serializer.is_valid():
        serializer.save() # UPDATE
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["DELETE"])
@permission_classes([AllowAny])
def delete_group_member(request, pk):
    try:
        group_member = GroupMember.objects.get(pk=pk)
    except GroupMember.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    group_member.delete()
    return Response(status = status.HTTP_204_NO_CONTENT)