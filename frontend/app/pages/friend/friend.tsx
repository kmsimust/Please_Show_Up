import axios from "axios";
import Sidebar from "../../components/sidebar";
import { useState, useEffect } from "react";
import { AuthNavBar } from "../../components/auth_navbar";
import Cookies from "js-cookie";
import "./friend.css";

interface Friend {
    id: number;
    user: number;
    friend: number;
}

interface UserData {
    id: number;
    username: string;
    display_name: string;
    profile_image?: string;
}

interface FriendRequestData {
    id: number;
    user: number;
    friend: number;
    status: string;
}

export function FriendPage() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const [username, setUsername] = useState("");
    const [foundUser, setFoundUser] = useState<UserData | null>(null);

    const [friendStatus, setFriendStatus] = useState<
        "none" | "pending" | "friend"
    >("none");
    const [requestId, setRequestId] = useState<number | null>(null);

    const [myId, setMyId] = useState<number | null>(null);

    const token = Cookies.get("accessToken");

    // Load logged-in user info
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
            } catch (e) {
                console.log("Failed loading user");
            }
        }
        loadMe();
    }, [token]);

    // Re-check relationship when myId becomes available AND when foundUser changes
    useEffect(() => {
        if (myId && foundUser) {
            checkRelationship(foundUser.id);
        }
    }, [myId, foundUser?.id]);

    // Check relationship (friend / pending / none)
    async function checkRelationship(targetId: number) {
        if (!myId) return;

        try {
            // Check if we are friends (user -> friend relationship)
            const myFriendsRes = await axios.get(
                `http://localhost:8000/api/get_friend_by_user_id/${myId}`,
                { headers: { Authorization: "Bearer " + token } },
            );

            const isFriendOfMine = myFriendsRes.data.some(
                (f: Friend) => f.friend === targetId,
            );

            if (isFriendOfMine) {
                setFriendStatus("friend");
                return;
            }

            // Check if they are friends with me (friend -> user relationship)
            const theirFriendsRes = await axios.get(
                `http://localhost:8000/api/get_friend_by_user_id/${targetId}`,
                { headers: { Authorization: "Bearer " + token } },
            );

            const amFriendOfTheirs = theirFriendsRes.data.some(
                (f: Friend) => f.friend === myId,
            );

            if (amFriendOfTheirs) {
                setFriendStatus("friend");
                return;
            }

            // Check if I sent them a pending request (I am user, they are friend)
            const theirPendingRes = await axios.get(
                `http://localhost:8000/api/get_user_friend_request/${targetId}`,
                { headers: { Authorization: "Bearer " + token } },
            );

            const iSentRequest = theirPendingRes.data.find(
                (r: FriendRequestData) =>
                    r.user === myId && r.status === "pending",
            );

            if (iSentRequest) {
                setFriendStatus("pending");
                setRequestId(iSentRequest.id);
                return;
            }

            // Check if they sent me a pending request (they are user, I am friend)
            const myPendingRes = await axios.get(
                `http://localhost:8000/api/get_user_friend_request/${myId}`,
                { headers: { Authorization: "Bearer " + token } },
            );

            const theySentRequest = myPendingRes.data.find(
                (r: FriendRequestData) =>
                    r.user === targetId && r.status === "pending",
            );

            if (theySentRequest) {
                setFriendStatus("pending");
                setRequestId(theySentRequest.id);
                return;
            }

            setFriendStatus("none");
        } catch (error) {
            console.error("Error checking relationship:", error);
        }
    }

    // Search user
    const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            if (!username.trim()) return;

            setFoundUser(null);
            setFriendStatus("none");

            try {
                const res = await axios.get(
                    `http://localhost:8000/api/user/get_user_by_username/${username}`,
                    { headers: { Authorization: "Bearer " + token } },
                );

                setFoundUser(res.data);
                // checkRelationship will be called automatically by the useEffect
            } catch {
                setFoundUser(null);
            }
        }
    };

    // Send friend request
    const sendFriendRequest = async () => {
        if (!foundUser || !myId) return;

        try {
            const body = {
                user: myId,
                friend: foundUser.id,
                status: "pending",
            };

            const res = await axios.post(
                "http://localhost:8000/api/create_friend_request/",
                body,
                { headers: { Authorization: "Bearer " + token } },
            );

            setFriendStatus("pending");
            setRequestId(res.data.id);
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
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                onKeyDown={handleKeyDown}
                            />
                        </div>

                        <div className="search-results-area">
                            {foundUser ? (
                                <div className="user-card">
                                    <div className="user-info">
                                        <strong>
                                            {foundUser.display_name}
                                        </strong>
                                        <span>@{foundUser.username}</span>
                                    </div>

                                    {friendStatus === "none" && (
                                        <button
                                            className="add-button"
                                            onClick={sendFriendRequest}
                                        >
                                            Add
                                        </button>
                                    )}

                                    {friendStatus === "pending" && (
                                        <button
                                            className="pending-button"
                                            disabled
                                        >
                                            Pending
                                        </button>
                                    )}

                                    {friendStatus === "friend" && (
                                        <button
                                            className="friend-button"
                                            disabled
                                        >
                                            Friend ✓
                                        </button>
                                    )}
                                </div>
                            ) : (
                                <p>No user found</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
