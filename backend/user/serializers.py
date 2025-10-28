# user/serializers.py
from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    # Make password write-only and optional for updates
    password = serializers.CharField(write_only=True, required=False, allow_blank=True)

    class Meta:
        model = User
        fields = (
            "id", "username", "email", "password", "profile_image", "banner", "gender",
            "date_of_birth", "phone_number", "display_name", "first_name", "last_name",
            "created_at",
        )
        read_only_fields = ("id", "created_at")

    def create(self, validated_data):
        # Remove password from validated data so it's not set as raw text
        password = validated_data.pop("password", None)
        user = super().create(validated_data)
        if password:
            user.set_password(password)
            user.save(update_fields=["password"])
        return user

    def update(self, instance, validated_data):
        # Same idea for updates: if password provided, hash it
        password = validated_data.pop("password", None)
        user = super().update(instance, validated_data)
        if password is not None and password != "":
            user.set_password(password)
            user.save(update_fields=["password"])
        return user