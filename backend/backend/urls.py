from django.contrib import admin
from django.urls import path, include
from friend_request.views import get_user_friend_request, get_friend_requests, create_friend_request, delete_friend_request, update_friend_request, update_status_friend_request
from user.views import get_user, get_me_user, create_user, update_user, delete_user, login_user
from friend.views import get_friends, create_friend, delete_friend, update_friend , get_friend_by_user_id
from member_role import views as member_role_view
from group.views import get_group, create_group, update_group, delete_group
from group_member import views as group_member_view
from event import views as event_view
from inactive_date import views as inactive_date_view


urlpatterns = [
    path('admin/', admin.site.urls),
    #path('', include('user.urls')),
    path('api/auth/', include('knox.urls')),
    path('api/friend_request/', get_friend_requests),
    path('api/get_user_friend_request/<int:friend_id>', get_user_friend_request),
    path('api/create_friend_request/', create_friend_request),
    path('api/update_friend_request/<int:pk>', update_friend_request),
    path('api/update_status_friend_request/<int:pk>/<str:f_status>', update_status_friend_request),
    path('api/delete_friend_request/<int:pk>', delete_friend_request),


    path('api/friend/', get_friends),
    path('api/get_friend_by_user_id/<int:user_id>', get_friend_by_user_id),
    path('api/create_friend', create_friend),
    path('api/update_friend/<int:pk>', update_friend),
    path('api/delete_friend/<int:pk>', delete_friend),


    path('api/get_group/', get_group),
    path('api/create_group', create_group),
    path('api/update_group/<int:pk>', update_group),
    path('api/delete_group/<int:pk>', delete_group),


    path('api/member_role/', member_role_view.MemberRoleList.as_view()),
    path('api/group_member/', group_member_view.GroupMemberList.as_view()),
    path('api/event/', event_view.EventList.as_view()),
    path('api/inactive_date/', inactive_date_view.InactiveDateList.as_view()),
    path('api/user/', get_user),
    path('api/user/me/', get_me_user),
    path('api/user/create/', create_user),
    path('api/user/login/', login_user),
    path('api/user/update/<int:pk>', update_user),
    path('api/user/delete/<int:pk>', delete_user)
]

