from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
# from group_member.models import GroupMember
# from group_member.serializers import GroupMemberSerializer
from .serializers import GroupSerializer, GroupSerializerSave
from .models import Group
import time
from django.conf import settings

from util.upload import upload_file

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
    body = request.data # JSON / form-data
    uploaded_file = request.FILES["banner_image"] #As this is from-data we need to do request.file ratehr than .data
    body["banner_image"] = "default" #This is used to fool the db that we use a valid type(str) since a file is not valid here

    serializer = GroupSerializerSave(data=body)
    if serializer.is_valid():
        serializer.save() # INSERT 
        
        # Call upload function
        new_group_id, uploaded_name = upload_file(serializer, uploaded_file, "group")

        try: #this will help change string in database for image to be the path of it
            group = Group.objects.get(pk=new_group_id)
        except Group.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        serializer = GroupSerializerSave(group, data={"banner_image": f"/upload/group/{new_group_id}/{uploaded_name}"}, partial=True)
        if serializer.is_valid():
            serializer.save() # UPDATE

        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["PATCH"])
@permission_classes([IsAuthenticated])
def update_group_info(request, pk):
    body = request.data
    try:
        group = Group.objects.get(pk=pk)
    except Group.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    serializer = GroupSerializerSave(group, data=body, partial = True)
    if serializer.is_valid():
        serializer.save() # UPDATE
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["PATCH"])
@permission_classes([IsAuthenticated])
def update_group_banner(request, pk):
    try:
        group = Group.objects.get(pk = pk)
    except Group.DoesNotExist:
        return Response(status = status.HTTP_404_NOT_FOUND)
    
    uploaded_file = request.FILES["banner_image"]

    serializer = GroupSerializer(group)
    current_group_id, uploaded_name = upload_file(serializer, uploaded_file, "group")
    serializer = GroupSerializerSave(group, data = {"banner_image": f"/upload/group/{pk}/{uploaded_name}"}, partial = True)
     
    if serializer.is_valid():
        serializer.save()
        return Response(status = status.HTTP_201_CREATED)
    return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)

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
