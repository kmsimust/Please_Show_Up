import React, { useEffect, useState, useMemo } from "react";
import {
    get_user_data,
    update_user_profile,
    update_user_banner,
} from "~/services/user";

const AVATAR_MAX = 0.6 * 1024 * 1024;
const HEADER_MAX = 1.5 * 1024 * 1024;

type UploadStatus = "" | "uploading" | "success" | "failed";

export default function EditProfilePicture() {
    const domain_link = "http://localhost:8000/"; // matches your ProfilePage
    const [userData, setUserData] = useState<any | null>(null);

    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [headerFile, setHeaderFile] = useState<File | null>(null);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
    const [headerPreview, setHeaderPreview] = useState<string | null>(null);

    const [avatarStatus, setAvatarStatus] = useState<UploadStatus>("");
    const [bannerStatus, setBannerStatus] = useState<UploadStatus>("");

    const ALLOWED_TYPES = useMemo(
        () => [
            "image/jpeg",
            "image/png",
            "image/gif",
            "image/webp",
            "video/webm",
        ],
        [],
    );

    // load user on mount (so we have id + existing image paths)
    useEffect(() => {
        let mounted = true;
        (async () => {
            const { result, error } = await get_user_data();
            if (!mounted) return;
            if (error) {
                console.error(
                    "Failed to load user in EditProfilePicture:",
                    error,
                );
            } else {
                setUserData(result);
                // set existing previews (match ProfilePage logic)
                if (
                    result?.profile_image &&
                    result.profile_image !== "default"
                ) {
                    // ProfilePage used domain_link + "public/" + userdata.profile_image
                    setAvatarPreview(
                        domain_link + "public/" + result.profile_image,
                    );
                }
                if (result?.banner && result.banner !== "default") {
                    setHeaderPreview(domain_link + "public/" + result.banner);
                }
            }
        })();
        return () => {
            mounted = false;
        };
    }, []);

    // preview from selected files (object URLs)
    useEffect(() => {
        if (!avatarFile) return;
        const url = URL.createObjectURL(avatarFile);
        setAvatarPreview(url);
        return () => URL.revokeObjectURL(url);
    }, [avatarFile]);

    useEffect(() => {
        if (!headerFile) return;
        const url = URL.createObjectURL(headerFile);
        setHeaderPreview(url);
        return () => URL.revokeObjectURL(url);
    }, [headerFile]);

    const validateFile = (file: File, maxBytes: number) => {
        if (!ALLOWED_TYPES.includes(file.type)) {
            alert("Invalid file type.");
            return false;
        }
        if (file.size > maxBytes) {
            alert("File too large.");
            return false;
        }
        return true;
    };

    const onAvatarChoose = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null;
        if (file && validateFile(file, AVATAR_MAX)) setAvatarFile(file);
    };

    const onHeaderChoose = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null;
        if (file && validateFile(file, HEADER_MAX)) setHeaderFile(file);
    };

    // helpers to build preview URL from server-returned path (handles different shapes)
    const buildPreviewFromServerPath = (path: string) => {
        if (!path) return null;
        // if server returns an absolute URL:
        if (path.startsWith("http")) return path;
        // if path looks like "/upload/..." or "/upload/user/..." or "upload/..." -> prefix domain_link (no "public/")
        if (path.startsWith("/")) return domain_link.replace(/\/$/, "") + path;
        // legacy: your ProfilePage used domain_link + "public/" + userdata.profile_image
        return domain_link + "public/" + path;
    };

    const submitAvatar = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!avatarFile) return;
        if (!userData?.id) {
            console.error("No user id available for avatar upload.");
            setAvatarStatus("failed");
            return;
        }
        setAvatarStatus("uploading");
        try {
            const resp = await update_user_profile(userData.id, avatarFile);
            console.log("update_user_profile resp:", resp);
            if (resp.error) {
                console.error("Server returned error:", resp.error);
                setAvatarStatus("failed");
            } else {
                setAvatarStatus("success");
                const data: any = resp.result;
                // server might return serializer.data with profile_image field
                if (
                    data &&
                    (data.profile_image ||
                        data.profile_image_url ||
                        data.profile)
                ) {
                    // try common keys
                    const serverPath =
                        data.profile_image ??
                        data.profile_image_url ??
                        data.profile;
                    const preview = buildPreviewFromServerPath(serverPath);
                    if (preview) {
                        setAvatarPreview(preview);
                    }
                }
                // clear selected file after success
                setAvatarFile(null);
                // optionally refresh userData
                const refreshed = await get_user_data();
                if (!refreshed.error) setUserData(refreshed.result);
            }
        } catch (err) {
            console.error("Upload avatar failed:", err);
            setAvatarStatus("failed");
        }
    };

    const submitBanner = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!headerFile) return;
        if (!userData?.id) {
            console.error("No user id available for banner upload.");
            setBannerStatus("failed");
            return;
        }
        setBannerStatus("uploading");
        try {
            const resp = await update_user_banner(userData.id, headerFile);
            console.log("update_user_banner resp:", resp);
            if (resp.error) {
                console.error("Server returned error:", resp.error);
                setBannerStatus("failed");
            } else {
                setBannerStatus("success");
                const data: any = resp.result;
                if (
                    data &&
                    (data.banner || data.banner_url || data.banner_image)
                ) {
                    const serverPath =
                        data.banner ?? data.banner_url ?? data.banner_image;
                    const preview = buildPreviewFromServerPath(serverPath);
                    if (preview) setHeaderPreview(preview);
                }
                setHeaderFile(null);
                const refreshed = await get_user_data();
                if (!refreshed.error) setUserData(refreshed.result);
            }
        } catch (err) {
            console.error("Upload banner failed:", err);
            setBannerStatus("failed");
        }
    };

    return (
        <>
            <h1 className="settings-title">Profile picture settings</h1>

            <div className="settings-section">
                <h2 className="section-title">Avatar</h2>
                <p className="section-description">
                    File Size: &lt; 0.6MB, File Formats: | .jpg | .png | .gif |
                    .webp | .webm |, Recommended resolution: 300×300
                </p>

                <form onSubmit={submitAvatar}>
                    <div className="upload-area">
                        <input
                            type="file"
                            id="avatar-upload-component"
                            accept=".jpg,.jpeg,.png,.gif,.webp,.webm"
                            onChange={onAvatarChoose}
                            hidden
                        />
                        <label
                            htmlFor="avatar-upload-component"
                            className="upload-label"
                        >
                            <div className="upload-content">
                                <p className="upload-title">Upload file(s)</p>
                                <p className="upload-subtitle">
                                    Drop file(s) here, or click to select.
                                </p>
                            </div>
                        </label>

                        {avatarPreview && (
                            <div style={{ marginTop: 12 }}>
                                <div>Preview:</div>
                                <img
                                    src={avatarPreview}
                                    alt="avatar preview"
                                    style={{
                                        width: 120,
                                        height: 120,
                                        objectFit: "cover",
                                        borderRadius: 8,
                                    }}
                                />
                            </div>
                        )}
                    </div>

                    <div style={{ marginTop: 12 }}>
                        <button
                            type="submit"
                            className="submit-btn"
                            disabled={
                                !avatarFile || avatarStatus === "uploading"
                            }
                        >
                            {avatarStatus === "uploading"
                                ? "Uploading..."
                                : "Submit"}
                        </button>
                        {avatarStatus === "success" && (
                            <div className="text-success mt-3">
                                Upload success
                            </div>
                        )}
                        {avatarStatus === "failed" && (
                            <div className="text-danger mt-3">
                                Upload failed
                            </div>
                        )}
                    </div>
                </form>
            </div>

            <div className="settings-section" style={{ marginTop: 24 }}>
                <h2 className="section-title">Banner</h2>
                <p className="section-description">
                    File Size: &lt; 1.5MB, File Formats: | .jpg | .png | .gif |
                    .webp | .webm |, Recommended resolution: 1500×430
                </p>

                <form onSubmit={submitBanner}>
                    <div className="upload-area">
                        <input
                            type="file"
                            id="banner-upload-component"
                            accept=".jpg,.jpeg,.png,.gif,.webp,.webm"
                            onChange={onHeaderChoose}
                            hidden
                        />
                        <label
                            htmlFor="banner-upload-component"
                            className="upload-label"
                        >
                            <div className="upload-content">
                                <p className="upload-title">Upload file(s)</p>
                                <p className="upload-subtitle">
                                    Drop file(s) here, or click to select.
                                </p>
                            </div>
                        </label>

                        {headerPreview && (
                            <div style={{ marginTop: 12 }}>
                                <div>Preview:</div>
                                <img
                                    src={headerPreview}
                                    alt="banner preview"
                                    style={{
                                        width: "100%",
                                        maxWidth: 600,
                                        height: 160,
                                        objectFit: "cover",
                                        borderRadius: 8,
                                    }}
                                />
                            </div>
                        )}
                    </div>

                    <div style={{ marginTop: 12 }}>
                        <button
                            type="submit"
                            className="submit-btn"
                            disabled={
                                !headerFile || bannerStatus === "uploading"
                            }
                        >
                            {bannerStatus === "uploading"
                                ? "Uploading..."
                                : "Submit"}
                        </button>
                        {bannerStatus === "success" && (
                            <div className="text-success mt-3">
                                Upload success
                            </div>
                        )}
                        {bannerStatus === "failed" && (
                            <div className="text-danger mt-3">
                                Upload failed
                            </div>
                        )}
                    </div>
                </form>
            </div>
        </>
    );
}
