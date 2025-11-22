// noti.tsx
import "./noti.css";
import Sidebar from "../../components/sidebar";
import { AuthNavBar } from "../../components/auth_navbar";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

interface UserObject {
    id: number;
    username: string;
    display_name: string;
    email?: string;
    profile_image?: string;
}

interface FriendRequest {
    id: number;
    user: UserObject; // sender (who made the request)
    friend: UserObject; // recipient (who receives the request)
    status: string; // "pending", "approved", "reject", etc.
}

interface AcceptedNotification {
    accepter_name: string;
    accepter_username: string;
    accepter_id: number;
}

interface GroupRequest {
    id: number;
    group: {
        id: number;
        owner:string,
        group_name: string;
        description?: string;
    };
    invited_user: UserObject;
    status: string;
    created_at?: string;
}

interface AcceptedGroupNotification {
    group_id: number;
    group_name: string;
    inviter_name: string;
    inviter_id: number;
}

export function Noti() {
    const domain_link = "http://localhost:8000/";
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [requests, setRequests] = useState<FriendRequest[]>([]);
    const [acceptedNotifications, setAcceptedNotifications] = useState<
        AcceptedNotification[]
    >([]);
    const [groupRequests, setGroupRequests] = useState<GroupRequest[]>([]);
    const [acceptedGroupNotifications, setAcceptedGroupNotifications] = useState<
        AcceptedGroupNotification[]
    >([]);
    const [myId, setMyId] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);

    const token = Cookies.get("accessToken");

    // localStorage key for dismissed accepted notifications
    const DISMISSED_ACCEPTED_KEY = "dismissedAcceptedFriendNotifications_v1";
    const [dismissedAcceptedIds, setDismissedAcceptedIds] = useState<number[]>(
        [],
    );

    const DISMISSED_ACCEPTED_GROUP_KEY = "dismissedAcceptedGroupNotifications_v1";
    const [dismissedAcceptedGroupIds, setDismissedAcceptedGroupIds] = useState<
        number[]
    >([]);

    // Load dismissed IDs from localStorage once
    useEffect(() => {
        try {
            const raw = localStorage.getItem(DISMISSED_ACCEPTED_KEY);
            if (raw) {
                const parsed = JSON.parse(raw);
                if (Array.isArray(parsed)) setDismissedAcceptedIds(parsed);
            }
        } catch (err) {
            console.warn(
                "Failed to parse dismissedAcceptedIds from localStorage",
                err,
            );
        }

        try {
            const raw = localStorage.getItem(DISMISSED_ACCEPTED_GROUP_KEY);
            if (raw) {
                const parsed = JSON.parse(raw);
                if (Array.isArray(parsed)) setDismissedAcceptedGroupIds(parsed);
            }
        } catch (err) {
            console.warn(
                "Failed to parse dismissedAcceptedGroupIds from localStorage",
                err,
            );
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Load my profile (to get myId)
    useEffect(() => {
        async function loadMe() {
            try {
                if (!token) {
                    console.warn("No token found when loading my profile");
                    return;
                }
                const res = await axios.get(domain_link + "api/user/me/", {
                    headers: { Authorization: "Bearer " + token },
                });
                setMyId(res.data.id);
            } catch (error) {
                console.error("Failed to load user:", error);
            }
        }
        loadMe();
    }, [token]);

    // Load pending friend requests and accepted friend notifications
    useEffect(() => {
        if (!myId) return;

        async function loadNotifications() {
            try {
                setLoading(true);

                // Incoming pending requests for me
                const res = await axios.get(
                    `${domain_link}api/get_user_friend_request/${myId}`,
                    { headers: { Authorization: "Bearer " + token } },
                );
                setRequests(res.data || []);

                // My sent requests (to detect accepted ones)
                const myRequestsRes = await axios.get(
                    `${domain_link}api/friend_request/`,
                    { headers: { Authorization: "Bearer " + token } },
                );

                const acceptedRequests = (myRequestsRes.data || []).filter(
                    (r: FriendRequest) =>
                        r.user?.id === myId && r.status === "approved",
                );

                const accepted = acceptedRequests
                    .map((r: FriendRequest) => ({
                        accepter_name: r.friend.display_name,
                        accepter_username: r.friend.username,
                        accepter_id: r.friend.id,
                    }))
                    .filter(
                        (a: AcceptedNotification) =>
                            !dismissedAcceptedIds.includes(a.accepter_id),
                    );

                setAcceptedNotifications(accepted);

                // === Group Requests ===
                // Incoming pending group invitations
                const groupInvitesRes = await axios.get(
                    `${domain_link}api/get_invitation_by_user_id/${myId}`,
                    { headers: { Authorization: "Bearer " + token } },
                );
                setGroupRequests(groupInvitesRes.data || []);

                // My sent group invitations (to detect accepted ones)
                const mySentGroupInvitesRes = await axios.get(
                    `${domain_link}api/group_request/`,
                    { headers: { Authorization: "Bearer " + token } },
                );

                const acceptedGroupInvites = (
                    mySentGroupInvitesRes.data || []
                ).filter(
                    (gr: GroupRequest) =>
                        gr.status === "approved",
                );

                const acceptedGroups = acceptedGroupInvites
                    .map((gr: GroupRequest) => ({
                        group_id: gr.group.id,
                        group_name: gr.group.group_name,
                        inviter_name: gr.invited_user.display_name,
                        inviter_id: gr.invited_user.id,
                    }))
                    .filter(
                        (ag: AcceptedGroupNotification) =>
                            !dismissedAcceptedGroupIds.includes(ag.group_id),
                    );

                setAcceptedGroupNotifications(acceptedGroups);
            } catch (error) {
                console.error("Failed to load notifications:", error);
            } finally {
                setLoading(false);
            }
        }

        loadNotifications();
    }, [myId, token, dismissedAcceptedIds, dismissedAcceptedGroupIds]);

    // Accept request
    const acceptRequest = async (id: number) => {
        if (!token) {
            alert("Not authenticated");
            return;
        }

        const prevRequests = [...requests];
        setRequests((prev) => prev.filter((r) => r.id !== id));

        try {
            // Keep using "approved" since backend and frontend expect that
            const response = await axios.patch(
                `${domain_link}api/update_status_friend_request/${id}/approved`,
                { status: "approved" },
                { headers: { Authorization: "Bearer " + token } },
            );

            console.log("Accept response:", response.data);
        } catch (err: any) {
            console.error("Failed to accept request:", {
                message: err.message,
                status: err.response?.status,
                data: err.response?.data,
            });

            setRequests((prev) => {
                const already = prev.some((r) => r.id === id);
                return already ? prev : prevRequests;
            });

            alert("Failed to accept friend request. See console for details.");
        }
    };

    // Decline request — use the backend's expected 'reject' choice
    const declineRequest = async (id: number) => {
        if (!token) {
            console.error("No token available for declineRequest");
            alert("Not authenticated");
            return;
        }

        const prevRequests = [...requests];
        setRequests((prev) => prev.filter((r) => r.id !== id));

        try {
            // Use /reject in the path and send { status: "reject" } in body
            const response = await axios.patch(
                `${domain_link}api/update_status_friend_request/${id}/reject`,
                { status: "reject" },
                { headers: { Authorization: "Bearer " + token } },
            );

            console.log("Decline response:", response.data);
        } catch (err: any) {
            console.error("Failed to decline request:", {
                message: err.message,
                status: err.response?.status,
                data: err.response?.data,
            });

            // rollback state - restore previous requests (avoid duplicates)
            setRequests((prev) => {
                const already = prev.some((r) => r.id === id);
                return already ? prev : prevRequests;
            });

            // Friendly message extracting server validation errors if present
            const serverError = err.response?.data;
            let friendly = "Failed to decline friend request.";
            if (serverError) {
                try {
                    if (typeof serverError === "object") {
                        const parts: string[] = [];
                        for (const k of Object.keys(serverError)) {
                            const val = serverError[k];
                            if (Array.isArray(val))
                                parts.push(`${k}: ${val.join(", ")}`);
                            else parts.push(`${k}: ${String(val)}`);
                        }
                        friendly += ` Server: ${parts.join(" | ")}`;
                    } else {
                        friendly += ` Server: ${String(serverError)}`;
                    }
                } catch (e) {
                    friendly += " (see console)";
                }
            }
            alert(friendly);
        }
    };

    // Dismiss accepted notification and persist to localStorage
    const dismissAccepted = (accepterId: number) => {
        try {
            const next = Array.from(
                new Set([...dismissedAcceptedIds, accepterId]),
            );
            setDismissedAcceptedIds(next);
            localStorage.setItem(DISMISSED_ACCEPTED_KEY, JSON.stringify(next));
            setAcceptedNotifications((prev) =>
                prev.filter((n) => n.accepter_id !== accepterId),
            );
        } catch (err) {
            console.error("Failed to persist dismissed accepted id:", err);
        }
    };

    // Accept group request
    const acceptGroupRequest = async (id: number) => {
        if (!token) {
            alert("Not authenticated");
            return;
        }

        const prevRequests = [...groupRequests];
        setGroupRequests((prev) => prev.filter((r) => r.id !== id));

        try {
            const response = await axios.patch(
                `${domain_link}api/update_status_group_request/${id}/approved`,
                { status: "approved" },
                { headers: { Authorization: "Bearer " + token } },
            );

            console.log("Accept group request response:", response.data);
        } catch (err: any) {
            console.error("Failed to accept group request:", {
                message: err.message,
                status: err.response?.status,
                data: err.response?.data,
            });

            setGroupRequests((prev) => {
                const already = prev.some((r) => r.id === id);
                return already ? prev : prevRequests;
            });

            alert("Failed to accept group request. See console for details.");
        }
    };

    // Decline group request
    const declineGroupRequest = async (id: number) => {
        if (!token) {
            console.error("No token available for declineGroupRequest");
            alert("Not authenticated");
            return;
        }

        const prevRequests = [...groupRequests];
        setGroupRequests((prev) => prev.filter((r) => r.id !== id));

        try {
            const response = await axios.patch(
                `${domain_link}api/update_status_group_request/${id}/reject`,
                { status: "reject" },
                { headers: { Authorization: "Bearer " + token } },
            );

            console.log("Decline group request response:", response.data);
        } catch (err: any) {
            console.error("Failed to decline group request:", {
                message: err.message,
                status: err.response?.status,
                data: err.response?.data,
            });

            setGroupRequests((prev) => {
                const already = prev.some((r) => r.id === id);
                return already ? prev : prevRequests;
            });

            const serverError = err.response?.data;
            let friendly = "Failed to decline group request.";
            if (serverError) {
                try {
                    if (typeof serverError === "object") {
                        const parts: string[] = [];
                        for (const k of Object.keys(serverError)) {
                            const val = serverError[k];
                            if (Array.isArray(val))
                                parts.push(`${k}: ${val.join(", ")}`);
                            else parts.push(`${k}: ${String(val)}`);
                        }
                        friendly += ` Server: ${parts.join(" | ")}`;
                    } else {
                        friendly += ` Server: ${String(serverError)}`;
                    }
                } catch (e) {
                    friendly += " (see console)";
                }
            }
            alert(friendly);
        }
    };

    // Dismiss accepted group notification
    const dismissAcceptedGroup = (groupId: number) => {
        try {
            const next = Array.from(
                new Set([...dismissedAcceptedGroupIds, groupId]),
            );
            setDismissedAcceptedGroupIds(next);
            localStorage.setItem(
                DISMISSED_ACCEPTED_GROUP_KEY,
                JSON.stringify(next),
            );
            setAcceptedGroupNotifications((prev) =>
                prev.filter((n) => n.group_id !== groupId),
            );
        } catch (err) {
            console.error("Failed to persist dismissed accepted group id:", err);
        }
    };

    return (
        <div className="page-container noti-page">
            <AuthNavBar
                onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
            />

            <div className="main-content">
                <Sidebar
                    isOpen={isSidebarOpen}
                    onClose={() => setIsSidebarOpen(false)}
                />

                <main className="noti-main">
                    <div className="noti-panel">
                        <h1 className="noti-title">Notifications</h1>

                        <div className="noti-list">
                            {loading && <p>Loading notifications...</p>}

                            {!loading &&
                                requests.length === 0 &&
                                acceptedNotifications.length === 0 &&
                                groupRequests.length === 0 &&
                                acceptedGroupNotifications.length === 0 && (
                                    <p>No notifications</p>
                                )}

                            {/* Accepted friend notifications */}
                            {!loading &&
                                acceptedNotifications.map((notif) => (
                                    <div
                                        key={notif.accepter_id}
                                        className="noti-item noti-accepted"
                                    >
                                        <div className="noti-left">
                                            <p className="noti-text">
                                                <strong>
                                                    {notif.accepter_name}
                                                </strong>{" "}
                                                (@{notif.accepter_username})
                                                accepted your friend request! 🎉
                                            </p>
                                        </div>
                                        <div className="noti-actions">
                                            <button
                                                className="noti-btn noti-btn-accept"
                                                onClick={() =>
                                                    dismissAccepted(
                                                        notif.accepter_id,
                                                    )
                                                }
                                            >
                                                ✓
                                            </button>
                                        </div>
                                    </div>
                                ))}

                            {/* Pending friend requests (incoming) */}
                            {!loading &&
                                requests.map((req) => (
                                    <div key={req.id} className="noti-item">
                                        <div className="noti-left">
                                            <p className="noti-text">
                                                <strong>
                                                    {req.user.display_name}
                                                </strong>{" "}
                                                (@{req.user.username}) wants to
                                                be your friend
                                            </p>
                                        </div>
                                        <div className="noti-actions">
                                            <button
                                                className="noti-btn noti-btn-decline"
                                                onClick={() =>
                                                    declineRequest(req.id)
                                                }
                                            >
                                                ✕
                                            </button>
                                            <button
                                                className="noti-btn noti-btn-accept"
                                                onClick={() =>
                                                    acceptRequest(req.id)
                                                }
                                            >
                                                ✓
                                            </button>
                                        </div>
                                    </div>
                                ))}

                            {/* Accepted group notifications */}
                            {!loading &&
                                acceptedGroupNotifications.map((notif) => (
                                    <div
                                        key={notif.group_id}
                                        className="noti-item noti-accepted"
                                    >
                                        <div className="noti-left">
                                            <p className="noti-text">
                                                <strong>
                                                    {notif.inviter_name}
                                                </strong>{" "}
                                                accepted your group invitation to{" "}
                                                <strong>
                                                    {notif.group_name}
                                                </strong>
                                                ! 🎉
                                            </p>
                                        </div>
                                        <div className="noti-actions">
                                            <button
                                                className="noti-btn noti-btn-accept"
                                                onClick={() =>
                                                    dismissAcceptedGroup(
                                                        notif.group_id,
                                                    )
                                                }
                                            >
                                                ✓
                                            </button>
                                        </div>
                                    </div>
                                ))}

                            {/* Pending group requests (incoming invitations) */}
                            {!loading &&
                                groupRequests.map((greq) => (
                                    <div key={greq.id} className="noti-item">
                                        <div className="noti-left">
                                            <p className="noti-text">
                                                <strong>
                                                    {greq.group.group_name}
                                                </strong>{" "}
                                                wants you to join
                                            </p>
                                        </div>
                                        <div className="noti-actions">
                                            <button
                                                className="noti-btn noti-btn-decline"
                                                onClick={() =>
                                                    declineGroupRequest(
                                                        greq.id,
                                                    )
                                                }
                                            >
                                                ✕
                                            </button>
                                            <button
                                                className="noti-btn noti-btn-accept"
                                                onClick={() =>
                                                    acceptGroupRequest(
                                                        greq.id,
                                                    )
                                                }
                                            >
                                                ✓
                                            </button>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
