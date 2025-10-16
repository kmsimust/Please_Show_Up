from django.contrib import admin
from django.urls import path, include
#from user_profile import views as user_views
from group_event import views as event_views
from friend_request import views as friend_request_view
from user.views import get_user, get_me_user, create_user, update_user, delete_user, login_user
from friend import views as friend_view

urlpatterns = [
    path('admin/', admin.site.urls),
    #path('', include('user.urls')),
    path('api/auth/', include('knox.urls')),
    path('api/group_event/', event_views.GroupEventList.as_view()),
    path('api/friend_request/', friend_request_view.FriendRequestList.as_view()),
    path('api/friend/', friend_view.FriendList.as_view()),
    #path('api/user_profile/', user_views.UserProfileList.as_view()),
    path('api/user/', get_user),
    path('api/user/me/', get_me_user),
    path('api/user/create/', create_user),
    path('api/user/login/', login_user),
    path('api/user/update/<int:pk>', update_user),
    path('api/user/delete/<int:pk>', delete_user)
    #path('api/me/', u_views.get_user_from_token, name='get_user_from_token'),
]

