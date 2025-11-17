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
    user: UserObject; // ForeignKey returns full object
    friend: UserObject; // ForeignKey returns full object
    status: string;
}

interface Notification {
    id: number;
    type: "friend_request" | "friend_accepted";
    data: FriendRequest | AcceptedNotification;
    created_at: string;
}

interface AcceptedNotification {
    accepter_name: string;
    accepter_username: string;
    accepter_id: number;
}

export function Noti() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [requests, setRequests] = useState<FriendRequest[]>([]);
    const [acceptedNotifications, setAcceptedNotifications] = useState<
        AcceptedNotification[]
    >([]);
    const [myId, setMyId] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);

    const token = Cookies.get("accessToken");

    // Load my profile
    useEffect(() => {
        async function loadMe() {
            try {
                const res = await axios.get(
                    "http://localhost:8000/api/user/me/",
                    {
                        headers: { Authorization: "Bearer " + token },
                    },
                );
                setMyId(res.data.id);
            } catch (error) {
                console.error("Failed to load user:", error);
            }
        }
        loadMe();
    }, [token]);

    // Load pending friend requests and check for accepted friends
    useEffect(() => {
        if (!myId) return;

        async function loadNotifications() {
            try {
                setLoading(true);

                // Load pending friend requests
                const res = await axios.get(
                    `http://localhost:8000/api/get_user_friend_request/${myId}`,
                    { headers: { Authorization: "Bearer " + token } },
                );

                setRequests(res.data);

                // Check for recently accepted friend requests
                // Get all friend requests I sent
                const myRequestsRes = await axios.get(
                    `http://localhost:8000/api/friend_request/`,
                    { headers: { Authorization: "Bearer " + token } },
                );

                // Filter for requests I sent that were accepted
                const acceptedRequests = myRequestsRes.data.filter(
                    (r: FriendRequest) =>
                        r.user.id === myId && r.status === "approved",
                );

                // Create notifications for accepted requests
                const accepted = acceptedRequests.map((r: FriendRequest) => ({
                    accepter_name: r.friend.display_name,
                    accepter_username: r.friend.username,
                    accepter_id: r.friend.id,
                }));

                setAcceptedNotifications(accepted);
            } catch (error) {
                console.error("Failed to load notifications:", error);
            } finally {
                setLoading(false);
            }
        }

        loadNotifications();
    }, [myId, token]);

    // Accept request
    const acceptRequest = async (id: number) => {
        try {
            await axios.patch(
                `http://localhost:8000/api/update_status_friend_request/${id}/approved`,
                {},
                { headers: { Authorization: "Bearer " + token } },
            );

            // Remove from list after successful accept
            setRequests((prev) => prev.filter((r) => r.id !== id));
        } catch (error) {
            console.error("Failed to accept request:", error);
            alert("Failed to accept friend request. Please try again.");
        }
    };

    // Decline request
    const declineRequest = async (id: number) => {
        try {
            const response = await axios.patch(
                `http://localhost:8000/api/update_status_friend_request/${id}/declined`,
                {},
                { headers: { Authorization: "Bearer " + token } },
            );

            console.log("Decline response:", response);

            // Remove from list after successful decline
            setRequests((prev) => prev.filter((r) => r.id !== id));
        } catch (error) {
            console.error("Failed to decline request:", error);
            console.error("Error details:", error);
            alert("Failed to decline friend request. Please try again.");
        }
    };

    // Dismiss accepted notification
    const dismissAccepted = async (accepterId: number) => {
        // In a real app, you'd mark this as read in the backend
        // For now, just remove from UI
        setAcceptedNotifications((prev) =>
            prev.filter((n) => n.accepter_id !== accepterId),
        );
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
                                acceptedNotifications.length === 0 && (
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

                            {/* Pending friend requests */}
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
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
