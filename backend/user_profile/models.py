from django.db import models
from user.models import CustomUser


class UserProfile(models.Model):
    display_username = models.CharField(max_length=20)
    user_description = models.CharField(max_length=200)
    user_profile_picture = models.CharField(max_length=100)
    user_banner = models.CharField(max_length=100)

    id_fk = models.ForeignKey(
        CustomUser,
        on_delete=models.CASCADE,
        related_name="user_profiles",
        null=True
    )

    class Meta:
        ordering = ["-id"]
        db_table = "user_profile"

