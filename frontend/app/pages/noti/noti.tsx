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

export function Noti() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [requests, setRequests] = useState<FriendRequest[]>([]);
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

    // Load pending friend requests for me
    useEffect(() => {
        if (!myId) return;

        async function loadRequests() {
            try {
                setLoading(true);
                const res = await axios.get(
                    `http://localhost:8000/api/get_user_friend_request/${myId}`,
                    { headers: { Authorization: "Bearer " + token } },
                );

                // The API already filters for pending requests and friend_id = myId
                setRequests(res.data);
            } catch (error) {
                console.error("Failed to load requests:", error);
            } finally {
                setLoading(false);
            }
        }

        loadRequests();
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
            await axios.patch(
                `http://localhost:8000/api/update_status_friend_request/${id}/declined`,
                {},
                { headers: { Authorization: "Bearer " + token } },
            );

            // Remove from list after successful decline
            setRequests((prev) => prev.filter((r) => r.id !== id));
        } catch (error) {
            console.error("Failed to decline request:", error);
            alert("Failed to decline friend request. Please try again.");
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

                            {!loading && requests.length === 0 && (
                                <p>No notifications</p>
                            )}

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
