from django.contrib import admin
from django.urls import path, include
#from user_profile import views as user_views
from group_event import views as event_views
from user import views as u_views

urlpatterns = [
    path('admin/', admin.site.urls),
    #path('', include('user.urls')),
    path('api/auth/', include('knox.urls')),
    path('api/group_event/', event_views.GroupEventList.as_view()),
    #path('api/user_profile/', user_views.UserProfileList.as_view()),
    #path('api/user/', u_views.UserList.as_view()),
    #path('api/me/', u_views.get_user_from_token, name='get_user_from_token'),
]

