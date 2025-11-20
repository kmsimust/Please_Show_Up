// friend.tsx
import axios from "axios";
import Sidebar from "../../components/sidebar";
import { useState, useEffect } from "react";
import { AuthNavBar } from "../../components/auth_navbar";
import Cookies from "js-cookie";
import '../../components/styles/common.css';
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
    const [myFriends, setMyFriends] = useState<UserData[]>([]);

    const token = Cookies.get("accessToken");
    const domain_link = "http://localhost:8000/";

    // Load logged-in user info (get myId)
    useEffect(() => {
        async function loadMe() {
            try {
                if (!token) return;
                const res = await axios.get(domain_link + "api/user/me/", {
                    headers: { Authorization: "Bearer " + token },
                });
                setMyId(res.data.id);
            } catch (e) {
                console.log("Failed loading user", e);
            }
        }
        loadMe();
    }, [token]);

    // This was vibe coded except for the filterMyFriends function
    // Fetch friends list after myId is set
    useEffect(() => {
        function filterMyFriends(friends: Friend) {
            if (friends.user.id === myId) {
                return friends.friend;
            } else {
                return friends.user;
            }
        }

        async function fetchUserFriends() {
            if (!token || !myId) return;
            try {
                const response = await fetch(`${domain_link}api/get_friends_from_user_id/${myId}`, {
                    headers: { Authorization: "Bearer " + token },
                });
                if (!response.ok) throw new Error("Failed to fetch friends");
                const data = await response.json();
                const friendUsers = data.map(filterMyFriends);

                setMyFriends(friendUsers);
            } catch (error) {
                console.error("Error fetching friends:", error);
            }
        }

        fetchUserFriends();
    }, [myId, token]);

    // Check relationship for a specific user
    async function checkRelationship(targetId: number): Promise<{
        status: "none" | "pending" | "friend";
        requestId: number | null;
    }> {
        if (!myId || myId === targetId) {
            return { status: "none", requestId: null };
        }

        try {
            // Check if we are friends (my outgoing friends)
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

            // Check reverse direction (their outgoing friends)
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

            // Reverse lookup: get_user_by_friend_id (if your backend uses it)
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
                // ignore if endpoint not present or fails
                console.log("Reverse check failed:", err);
            }

            // Check if I sent them a pending request (their pending requests)
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

            // Check if they sent me a pending request (my pending requests)
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
                    } as UserWithStatus;
                }),
            );
            setFoundUsers(usersWithStatus);
        } else if (result && result.length > 0) {
            // if not yet loaded myId, show results but default to 'none' status
            const usersWithDefault = result.map((user: UserData) => ({
                ...user,
                friendStatus: "none" as "none",
                requestId: null,
            }));
            setFoundUsers(usersWithDefault);
        } else {
            setFoundUsers([]);
        }
    };

    // Send friend request
    const sendFriendRequest = async (userId: number, index: number) => {
        if (!myId) return;

        if (userId === myId) {
            // shouldn't happen because UI will show "You", but guard anyway
            console.warn("Attempted to send friend request to yourself");
            return;
        }

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
        } catch (e: any) {
            console.log(
                "Error sending request:",
                e.response?.data || e.message,
            );
            alert(
                "Failed to send friend request. " +
                    (e.response?.data ? JSON.stringify(e.response.data) : ""),
            );
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

                    {/* Friends List */}
                    <div className="flex">
                        <div className="friends-list-case">
                            <label className="text-lg">
                                Friends List&nbsp;&nbsp;—&nbsp;&nbsp;{myFriends.length}
                            </label>

                            <div className="friends-list-list-case">
                                {myFriends.length === 0 ? (
                                    /* If friends list empty */
                                    <div className="flex grow flex-col">
                                        <div className="grow justify-center flex items-center">
                                            <p>You have no friends yet.</p>
                                        </div>
                                        <div className="grow"></div>
                                    </div>
                                ) : (
                                    /* Else */
                                    myFriends.map(user => (
                                        <div key={user.id} className="friends-list-user-case">
                                            <img
                                                className="common-pfp-lg bg-blue-500 mr-4"
                                                src={user.profile_image || "/default-profile.png"}
                                            />
                                            <div>
                                                <label className="friends-list-user-display-name">{user.display_name}</label>
                                                <p>@{user.username}</p>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Search Friends */}
                    <div>
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

                                    {/* Show "You" when the search result is the logged-in user */}
                                    {user.id === myId ? (
                                        <button
                                            className="friend-button"
                                            disabled
                                        >
                                            You
                                        </button>
                                    ) : user.friendStatus === "none" ? (
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
                                    ) : user.friendStatus === "pending" ? (
                                        <button
                                            className="pending-button"
                                            disabled
                                        >
                                            Pending
                                        </button>
                                    ) : (
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
            </div>
        </div>
    );
}
