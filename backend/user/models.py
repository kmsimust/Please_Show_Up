from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class User(AbstractUser):
    username = models.CharField(max_length=10, unique=True)
    email = models.CharField(max_length=20, unique=True)
    password = models.CharField(max_length=255)
    profile_image = models.CharField(max_length=100, default="default")
    banner = models.CharField(max_length=100, default="dafault")
    gender = models.CharField(max_length=10, null=True, blank=True)
    date_of_birth = models.DateField(null=True, blank=True)
    phone_number = models.CharField(max_length=12, null=True, blank=True)
    display_name = models.CharField(max_length=20, null=True, blank=True)
    first_name = models.CharField(max_length=20, null=True, blank=True)
    last_name = models.CharField(max_length=20, null=True, blank=True)
    created_at = models.DateTimeField(null=True, auto_now_add=True)  

    def __str__(self):
        return f"Username: {self.username} | Email: {self.email} | Firstname: {self.first_name}"
    
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("The Email field must be set")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)  # Ensures the password is hashed
        user.save(using=self._db)
        return user
    
    class Meta:
        ordering = ["id"]
        db_table = "user"
        
    
        
        