# serializers.py
from rest_framework import serializers
from .models import UserProfile

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = (
            "id",
            "display_username",
            "user_description",
            "user_profile_picture",
            "user_banner",
        )

        