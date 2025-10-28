from django.test import TestCase

# Create your tests here.
# tests/test_friend_request_views.py
import pytest
from django.contrib.auth import get_user_model
from rest_framework.test import APIRequestFactory, force_authenticate
from rest_framework import status

from friend_request.views import (  # adjust if your module path differs
    get_friend_requests,
    get_user_friend_request,
    create_friend_request,
    update_friend_request,
    update_status_friend_request,
    delete_friend_request,
)
from friend_request.models import FriendRequest  # adjust app label if needed


@pytest.fixture
def rf():
    return APIRequestFactory()


@pytest.fixture
def users(db):
    U = get_user_model()
    u1 = U.objects.create_user(username="alice", email="a@example.com", password="pw")
    u2 = U.objects.create_user(username="bob",   email="b@example.com", password="pw")
    u3 = U.objects.create_user(username="carl",  email="c@example.com", password="pw")
    return u1, u2, u3


@pytest.fixture
def fr_pending(db, users):
    u1, u2, _ = users
    return FriendRequest.objects.create(user_id=u1, friend_id=u2, status="pending")


@pytest.fixture
def fr_nonpending(db, users):
    u1, _, u3 = users
    return FriendRequest.objects.create(user_id=u1, friend_id=u3, status="approved")


@pytest.mark.django_db
def test_get_friend_requests_returns_list(rf, fr_pending, fr_nonpending):
    req = rf.get("/api/friend_requests/")
    resp = get_friend_requests(req)
    assert resp.status_code == status.HTTP_200_OK
    # Your view returns serialized list of *all* FriendRequest rows
    assert isinstance(resp.data, list)
    assert len(resp.data) == 2


@pytest.mark.django_db
def test_get_user_friend_request_filters_pending_by_friend_id(rf, fr_pending, fr_nonpending):
    # Only pending + matching friend_id should appear
    req = rf.get("/api/friend_requests/user/")
    resp = get_user_friend_request(req, friend_id=fr_pending.friend_id_id)
    assert resp.status_code == status.HTTP_200_OK
    assert len(resp.data) == 1
    assert resp.data[0]["id"] == fr_pending.id


@pytest.mark.django_db
def test_create_friend_request_requires_auth(rf):
    req = rf.post("/api/friend_requests/", data={}, format="json")
    resp = create_friend_request(req)
    # Unauthenticated must be rejected (401 on most setups; sometimes 403)
    assert resp.status_code in (status.HTTP_401_UNAUTHORIZED, status.HTTP_403_FORBIDDEN)


@pytest.mark.django_db
def test_update_friend_request_requires_auth(rf, fr_pending):
    req = rf.put(f"/api/friend_requests/{fr_pending.id}/", data={}, format="json")
    resp = update_friend_request(req, pk=fr_pending.id)
    assert resp.status_code in (status.HTTP_401_UNAUTHORIZED, status.HTTP_403_FORBIDDEN)


@pytest.mark.django_db
def test_update_status_friend_request_404_when_missing(rf, users):
    # Authenticated, but pk doesn't exist -> your view returns 404
    (u1, _, _) = users
    req = rf.patch("/api/friend_requests/99999/status/approved/", data={}, format="json")
    force_authenticate(req, user=u1)
    resp = update_status_friend_request(req, pk=99999, f_status="approved")
    assert resp.status_code == status.HTTP_404_NOT_FOUND


@pytest.mark.django_db
def test_delete_friend_request_works_authenticated(rf, users, fr_pending):
    (u1, _, _) = users
    req = rf.delete(f"/api/friend_requests/{fr_pending.id}/")
    force_authenticate(req, user=u1)
    resp = delete_friend_request(req, pk=fr_pending.id)
    assert resp.status_code == status.HTTP_204_NO_CONTENT
    assert not FriendRequest.objects.filter(pk=fr_pending.id).exists()
