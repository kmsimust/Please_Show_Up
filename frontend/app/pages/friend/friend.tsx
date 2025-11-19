import axios from "axios";
import Sidebar from "../../components/sidebar";
import { useState, useEffect } from "react";
import { AuthNavBar } from "../../components/auth_navbar";
import Cookies from "js-cookie";
import "./friend.css";

interface Friend {
    id: number;
    user: UserObject; // Full user object, not just ID
    friend: UserObject; // Full friend object, not just ID
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
    user: UserObject; // Full user object, not just ID
    friend: UserObject; // Full friend object, not just ID
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
    const domain_link = "http://localhost:8000/";

    // Load logged-in user info
    useEffect(() => {
        async function loadMe() {
            try {
                const res = await axios.get(
                    domain_link + "api/user/me/",
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
    }, [myId, foundUser]);

    // Check relationship (friend / pending / none)
    async function checkRelationship(targetId: number) {
        if (!myId) return;

        // Don't allow adding yourself as a friend
        if (myId === targetId) {
            setFriendStatus("none");
            return;
        }

        try {
            // Check if we are friends - check BOTH user_id directions
            const myFriendsRes = await axios.get(
                `${domain_link}api/get_friend_by_user_id/${myId}`,
                { headers: { Authorization: "Bearer " + token } },
            );

            console.log(
                "My friends (user_id=" + myId + "):",
                myFriendsRes.data,
            );

            // Check if target is in my friends list (where I am 'user')
            const isFriendOfMine = myFriendsRes.data.some(
                (f: Friend) => f.friend.id === targetId,
            );

            if (isFriendOfMine) {
                console.log("Found as friend (I am user, they are friend)");
                setFriendStatus("friend");
                setRequestId(null);
                return;
            }

            // Check if they have me as friend (where they are 'user')
            const theirFriendsRes = await axios.get(
                `${domain_link}api/get_friend_by_user_id/${targetId}`,
                { headers: { Authorization: "Bearer " + token } },
            );

            console.log(
                "Their friends (user_id=" + targetId + "):",
                theirFriendsRes.data,
            );

            const amFriendOfTheirs = theirFriendsRes.data.some(
                (f: Friend) => f.friend.id === myId,
            );

            if (amFriendOfTheirs) {
                console.log("Found as friend (they are user, I am friend)");
                setFriendStatus("friend");
                setRequestId(null);
                return;
            }

            // Use the reverse lookup API - get_user_by_friend_id
            // This checks if targetId has any Friend records where friend=myId
            try {
                const reverseCheckRes = await axios.get(
                    `${domain_link}api/get_user_by_friend_id/${myId}`,
                    { headers: { Authorization: "Bearer " + token } },
                );

                console.log(
                    "Reverse check (friend_id=" + myId + "):",
                    reverseCheckRes.data,
                );

                const targetIsMyUser = reverseCheckRes.data.some(
                    (f: Friend) => f.user.id === targetId,
                );

                if (targetIsMyUser) {
                    console.log("Found as friend via reverse lookup");
                    setFriendStatus("friend");
                    setRequestId(null);
                    return;
                }
            } catch (err) {
                console.log("Reverse check failed:", err);
            }

            // Check if I sent them a pending request
            // API returns requests where friend = targetId
            const theirPendingRes = await axios.get(
                `${domain_link}api/get_user_friend_request/${targetId}`,
                { headers: { Authorization: "Bearer " + token } },
            );

            const iSentRequest = theirPendingRes.data.find(
                (r: FriendRequestData) =>
                    r.user.id === myId && r.status === "pending",
            );

            if (iSentRequest) {
                setFriendStatus("pending");
                setRequestId(iSentRequest.id);
                return;
            }

            // Check if they sent me a pending request
            // API returns requests where friend = myId
            const myPendingRes = await axios.get(
                `${domain_link}api/get_user_friend_request/${myId}`,
                { headers: { Authorization: "Bearer " + token } },
            );

            const theySentRequest = myPendingRes.data.find(
                (r: FriendRequestData) =>
                    r.user.id === targetId && r.status === "pending",
            );

            if (theySentRequest) {
                setFriendStatus("pending");
                setRequestId(theySentRequest.id);
                return;
            }

            setFriendStatus("none");
            setRequestId(null);
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
            setRequestId(null);

            try {
                const res = await axios.get(
                    `${domain_link}api/user/get_user_by_username/${username}`,
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
                domain_link + "api/create_friend_request/",
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

                <div className="flex grow">
                    <div className="friends-page">

                    <div className="flex">
                        <div className="friends-list-case">
                            <label className="text-lg">
                                Friends List
                            </label>
                            <div className="friends-list-list-case">
                                test
                                <div className="friends-list-user-case">
                                    aaaaaa
                                </div>
                            </div>
                        </div>
                    </div>


                    <div>
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
                                    foundUser.id === myId ? (
                                        <p>This is you!</p>
                                    ) : (
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
                                    )
                                ) : (
                                    <p>No user found</p>
                                )}
                            </div>
                        </div>
                    </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
