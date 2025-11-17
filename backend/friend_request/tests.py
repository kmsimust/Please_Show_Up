import pytest
from django.contrib.auth import get_user_model
from rest_framework.test import APIRequestFactory, force_authenticate
from rest_framework import status

from friend_request.models import FriendRequest
from friend_request.views import (
    get_friend_requests,
    get_user_friend_request,
    create_friend_request,
    update_friend_request,
    update_status_friend_request,
    delete_friend_request,
)
from friend.models import Friend


@pytest.fixture
def rf():
    return APIRequestFactory()


@pytest.fixture
def users(db):
    """
    Create a few users to use in tests.
    """
    U = get_user_model()
    u1 = U.objects.create_user(username="alice", email="a@example.com", password="pw")
    u2 = U.objects.create_user(username="bob",   email="b@example.com", password="pw")
    u3 = U.objects.create_user(username="carl",  email="c@example.com", password="pw")
    return u1, u2, u3


@pytest.fixture
def auth_user(users):
    # use first user as authenticated one
    return users[0]


def _friend_request_data(u1, u2, status_value="pending"):
    """
    Helper to build POST/PUT body for FriendRequest.
    Adjust keys if your serializer uses different names.
    """
    return {
        "user": u1.id,
        "friend": u2.id,
        "status": status_value,
    }


def test_get_friend_requests(rf, users, auth_user):
    u1, u2, _ = users
    # create some FriendRequest rows
    FriendRequest.objects.create(user=u1, friend=u2, status="pending")

    request = rf.get("/friend-request/")
    # AllowAny, but authenticating doesn't hurt
    force_authenticate(request, user=auth_user)

    response = get_friend_requests(request)

    assert response.status_code == status.HTTP_200_OK
    assert len(response.data) == 1


def test_get_user_friend_request_filters_pending_only(rf, users, auth_user):
    u1, u2, _ = users
    # friend_id field points to the "friend" FK
    FriendRequest.objects.create(user=u1, friend=u2, status="pending")
    FriendRequest.objects.create(user=u1, friend=u2, status="approved")

    request = rf.get(f"/friend-request/user/{u2.id}/")
    force_authenticate(request, user=auth_user)  # AllowAny, but fine

    response = get_user_friend_request(request, friend_id=u2.id)

    assert response.status_code == status.HTTP_200_OK
    # only the "pending" ones should be returned
    assert len(response.data) == 1
    assert response.data[0]["status"] == "pending"


def test_create_friend_request_success(rf, users, auth_user):
    u1, u2, _ = users
    body = _friend_request_data(u1, u2, "pending")

    request = rf.post("/friend-request/", body, format="json")
    force_authenticate(request, user=auth_user)

    response = create_friend_request(request)

    assert response.status_code == status.HTTP_201_CREATED
    assert FriendRequest.objects.count() == 1
    fr = FriendRequest.objects.first()
    assert fr.user_id == u1.id
    assert fr.friend_id == u2.id
    assert fr.status == "pending"


def test_create_friend_request_self_friend_rejected(rf, users, auth_user):
    u1, _, _ = users
    # user == friend should be 400
    body = _friend_request_data(u1, u1, "pending")

    request = rf.post("/friend-request/", body, format="json")
    force_authenticate(request, user=auth_user)

    response = create_friend_request(request)

    assert response.status_code == status.HTTP_400_BAD_REQUEST


def test_create_friend_request_friend_not_found(rf, users, auth_user):
    u1, _, _ = users
    # friend id that doesn't exist
    body = {"user": u1.id, "friend": 999999, "status": "pending"}

    request = rf.post("/friend-request/", body, format="json")
    force_authenticate(request, user=auth_user)

    response = create_friend_request(request)

    assert response.status_code == status.HTTP_404_NOT_FOUND


def test_update_friend_request(rf, users, auth_user):
    u1, u2, u3 = users
    fr = FriendRequest.objects.create(user=u1, friend=u2, status="pending")

    # Update friend to u3, keep status the same
    body = _friend_request_data(u1, u3, "pending")

    request = rf.put(f"/friend-request/{fr.pk}/", body, format="json")
    force_authenticate(request, user=auth_user)

    response = update_friend_request(request, pk=fr.pk)

    assert response.status_code == status.HTTP_200_OK
    fr.refresh_from_db()
    assert fr.friend_id == u3.id
    assert fr.status == "pending"


def test_update_status_friend_request_approved_creates_friend(rf, users, auth_user):
    u1, u2, _ = users
    fr = FriendRequest.objects.create(user=u1, friend=u2, status="pending")

    request = rf.patch(f"/friend-request/{fr.pk}/approved/", {}, format="json")
    force_authenticate(request, user=auth_user)

    response = update_status_friend_request(request, pk=fr.pk, f_status="approved")

    assert response.status_code == status.HTTP_200_OK
    fr.refresh_from_db()
    assert fr.status == "approved"
    # when approved, a Friend row should be created
    assert Friend.objects.filter(user=u1, friend=u2).exists()


def test_update_status_friend_request_not_found(rf, auth_user):
    request = rf.patch("/friend-request/9999/approved/", {}, format="json")
    force_authenticate(request, user=auth_user)

    response = update_status_friend_request(request, pk=9999, f_status="approved")

    assert response.status_code == status.HTTP_404_NOT_FOUND


def test_delete_friend_request(rf, users, auth_user):
    u1, u2, _ = users
    fr = FriendRequest.objects.create(user=u1, friend=u2, status="pending")

    request = rf.delete(f"/friend-request/{fr.pk}/")
    force_authenticate(request, user=auth_user)

    response = delete_friend_request(request, pk=fr.pk)

    assert response.status_code == status.HTTP_204_NO_CONTENT
    assert FriendRequest.objects.count() == 0
