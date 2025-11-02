from django.contrib import admin
from django.urls import path, include

from friend_request.views import get_user_friend_request, get_friend_requests,\
    create_friend_request, delete_friend_request, update_friend_request,\
    update_status_friend_request

from user.views import get_user, get_me_user, create_user, update_user,\
    delete_user, login_user, get_user_by_username

from friend.views import get_friends, create_friend, delete_friend,\
    update_friend , get_friend_by_user_id

from group_request.views import get_group_request, create_group_request, update_group_request, delete_group_request , update_status_group_request,\
get_invitation_by_user_id

from member_role import views as member_role_view
from group.views import get_group, create_group, update_group, delete_group, get_group_by_user_id , \
get_group_info_by_pk 
from group_member.views import get_group_member, create_group_member, update_group_member, delete_group_member,\
get_all_member_by_group_id, get_all_group_by_member_id
from event import views as event_view
from inactive_date import views as inactive_date_view


urlpatterns = [
    #admin path
    path('admin/', admin.site.urls),

    #friend request table link
    path('api/auth/', include('knox.urls')),
    path('api/friend_request/', get_friend_requests),
    path('api/get_user_friend_request/<int:friend_id>', get_user_friend_request),
    path('api/create_friend_request/', create_friend_request),
    path('api/update_friend_request/<int:pk>', update_friend_request),
    path('api/update_status_friend_request/<int:pk>/<str:f_status>', update_status_friend_request),
    path('api/delete_friend_request/<int:pk>', delete_friend_request),

    #Friend table link
    path('api/friend/', get_friends),
    path('api/get_friend_by_user_id/<int:user_id>', get_friend_by_user_id),
    path('api/create_friend', create_friend),
    path('api/update_friend/<int:pk>', update_friend),
    path('api/delete_friend/<int:pk>', delete_friend),

    #group table link
    path('api/get_group/', get_group),
    path('api/get_group_by_user_id/<int:user_id>', get_group_by_user_id),
    path('api/create_group', create_group),
    path('api/update_group/<int:pk>', update_group),
    path('api/delete_group/<int:pk>', delete_group),
    path('api/get_group_info_by_pk/<int:pk>', get_group_info_by_pk),

    #member role table
    path('api/member_role/', member_role_view.MemberRoleList.as_view()),
    
    #group member table
    path('api/get_group_member/', get_group_member),
    path('api/create_group_member', create_group_member),
    path('api/update_group_member/<int:pk>', update_group_member),
    path('api/delete_group_member/<int:pk>', delete_group_member),
    path('api/get_all_member_by_group_id/<int:group_id>', get_all_member_by_group_id),
    path('api/get_all_group_by_member_id/<int:member_id>',get_all_group_by_member_id),

    #group request table
    path('api/get_group_request', get_group_request),
    path('api/create_group_request', create_group_request),
    path('api/update_group_request/<int:pk>', update_group_request),
    path('api/delete_group_request/<int:pk>', delete_group_request),
    path('api/update_status_group_request/<int:pk>/<str:g_status>', update_status_group_request),
    path('api/get_invitation_by_user_id/<int:invited_id>', get_invitation_by_user_id),

    
    #event table link
    path('api/event/', event_view.EventList.as_view()),

    #inactive table link
    path('api/inactive_date/', inactive_date_view.InactiveDateList.as_view()),
    
    #user table link
    path('api/user/', get_user),
    path('api/user/me/', get_me_user),
    path('api/user/create/', create_user),
    path('api/user/login/', login_user),
    path('api/user/update/<int:pk>', update_user),
    path('api/user/delete/<int:pk>', delete_user),
    path('api/user/get_user_by_username/<int:username>', get_user_by_username)
]

