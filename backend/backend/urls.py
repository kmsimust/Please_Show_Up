from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

from friend_request.views import get_user_friend_request, get_friend_requests,\
    create_friend_request, delete_friend_request, update_friend_request,\
    update_status_friend_request

from user.views import get_user, get_me_user, create_user, update_user,\
    delete_user, login_user, get_user_by_username, get_users_by_username , update_user_profile_image , \
    update_user_banner_image

from friend.views import get_friends, create_friend, delete_friend,\
    update_friend , get_friend_by_user_id

from group_request.views import get_group_request, create_group_request, update_group_request, delete_group_request , update_status_group_request,\
get_invitation_by_user_id

from group.views import get_group, create_group, update_group_info, delete_group, get_group_by_user_id , \
get_group_info_by_pk , update_group_banner

from group_member.views import get_group_member, create_group_member, update_group_member, delete_group_member,\
get_all_member_by_group_id, get_all_group_by_member_id

from event.views import get_event , create_event , update_event , delete_event , get_event_by_group_id , get_event_info ,\
      update_name_and_description , update_event_date , update_start_and_end_date

from available_date.views import get_available_date , create_available_date , update_available_date , delete_available_date , \
get_available_date_info_by_pk , get_available_date_by_event_id , update_status


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
    path('api/update_group_info/<int:pk>', update_group_info),
    path('api/delete_group/<int:pk>', delete_group),
    path('api/get_group_info_by_pk/<int:pk>', get_group_info_by_pk),

    
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
    path('api/update_group_banner/<int:pk>', update_group_banner),

    
    #event table link
    path('api/get_event/', get_event),
    path('api/create_event/', create_event),
    path('api/update_event/<int:pk>', update_event),
    path('api/delete_event/<int:pk>', delete_event),
    path('api/get_event_by_group_id/<int:group_id>', get_event_by_group_id),
    path('api/get_event_info/<int:pk>', get_event_info),
    path('api/update_name_and_description/<int:pk>', update_name_and_description),
    path('api/update_event_date/<int:pk>', update_event_date),
    path('api/update_start_and_end_date/<int:pk>', update_start_and_end_date),


    #available_date table link
    path('api/get_available_date', get_available_date),
    path('api/create_available_date', create_available_date),
    path('api/update_available_date/<int:pk>', update_available_date),
    path('api/delete_available_date/<int:pk>', delete_available_date),
    path('api/get_available_date_info_by_pk/<int:pk>', get_available_date_info_by_pk),
    path('api/get_available_date_by_event_id/<int:event_id>', get_available_date_by_event_id),
    path('api/update_status/<int:pk>', update_status),

    
    #user table link
    path('api/user/', get_user),
    path('api/user/me/', get_me_user),
    path('api/user/create_user/', create_user),
    path('api/user/login/', login_user),
    path('api/user/update_user/<int:pk>', update_user),
    path('api/user/delete_user/<int:pk>', delete_user),
    path('api/user/get_user_by_username/<str:username>', get_user_by_username),
    path('api/user/get_users_by_username/<str:username>', get_users_by_username),
    path('api/update_user_profile_image/<int:pk>', update_user_profile_image),
    path('api/update_user_banner_image/<int:pk>' , update_user_banner_image)
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

