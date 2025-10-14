from rest_framework import serializers
from .models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id","username","email","password","profile_image","banner","gender","date_of_birth",
                  "phone_number","display_name","first_name","last_name","created_at")