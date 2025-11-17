import pytest
from django.contrib.auth import get_user_model
from rest_framework.test import APIRequestFactory, force_authenticate
from rest_framework import status

from group.models import Group
from friend.models import Friend
from group_member.models import GroupMember
from group_request.models import GroupRequest  # adjust app name if needed

from group_request.views import (
    get_group_request,
    get_invitation_by_user_id,
    create_group_request,
    update_status_group_request,
    update_group_request,
    delete_group_request,
)


@pytest.fixture
def rf():
    return APIRequestFactory()


@pytest.fixture
def users(db):
    U = get_user_model()
    owner = U.objects.create_user(username="owner", email="o@example.com", password="pw")
    u2 = U.objects.create_user(username="user2", email="u2@example.com", password="pw")
    u3 = U.objects.create_user(username="user3", email="u3@example.com", password="pw")
    return owner, u2, u3


@pytest.fixture
def group(db, users):
    owner, _, _ = users
    # adjust name/fields if your Group model is different
    return Group.objects.create(owner=owner, group_name="Test Group")


def test_get_group_request(rf, users, group):
    owner, invited, _ = users
    # seed one GroupRequest
    GroupRequest.objects.create(group=group, invited_user=invited, status="pending")

    request = rf.get("/group-request/")
    force_authenticate(request, user=owner)

    response = get_group_request(request)

    assert response.status_code == status.HTTP_200_OK
    assert len(response.data) == 1


def test_get_invitation_by_user_id_returns_pending_only(rf, users, group):
    owner, invited, _ = users
    GroupRequest.objects.create(group=group, invited_user=invited, status="pending")
    GroupRequest.objects.create(group=group, invited_user=invited, status="approved")

    request = rf.get(f"/group-request/invited/{invited.id}/")
    force_authenticate(request, user=owner)

    response = get_invitation_by_user_id(request, invited_id=invited.id)

    assert response.status_code == status.HTTP_200_OK
    assert len(response.data) == 1
    assert response.data[0]["status"] == "pending"


def test_create_group_request_success_when_friend(rf, users, group):
    owner, invited, _ = users

    # make them friends (one direction is enough for this code)
    Friend.objects.create(user=owner, friend=invited)

    body = {
        "group": group.id,
        "invited_user": invited.id,
        "status": "pending",
    }

    request = rf.post("/group-request/", body, format="json")
    force_authenticate(request, user=owner)

    response = create_group_request(request)

    assert response.status_code == status.HTTP_201_CREATED
    assert GroupRequest.objects.count() == 1
    gr = GroupRequest.objects.first()
    assert gr.group_id == group.id
    assert gr.invited_user_id == invited.id
    assert gr.status == "pending"


def test_create_group_request_self_invite_blocked(rf, users, group):
    owner, _, _ = users

    body = {
        "group": group.id,
        "invited_user": owner.id,   # same as owner
        "status": "pending",
    }

    request = rf.post("/group-request/", body, format="json")
    force_authenticate(request, user=owner)

    response = create_group_request(request)

    assert response.status_code == status.HTTP_400_BAD_REQUEST
    assert "Cannot self invite" in str(response.data)


def test_create_group_request_duplicate_blocked(rf, users, group):
    owner, invited, _ = users
    Friend.objects.create(user=owner, friend=invited)

    GroupRequest.objects.create(group=group, invited_user=invited, status="pending")

    body = {
        "group": group.id,
        "invited_user": invited.id,
        "status": "pending",
    }

    request = rf.post("/group-request/", body, format="json")
    force_authenticate(request, user=owner)

    response = create_group_request(request)

    assert response.status_code == status.HTTP_400_BAD_REQUEST
    assert "already invite" in str(response.data)


def test_update_status_group_request_approved_creates_group_member(rf, users, group):
    owner, invited, _ = users
    gr = GroupRequest.objects.create(group=group, invited_user=invited, status="pending")

    request = rf.patch(f"/group-request/{gr.id}/approved/", {}, format="json")
    force_authenticate(request, user=owner)

    response = update_status_group_request(request, pk=gr.id, g_status="approved")

    assert response.status_code == status.HTTP_200_OK
    gr.refresh_from_db()
    assert gr.status == "approved"
    assert GroupMember.objects.filter(group=group, member=invited).exists()


def test_update_status_group_request_not_found_if_not_pending(rf, users, group):
    owner, invited, _ = users
    gr = GroupRequest.objects.create(group=group, invited_user=invited, status="approved")

    request = rf.patch(f"/group-request/{gr.id}/approved/", {}, format="json")
    force_authenticate(request, user=owner)

    response = update_status_group_request(request, pk=gr.id, g_status="approved")

    assert response.status_code == status.HTTP_404_NOT_FOUND
    assert "not found" in str(response.data).lower()


def test_update_group_request_put(rf, users, group):
    owner, invited, _ = users
    gr = GroupRequest.objects.create(group=group, invited_user=invited, status="pending")

    body = {
        "group": group.id,
        "invited_user": invited.id,
        "status": "approved",  # changing via PUT
    }

    request = rf.put(f"/group-request/{gr.id}/", body, format="json")
    force_authenticate(request, user=owner)

    response = update_group_request(request, pk=gr.id)

    assert response.status_code == status.HTTP_200_OK
    gr.refresh_from_db()
    assert gr.status == "approved"


def test_delete_group_request(rf, users, group):
    owner, invited, _ = users
    gr = GroupRequest.objects.create(group=group, invited_user=invited, status="pending")

    request = rf.delete(f"/group-request/{gr.id}/")
    force_authenticate(request, user=owner)

    response = delete_group_request(request, pk=gr.id)

    assert response.status_code == status.HTTP_204_NO_CONTENT
    assert GroupRequest.objects.count() == 0
