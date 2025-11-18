import axios from "axios";
import Sidebar from "../../components/sidebar";
import { useState, useEffect } from "react";
import { AuthNavBar } from "../../components/auth_navbar";
import Cookies from "js-cookie";
import "./friend.css";
import { get_user_by_username } from "~/services/user";

interface Friend {
    id: number;
    user: UserObject;
    friend: UserObject;
    created_at?: string;
}

interface UserData {
    id: number;
    username: string;
    display_name: string;
    profile_image?: string;
}

interface UserObject {
    id: number;
    username: string;
    display_name: string;
    email?: string;
    profile_image?: string;
}

interface FriendRequestData {
    id: number;
    user: UserObject;
    friend: UserObject;
    status: string;
}

interface UserWithStatus extends UserData {
    friendStatus: "none" | "pending" | "friend";
    requestId: number | null;
}

export function FriendPage() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [username, setUsername] = useState<string>("");
    const [foundUsers, setFoundUsers] = useState<UserWithStatus[]>([]);
    const [myId, setMyId] = useState<number | null>(null);

    const token = Cookies.get("accessToken");
    const domain_link = "http://localhost:8000/";

    // Load logged-in user info
    useEffect(() => {
        async function loadMe() {
            try {
                const res = await axios.get(domain_link + "api/user/me/", {
                    headers: { Authorization: "Bearer " + token },
                });
                setMyId(res.data.id);
            } catch (e) {
                console.log("Failed loading user");
            }
        }
        loadMe();
    }, [token]);

    // Check relationship for a specific user
    async function checkRelationship(targetId: number): Promise<{
        status: "none" | "pending" | "friend";
        requestId: number | null;
    }> {
        if (!myId || myId === targetId) {
            return { status: "none", requestId: null };
        }

        try {
            // Check if we are friends
            const myFriendsRes = await axios.get(
                `${domain_link}api/get_friend_by_user_id/${myId}`,
                { headers: { Authorization: "Bearer " + token } },
            );

            const isFriendOfMine = myFriendsRes.data.some(
                (f: Friend) => f.friend.id === targetId,
            );

            if (isFriendOfMine) {
                return { status: "friend", requestId: null };
            }

            // Check reverse direction
            const theirFriendsRes = await axios.get(
                `${domain_link}api/get_friend_by_user_id/${targetId}`,
                { headers: { Authorization: "Bearer " + token } },
            );

            const amFriendOfTheirs = theirFriendsRes.data.some(
                (f: Friend) => f.friend.id === myId,
            );

            if (amFriendOfTheirs) {
                return { status: "friend", requestId: null };
            }

            // Check reverse lookup
            try {
                const reverseCheckRes = await axios.get(
                    `${domain_link}api/get_user_by_friend_id/${myId}`,
                    { headers: { Authorization: "Bearer " + token } },
                );

                const targetIsMyUser = reverseCheckRes.data.some(
                    (f: Friend) => f.user.id === targetId,
                );

                if (targetIsMyUser) {
                    return { status: "friend", requestId: null };
                }
            } catch (err) {
                console.log("Reverse check failed:", err);
            }

            // Check if I sent them a pending request
            const theirPendingRes = await axios.get(
                `${domain_link}api/get_user_friend_request/${targetId}`,
                { headers: { Authorization: "Bearer " + token } },
            );

            const iSentRequest = theirPendingRes.data.find(
                (r: FriendRequestData) =>
                    r.user.id === myId && r.status === "pending",
            );

            if (iSentRequest) {
                return { status: "pending", requestId: iSentRequest.id };
            }

            // Check if they sent me a pending request
            const myPendingRes = await axios.get(
                `${domain_link}api/get_user_friend_request/${myId}`,
                { headers: { Authorization: "Bearer " + token } },
            );

            const theySentRequest = myPendingRes.data.find(
                (r: FriendRequestData) =>
                    r.user.id === targetId && r.status === "pending",
            );

            if (theySentRequest) {
                return { status: "pending", requestId: theySentRequest.id };
            }

            return { status: "none", requestId: null };
        } catch (error) {
            console.error("Error checking relationship:", error);
            return { status: "none", requestId: null };
        }
    }

    // Search user
    const searchFriend = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchValue = e.target.value;
        setUsername(searchValue);

        if (!searchValue.trim()) {
            setFoundUsers([]);
            return;
        }

        const { result, error } = await get_user_by_username(searchValue);

        if (result && result.length > 0 && myId) {
            // Check relationship for each user
            const usersWithStatus = await Promise.all(
                result.map(async (user: UserData) => {
                    const { status, requestId } = await checkRelationship(
                        user.id,
                    );
                    return {
                        ...user,
                        friendStatus: status,
                        requestId: requestId,
                    };
                }),
            );
            setFoundUsers(usersWithStatus);
        } else {
            setFoundUsers([]);
        }
    };

    // Send friend request
    const sendFriendRequest = async (userId: number, index: number) => {
        if (!myId) return;

        try {
            const body = {
                user: myId,
                friend: userId,
                status: "pending",
            };

            const res = await axios.post(
                domain_link + "api/create_friend_request/",
                body,
                { headers: { Authorization: "Bearer " + token } },
            );

            // Update the specific user's status
            setFoundUsers((prev) =>
                prev.map((user, i) =>
                    i === index
                        ? {
                              ...user,
                              friendStatus: "pending",
                              requestId: res.data.id,
                          }
                        : user,
                ),
            );
        } catch (e) {
            console.log("Error sending request");
        }
    };

    return (
        <div className="page-container">
            <AuthNavBar
                onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
            />

            <div className="main-content">
                <Sidebar
                    isOpen={isSidebarOpen}
                    onClose={() => setIsSidebarOpen(false)}
                />

                <div className="content-area">
                    <div className="friend-search-container">
                        <div className="search-bar">
                            <input
                                type="text"
                                placeholder="Search username..."
                                name="username"
                                value={username}
                                onChange={searchFriend}
                            />
                        </div>

                        <div className="search-results-area">
                            {foundUsers.length === 0 && username && (
                                <p>No users found</p>
                            )}

                            {foundUsers.map((user, index) => (
                                <div key={user.id} className="user-card">
                                    <div className="user-info">
                                        <strong>{user.display_name}</strong>
                                        <span>@{user.username}</span>
                                    </div>

                                    {user.friendStatus === "none" && (
                                        <button
                                            className="add-button"
                                            onClick={() =>
                                                sendFriendRequest(
                                                    user.id,
                                                    index,
                                                )
                                            }
                                        >
                                            Add
                                        </button>
                                    )}

                                    {user.friendStatus === "pending" && (
                                        <button
                                            className="pending-button"
                                            disabled
                                        >
                                            Pending
                                        </button>
                                    )}

                                    {user.friendStatus === "friend" && (
                                        <button
                                            className="friend-button"
                                            disabled
                                        >
                                            Friend ✓
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
