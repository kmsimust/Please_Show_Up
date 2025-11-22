// src/pages/edit_group.tsx
import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { get_group_info_by_pk } from "~/services/group";
import { getUser } from "~/utils/auth-me";
import "../../components/styles/common.css";
import Cookies from "js-cookie";

import Sidebar from "../../components/sidebar";
import { AuthNavBar } from "../../components/auth_navbar";

const BACKEND_URL = "http://localhost:8000";

export function EditGroup() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const group_id = Number(searchParams.get("group_id"));
    const user = getUser();

    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
    const [groupInfo, setGroupInfo] = useState<any | null>(null);
    const [groupName, setGroupName] = useState<string>("");
    const [bannerFile, setBannerFile] = useState<File | null>(null);
    const [bannerPreview, setBannerPreview] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [nameStatus, setNameStatus] = useState<
        "" | "saving" | "success" | "failed"
    >("");
    const [bannerStatus, setBannerStatus] = useState<
        "" | "uploading" | "success" | "failed"
    >("");

    useEffect(() => {
        if (!group_id) return;
        loadGroup();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [group_id]);

    async function loadGroup() {
        setLoading(true);
        const { result, error } = await get_group_info_by_pk(group_id);
        if (error) {
            // Convert error object to string if needed
            const errorMsg =
                typeof error === "object" ? JSON.stringify(error) : error;
            setError(errorMsg);
            setLoading(false);
            return;
        }
        setGroupInfo(result);
        setGroupName(result?.group_name || "");

        // Set banner preview if exists (match EditProfilePicture pattern)
        if (result?.banner_image && result.banner_image !== "default") {
            setBannerPreview(BACKEND_URL + "/public" + result.banner_image);
        } else {
            setBannerPreview(null);
        }
        setLoading(false);
    }

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate file type
        const allowedTypes = [
            "image/jpeg",
            "image/png",
            "image/gif",
            "image/webp",
        ];
        if (!allowedTypes.includes(file.type)) {
            alert("Invalid file type. Use JPG, PNG, GIF, or WEBP.");
            return;
        }

        // Validate file size (1.5MB max)
        if (file.size > 1.5 * 1024 * 1024) {
            alert("File too large. Maximum size is 1.5MB.");
            return;
        }

        setBannerFile(file);
        setError(null);

        // Create preview
        const url = URL.createObjectURL(file);
        setBannerPreview(url);
    }

    async function handleSaveInfo(e: React.FormEvent) {
        e.preventDefault();
        if (!group_id) return;

        setNameStatus("saving");
        try {
            const token = Cookies.get("accessToken");
            const body = { group_name: groupName };

            const response = await fetch(
                `${BACKEND_URL}/api/update_group_info/${group_id}`,
                {
                    method: "PATCH",
                    headers: {
                        Authorization: "Bearer " + token,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(body),
                },
            );

            if (!response.ok) {
                throw new Error("Failed to update group info");
            }

            setNameStatus("success");
            setError(null);
            // Reload the full group info to ensure we have complete data
            await loadGroup();
        } catch (err: any) {
            console.error(err);
            setError(err.message || "Failed to update group info");
            setNameStatus("failed");
        }
    }

    async function handleUploadBanner(e: React.FormEvent) {
        e.preventDefault();
        if (!group_id || !bannerFile) {
            alert("Please select a banner file first");
            return;
        }

        setBannerStatus("uploading");
        try {
            const token = Cookies.get("accessToken");
            const fd = new FormData();
            fd.append("banner_image", bannerFile);

            const response = await fetch(
                `${BACKEND_URL}/api/update_group_banner/${group_id}`,
                {
                    method: "PATCH",
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                    body: fd,
                },
            );

            if (!response.ok) {
                throw new Error("Failed to upload banner");
            }

            setBannerStatus("success");
            setBannerFile(null);
            setError(null);
            // Reload group to get updated banner path
            await loadGroup();
        } catch (err: any) {
            console.error(err);
            setError(err.message || "Failed to upload banner");
            setBannerStatus("failed");
        }
    }

    async function handleDeleteGroup() {
        if (!group_id) return;
        setLoading(true);
        try {
            const token = Cookies.get("accessToken");

            const response = await fetch(
                `${BACKEND_URL}/api/delete_group/${group_id}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                },
            );

            if (!response.ok) {
                throw new Error("Failed to delete group");
            }

            alert("Group deleted successfully");
            navigate("/group");
        } catch (err: any) {
            console.error(err);
            setError(err.message || "Failed to delete group");
            alert("Failed to delete group");
            setLoading(false);
        }
    }

    // Cleanup preview URL when component unmounts
    useEffect(() => {
        return () => {
            if (bannerPreview && bannerPreview.startsWith("blob:")) {
                URL.revokeObjectURL(bannerPreview);
            }
        };
    }, [bannerPreview]);

    if (!group_id) return <div>Invalid request (missing group_id)</div>;

    // Show loading while fetching initial data
    if (loading && !groupInfo) return <div>Loading...</div>;

    // Owner-only guard
    if (groupInfo && user && groupInfo.owner?.id !== user.id) {
        return (
            <div style={{ padding: "2rem" }}>
                You are not allowed to edit this group (only owner can).
            </div>
        );
    }

    return (
        <div>
            <AuthNavBar
                onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
            />
            <div className="tw:flex">
                <Sidebar
                    isOpen={isSidebarOpen}
                    onClose={() => setIsSidebarOpen(false)}
                />
                <div className="tw:grow">
                    <div style={{ padding: "2rem" }}>
                        <h2>Edit Group</h2>

                        {error && (
                            <div className="alert alert-danger" role="alert">
                                {error}
                            </div>
                        )}

                        <div style={{ maxWidth: 900, marginTop: 20 }}>
                            {/* Group Name Section */}
                            <div className="settings-section">
                                <h3 className="section-title">Group Name</h3>
                                <form onSubmit={handleSaveInfo}>
                                    <input
                                        className="form-control"
                                        value={groupName}
                                        onChange={(e) =>
                                            setGroupName(e.target.value)
                                        }
                                        maxLength={20}
                                        placeholder="Enter group name"
                                    />
                                    <div style={{ marginTop: 10 }}>
                                        <button
                                            type="submit"
                                            className="btn btn-primary"
                                            disabled={
                                                nameStatus === "saving" ||
                                                !groupName
                                            }
                                        >
                                            {nameStatus === "saving"
                                                ? "Saving..."
                                                : "Save name"}
                                        </button>
                                        {nameStatus === "success" && (
                                            <span className="text-success ms-3">
                                                Saved successfully!
                                            </span>
                                        )}
                                        {nameStatus === "failed" && (
                                            <span className="text-danger ms-3">
                                                Failed to save
                                            </span>
                                        )}
                                    </div>
                                </form>
                            </div>

                            <hr />

                            {/* Banner Section */}
                            <div className="settings-section">
                                <h3 className="section-title">Banner</h3>
                                <p className="section-description">
                                    Max size: 1.5MB | Formats: JPG, PNG, GIF,
                                    WEBP | Recommended: 1500×430
                                </p>

                                <form onSubmit={handleUploadBanner}>
                                    <div
                                        className="upload-area"
                                        style={{ marginBottom: 16 }}
                                    >
                                        <input
                                            type="file"
                                            id="banner-upload"
                                            accept="image/*"
                                            onChange={handleFileChange}
                                            hidden
                                        />
                                        <label
                                            htmlFor="banner-upload"
                                            className="upload-label"
                                            style={{
                                                display: "block",
                                                padding: "2rem",
                                                border: "2px dashed #ccc",
                                                borderRadius: "8px",
                                                textAlign: "center",
                                                cursor: "pointer",
                                                backgroundColor: "#f8f9fa",
                                            }}
                                        >
                                            <div className="upload-content">
                                                <p
                                                    className="upload-title"
                                                    style={{
                                                        margin: 0,
                                                        fontWeight: "bold",
                                                    }}
                                                >
                                                    Upload Banner
                                                </p>
                                                <p
                                                    className="upload-subtitle"
                                                    style={{
                                                        margin: "8px 0 0",
                                                        color: "#6c757d",
                                                    }}
                                                >
                                                    Click to select or drag &
                                                    drop
                                                </p>
                                            </div>
                                        </label>

                                        {bannerPreview && (
                                            <div style={{ marginTop: 12 }}>
                                                <p style={{ marginBottom: 8 }}>
                                                    Preview:
                                                </p>
                                                <img
                                                    src={bannerPreview}
                                                    alt="banner preview"
                                                    style={{
                                                        width: "100%",
                                                        maxHeight: 300,
                                                        objectFit: "cover",
                                                        borderRadius: 8,
                                                    }}
                                                />
                                            </div>
                                        )}
                                    </div>

                                    <div style={{ marginTop: 10 }}>
                                        <button
                                            type="submit"
                                            className="btn btn-primary me-2"
                                            disabled={
                                                bannerStatus === "uploading" ||
                                                !bannerFile
                                            }
                                        >
                                            {bannerStatus === "uploading"
                                                ? "Uploading..."
                                                : "Upload banner"}
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-secondary"
                                            onClick={() => {
                                                setBannerFile(null);
                                                // Reset to original banner (match EditProfilePicture pattern)
                                                if (
                                                    groupInfo?.banner_image &&
                                                    groupInfo.banner_image !==
                                                        "default"
                                                ) {
                                                    setBannerPreview(
                                                        BACKEND_URL +
                                                            "/public" +
                                                            groupInfo.banner_image,
                                                    );
                                                } else {
                                                    setBannerPreview(null);
                                                }
                                            }}
                                        >
                                            Cancel selection
                                        </button>
                                        {bannerStatus === "success" && (
                                            <span className="text-success ms-3">
                                                Uploaded successfully!
                                            </span>
                                        )}
                                        {bannerStatus === "failed" && (
                                            <span className="text-danger ms-3">
                                                Failed to upload
                                            </span>
                                        )}
                                    </div>
                                </form>
                            </div>

                            <hr />

                            {/* Delete Section */}
                            <div style={{ marginTop: 20 }}>
                                <h3 className="section-title">Danger Zone</h3>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => setShowDeleteModal(true)}
                                    disabled={loading}
                                >
                                    Delete Group
                                </button>
                            </div>

                            {/* Delete confirmation modal */}
                            <Modal
                                show={showDeleteModal}
                                onHide={() => setShowDeleteModal(false)}
                            >
                                <Modal.Header closeButton>
                                    <Modal.Title>Confirm Delete</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    Are you sure you want to permanently delete
                                    the group{" "}
                                    <strong>{groupInfo?.group_name}</strong>?
                                    This action cannot be undone.
                                </Modal.Body>
                                <Modal.Footer>
                                    <button
                                        className="btn btn-secondary"
                                        onClick={() =>
                                            setShowDeleteModal(false)
                                        }
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className="btn btn-danger"
                                        onClick={handleDeleteGroup}
                                    >
                                        Yes, delete
                                    </button>
                                </Modal.Footer>
                            </Modal>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditGroup;
