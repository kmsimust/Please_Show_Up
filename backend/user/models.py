from django.db import models

# Create your models here.
class User(models.Model):
    username = models.CharField(max_length=10)
    email = models.CharField(max_length=20)
    password = models.CharField(max_length=20)
    profile_image = models.CharField(max_length=100)
    banner = models.CharField(max_length=100)
    gender = models.CharField(max_length=10, null=True, blank=True)
    date_of_birth = models.DateField(null=True, blank=True)
    phone_number = models.CharField(max_length=12, null=True, blank=True)
    display_name = models.CharField(max_length=20, null=True, blank=True)
    first_name = models.CharField(max_length=20, null=True, blank=True)
    last_name = models.CharField(max_length=20, null=True, blank=True)
    created_at = models.DateTimeField(null=True, auto_now_add=True)  

    def __str__(self):
        return f"Username: {self.username} | Email: {self.email} | Firstname: {self.first_name}"
    
    class Meta:
        ordering = ["id"]
        db_table = "user"
        
    
        
        