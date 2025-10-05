from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()
router.register('register', RegisterViewset, basename='register')
router.register('login', LoginViewset, basename='login')
router.register('search_friend', SearchFriendViewset, basename='search_friend')
urlpatterns = router.urls
