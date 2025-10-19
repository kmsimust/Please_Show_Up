from django.contrib import admin
from django.urls import path, include
#from user_profile import views as user_views
from group_event import views as group_event_views
from friend_request import views as friend_request_view
from user.views import get_user, get_me_user, create_user, update_user, delete_user, login_user
from friend.views import get_friends, create_friend, delete_friend, update_friend
from member_role import views as member_role_view
from group_member import views as group_member_view
from event import views as event_view
from inactive_date import views as inactive_date_view


urlpatterns = [
    path('admin/', admin.site.urls),
    #path('', include('user.urls')),
    path('api/auth/', include('knox.urls')),
    path('api/group_event/', group_event_views.GroupEventList.as_view()),
    path('api/friend_request/', friend_request_view.FriendRequestList.as_view()),
    path('api/friend/', get_friends),
    path('api/create_friend', create_friend),
    path('api/update_friend/<int:pk>', update_friend),
    path('api/delete_friend/<int:pk>', delete_friend),
    path('api/member_role/', member_role_view.MemberRoleList.as_view()),
    path('api/group_member/', group_member_view.GroupMemberList.as_view()),
    path('api/event/', event_view.EventList.as_view()),
    path('api/inactive_date/', inactive_date_view.InactiveDateList.as_view()),
    #path('api/user_profile/', user_views.UserProfileList.as_view()),
    path('api/user/', get_user),
    path('api/user/me/', get_me_user),
    path('api/user/create/', create_user),
    path('api/user/login/', login_user),
    path('api/user/update/<int:pk>', update_user),
    path('api/user/delete/<int:pk>', delete_user)
    #path('api/me/', u_views.get_user_from_token, name='get_user_from_token'),
]

