import pytest
from django.contrib.auth import get_user_model
from django.core.files.uploadedfile import SimpleUploadedFile
from rest_framework.test import APIRequestFactory, force_authenticate
from rest_framework import status

from group.models import Group
from group.views import (
    get_group,
    get_group_by_user_id,
    get_group_info_by_pk,
    create_group,
    update_group_info,
    update_group_banner,
    delete_group,
)


@pytest.fixture
def rf():
    return APIRequestFactory()


@pytest.fixture
def user(db):
    U = get_user_model()
    return U.objects.create_user(username="owner", email="o@example.com", password="pw")


@pytest.fixture
def group_obj(db, user):
    """
    One existing group for tests that need it.
    ⚠️ Adjust fields (e.g. group_name) if your model uses different ones.
    """
    return Group.objects.create(
        owner=user,
        group_name="Test Group",
        banner_image="/upload/group/dummy/dummy.png",
    )


def test_get_group(rf, user, group_obj):
    request = rf.get("/group/")
    force_authenticate(request, user=user)

    response = get_group(request)

    assert response.status_code == status.HTTP_200_OK
    assert len(response.data) >= 1


def test_get_group_by_user_id(rf, user, group_obj):
    request = rf.get(f"/group/user/{user.id}/")
    force_authenticate(request, user=user)

    response = get_group_by_user_id(request, user_id=user.id)

    assert response.status_code == status.HTTP_200_OK
    # this owner should see at least one group (the fixture)
    assert len(response.data) >= 1
    # optionally check owner field if it's serialized
    # assert response.data[0]["owner"] == user.id


def test_get_group_info_by_pk(rf, user, group_obj):
    request = rf.get(f"/group/{group_obj.pk}/")
    force_authenticate(request, user=user)

    response = get_group_info_by_pk(request, pk=group_obj.pk)

    assert response.status_code == status.HTTP_200_OK
    assert response.data["id"] == group_obj.id


def test_create_group(rf, user, monkeypatch):
    """
    Test create_group with file upload.
    We mock upload_file so no real filesystem work is done.
    """
    # ⚠️ Adjust keys (group_name, description, etc.) to match your serializer
    data = {
        "owner": user.id,
        "group_name": "New Group",
        "description": "some description",
    }

    file_obj = SimpleUploadedFile(
        "banner.png", b"fake-image-bytes", content_type="image/png"
    )

    # Mock util.upload.upload_file that view imports as upload_file
    def fake_upload_file(serializer, uploaded_file, kind):
        # serializer.instance should be the saved Group
        assert kind == "group"
        return serializer.instance.id, "banner.png"

    monkeypatch.setattr("group.views.upload_file", fake_upload_file)

    request = rf.post("/group/", {**data, "banner_image": file_obj}, format="multipart")
    force_authenticate(request, user=user)

    response = create_group(request)

    assert response.status_code == status.HTTP_201_CREATED
    assert Group.objects.count() == 1
    g = Group.objects.first()
    # final banner_image should be path set in view
    assert g.banner_image.endswith("/upload/group/{}/banner.png".format(g.id))


def test_update_group_info(rf, user, group_obj):
    """
    Partial update some basic info.
    """
    # ⚠️ adjust "group_name" or other fields to match your serializer
    body = {"group_name": "Updated Name"}

    request = rf.patch(f"/group/{group_obj.pk}/", body, format="json")
    force_authenticate(request, user=user)

    response = update_group_info(request, pk=group_obj.pk)

    assert response.status_code == status.HTTP_200_OK
    group_obj.refresh_from_db()
    assert group_obj.group_name == "Updated Name"


def test_update_group_banner(rf, user, group_obj, monkeypatch):
    """
    Test updating only the banner image.
    """
    file_obj = SimpleUploadedFile(
        "new_banner.png", b"fake-image-bytes", content_type="image/png"
    )

    def fake_upload_file(serializer, uploaded_file, kind):
        # For this view, serializer is GroupSerializer (read-only)
        assert kind == "group"
        # return the current id and a fake uploaded name
        return group_obj.id, "new_banner.png"

    monkeypatch.setattr("group.views.upload_file", fake_upload_file)

    request = rf.patch(
        f"/group/{group_obj.pk}/",
        {"banner_image": file_obj},
        format="multipart",
    )
    force_authenticate(request, user=user)

    response = update_group_banner(request, pk=group_obj.pk)

    assert response.status_code == status.HTTP_200_OK
    group_obj.refresh_from_db()
    assert group_obj.banner_image.endswith(
        "/upload/group/{}/new_banner.png".format(group_obj.id)
    )


def test_delete_group(rf, user, group_obj):
    request = rf.delete(f"/group/{group_obj.pk}/")
    force_authenticate(request, user=user)

    response = delete_group(request, pk=group_obj.pk)

    assert response.status_code == status.HTTP_204_NO_CONTENT
    assert Group.objects.count() == 0
