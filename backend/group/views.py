from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
# from group_member.models import GroupMember
# from group_member.serializers import GroupMemberSerializer
from .serializers import GroupSerializer, GroupSerializerSave
from .models import Group

# Create your views here.
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_group(request):
    #print(request.GET.get('y'))
    group = Group.objects.all() # get all data from DB
    serializer = GroupSerializer(group, many=True) # convert datas to serializer (JSON)
    return Response(serializer.data)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_group_by_user_id(request, user_id):
    groups = Group.objects.filter(owner=user_id)
    serializer = GroupSerializer(groups, many = True)
    return Response(serializer.data)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_group_info_by_pk(request, pk):
    group = Group.objects.get(pk=pk)
    serializer = GroupSerializer(group)
    return Response(serializer.data)

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_group(request):
    body = request.data
    serializer = GroupSerializerSave(data=body)
    if serializer.is_valid():
        serializer.save() # INSERT 
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def update_group(request, pk):
    body = request.data
    try:
        group = Group.objects.get(pk=pk)
    except Group.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    serializer = GroupSerializerSave(group, data=body)
    if serializer.is_valid():
        serializer.save() # UPDATE
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def delete_group(request, pk):
    #id = request.GET.get('pk') # 4
    try:
        group = Group.objects.get(pk=pk)
    except Group.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    group.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)
