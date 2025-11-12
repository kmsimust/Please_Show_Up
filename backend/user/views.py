# user/views.py
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import APIException
from django.contrib.auth import authenticate
from django.db.models import Q
from .authentication import create_access_token, create_refresh_token
from .serializers import UserSerializer
from .models import User
from util.upload import upload_file


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_user(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_me_user(request):
    # DRF's authentication system already set request.user
    user = request.user

    if not user or not user.is_authenticated:
        raise APIException("Unauthenticated user.")

    serializer = UserSerializer(user)
    return Response(serializer.data)


@api_view(["POST"])
@permission_classes([AllowAny])
def create_user(request):
    body = request.data
    duplicate_flag = 1
    
    try:
        #user = User.objects.get(email = body["email"], username = body["username"])
        user = User.objects.get(Q(email = body["email"]) | Q(username = body["username"])) # | OR
        return Response({"message": "duplicate email or username"}, status = status.HTTP_400_BAD_REQUEST)
    except User.DoesNotExist:
        duplicate_flag = 0
    
    if duplicate_flag == 0:
        serializer = UserSerializer(data = body)
        if serializer.is_valid():
            serializer.save()  # password hashing handled in serializer.create
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
@permission_classes([AllowAny])
def login_user(request):
    username = request.data.get("username")
    password = request.data.get("password")

    if not username or not password:
        return Response({"detail": "Username and password required."},
                        status=status.HTTP_400_BAD_REQUEST)

    # Use Django's authenticate to verify password hash
    user = authenticate(request, username=username, password=password)
    if user is None:
        # raise APIException("Invalid credentials!")
        return Response({"detail": "wrong username or password"}, status = status.HTTP_400_BAD_REQUEST)

    serializer = UserSerializer(user)
    access_token = create_access_token(user.id)
    refresh_token = create_refresh_token(user.id)
    data = {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "user": serializer.data,  # password is write_only so it won't leak here
    }
    return Response(data, status=status.HTTP_200_OK)


@api_view(["PUT", "PATCH"])
@permission_classes([IsAuthenticated])
def update_user(request, pk):
    try:
        user = User.objects.get(pk=pk)
    except User.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    # IMPORTANT: do NOT call user.set_password() here.
    # Let the serializer hash it if "password" is present.
    partial = request.method == "PATCH"
    serializer = UserSerializer(user, data=request.data, partial=partial)
    if serializer.is_valid():
        serializer.save()  # password hashing handled in serializer.update
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def delete_user(request, pk):
    try:
        user = User.objects.get(pk=pk)
    except User.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    user.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_user_by_username(request, username):
    users = User.objects.get(username = username)
    serializer = UserSerializer(users)
    return Response(serializer.data)


@api_view(["PATCH"])
@permission_classes([IsAuthenticated])
def update_user_profile_image(request, pk):
    try:
        user = User.objects.get(pk = pk)
    except User.DoesNotExist:
        return Response(status = status.HTTP_404_NOT_FOUND)

    uploaded_file = request.FILES["profile_image"]


    serializer = UserSerializer(user)
    current_user_id, uploaded_name = upload_file(serializer, uploaded_file, "user", "profile_")
    serializer = UserSerializer(user, data = {"profile_image": f"/upload/user/{pk}/{uploaded_name}"}, partial = True)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status = status.HTTP_200_OK)
    return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)

@api_view(["PATCH"])
@permission_classes([IsAuthenticated])
def update_user_banner_image(request, pk):
    try:
        user = User.objects.get(pk = pk)
    except User.DoesNotExist:
        return Response(status = status.HTTP_404_NOT_FOUND)

    uploaded_file = request.FILES["banner"]


    serializer = UserSerializer(user)
    current_user_id, uploaded_name = upload_file(serializer, uploaded_file, "user", "banner_")
    serializer = UserSerializer(user, data = {"banner": f"/upload/user/{pk}/{uploaded_name}"}, partial = True)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status = status.HTTP_200_OK)
    return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)