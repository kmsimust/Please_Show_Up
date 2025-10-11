from django.shortcuts import render
from rest_framework import viewsets, permissions, generics
from .serializers import *
from .models import *
from rest_framework.response import Response
from django.contrib.auth import get_user_model, authenticate
from knox.models import AuthToken
from .models import CustomUser
from .serializers import UserSerializer
from django.http import Http404
from .serializers import RegisterSerializer

from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response


from rest_framework.exceptions import MethodNotAllowed
User = get_user_model()


class LoginViewset(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]
    serializer_class = LoginSerializer

    def create(self, request):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            email = serializer.validated_data['email']
            password = serializer.validated_data['password']

            user = authenticate(request, email=email, password=password)

            if user:
                _, token = AuthToken.objects.create(user)

                return Response(
                    {
                        "user": self.serializer_class(user).data,
                        "token": token
                    }
                )
        else:
            return Response(
                {"error": "invalid cred"}, 
                status=401
                )


class RegisterViewset(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = User.objects.all()
    serializer_class = RegisterSerializer

    def create(self, request):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)

class SearchFriendViewset(viewsets.ViewSet):
    """
    Use DRF's built-in actions.
    - GET /api/friends/?username=<name>  -> list() filtered by username
    - GET /api/friends/<username>/       -> retrieve() by username
    """
    # GET /api/friends/?username=Gotzibara
    def list(self, request):
        username = request.query_params.get("username")
        qs = CustomUser.objects.all()
        if username:
            qs = qs.filter(username__iexact=username)  # exact match, case-insensitive
        # If you want to force a username param, uncomment next two lines:
        # else:
        #     return Response({"detail": "username query param is required"}, status=400)
        serializer = UserSerializer(qs, many=True)
        return Response(serializer.data)

    # GET /api/friends/<username>/
    # Router passes the path segment as pk (string is OK).
    def retrieve(self, request, pk=None):
        user = CustomUser.objects.filter(username__iexact=pk).first()
        if not user:
            raise Http404
        serializer = UserSerializer(user)
        return Response(serializer.data)

    def create(self, request):
        raise MethodNotAllowed("POST")

    def update(self, request, pk=None):
        raise MethodNotAllowed("PUT")

    def partial_update(self, request, pk=None):
        raise MethodNotAllowed("PATCH")

    def destroy(self, request, pk=None):
        raise MethodNotAllowed("DELETE")
    
        
@api_view(['GET'])
def get_user_from_token(request):
    print("request: ", request);
    user = request.user
    
    accessToken = request.headers["authorization"]
    token = accessToken.split(" ")[1]
    return Response({
        'accessToken': request.headers["authorization"],
        'token': token,
        'user': str(user)
        # 'id': 1,
        # 'username': "test",
        # 'email': "test",
        # 'first_name': "test",
        # 'last_name': "test"
    })
    
class UserList(generics.ListAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    
    