from django.contrib import admin
from django.urls import path, include
from group_event import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('user.urls')),
    path('api/auth', include('knox.urls')),
    path('api/group_event/', views.GroupEventList.as_view())
]
