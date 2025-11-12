import axios from "axios";
import Sidebar from "../../components/sidebar";
import { useState } from "react";
import { AuthNavBar } from "../../components/auth_navbar";
import Cookies from "js-cookie";
import "./friend.css";

interface Friend {
    id: string;
    username: string;
    display_name: string;
    avatar: string; // This is a URL to an image
    status: "online" | "offline";
}

interface FriendRequest {
    id: string;
    username: string;
    display_name: string;
    avatar: string;
    timestamp: string;
}

export function FriendPage() {
    // Every page need this function.
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // New state to manage the active tab
    const [activeTab, setActiveTab] = useState<"users" | "friends">("users");

    const [username, setUsername] = useState("");
    const [friend, setFriend] = useState<Friend | null>(null);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    // These arrays are not used in the search logic, but are part of your original file
    const friends: Friend[] = [];
    const requests: FriendRequest[] = [];

    // handle "Enter" key
    const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault(); // stop form submit or reload

            if (!username.trim()) return;

            // Reset state for new search
            setError("");
            setFriend(null);
            setIsLoading(true);

            try {
                const token = Cookies.get("accessToken");
                const res = await axios.get(
                    `http://localhost:8000/api/user/get_user_by_username/${encodeURIComponent(
                        username.trim(),
                    )}`,
                    {
                        headers: { Authorization: "Bearer " + token },
                    },
                );
                console.log("Friend data:", res.data);

                if (res.data) {
                    setFriend(res.data); // Set the found user
                    setError("");
                } else {
                    setError("User not found");
                    setFriend(null);
                }
            } catch (err: any) {
                console.error("Error fetching user:", err);
                if (err.response?.status === 404) {
                    setError("User not found");
                } else {
                    setError("Failed to fetch user");
                }
                setFriend(null);
            } finally {
                setIsLoading(false);
            }
        }
    };

    // Helper function to get avatar background class based on first letter
    // This matches the colors in your image mockup
    const getAvatarClass = (letter: string) => {
        const l = letter.toUpperCase();
        if (l === "J") return "avatar-green";
        if (l === "M") return "avatar-purple";
        if (l === "A") return "avatar-blue";
        return "avatar-default"; // A fallback color
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

                {/* 👇 START OF NEW CONTENT AREA CODE 👇 */}
                <div className="content-area">
                    <div className="friend-search-container">
                        {/* --- Tabs --- */}
                        <div className="search-tabs">
                            <button
                                className={`tab-button ${activeTab === "users" ? "active" : "inactive-users"}`}
                                onClick={() => setActiveTab("users")}
                            >
                                Search Users
                            </button>
                            <button
                                className={`tab-button ${activeTab === "friends" ? "active-friends" : "inactive"}`}
                                onClick={() => setActiveTab("friends")}
                            >
                                Search Friends
                            </button>
                        </div>

                        {/* --- Search Bar --- */}
                        {/* This search bar is active for both tabs, based on your code */}
                        <div className="search-bar">
                            <svg
                                className="search-icon"
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M11.7422 10.3439C12.5329 9.2673 13 7.9382 13 6.5C13 2.91015 10.0898 0 6.5 0C2.91015 0 0 2.91015 0 6.5C0 10.0898 2.91015 13 6.5 13C7.9382 13 9.2673 12.5329 10.3439 11.7422L10.343 11.7413L14.5858 16L16 14.5858L11.7413 10.343L11.7422 10.3439ZM11 6.5C11 8.98528 8.98528 11 6.5 11C4.01472 11 2 8.98528 2 6.5C2 4.01472 4.01472 2 6.5 2C8.98528 2 11 4.01472 11 6.5Z"
                                    fill="#888"
                                />
                            </svg>

                            <input
                                type="text"
                                placeholder="Find friends or users by name or username..."
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                onKeyDown={handleKeyDown}
                            />
                        </div>

                        {/* --- Search Results --- */}
                        <div className="search-results-area">
                            <h3>Search Results</h3>

                            {/* Show loading state */}
                            {isLoading && (
                                <p className="loading-message">Searching...</p>
                            )}

                            {/* Show error if any */}
                            {error && !isLoading && (
                                <p className="error-message">{error}</p>
                            )}

                            {/* Show found user if 'friend' state is not null and no error */}
                            {friend && !error && !isLoading && (
                                <div className="user-card">
                                    <div
                                        className={`avatar ${friend.display_name ? getAvatarClass(friend.display_name[0]) : "avatar-default"}`}
                                    >
                                        {friend.avatar ? (
                                            <img
                                                src={friend.avatar}
                                                alt={
                                                    friend.display_name ||
                                                    friend.username
                                                }
                                            />
                                        ) : (
                                            <span>
                                                {friend.display_name
                                                    ? friend.display_name[0].toUpperCase()
                                                    : friend.username[0].toUpperCase()}
                                            </span>
                                        )}
                                    </div>
                                    <div className="user-info">
                                        <strong>
                                            {friend.display_name ||
                                                friend.username}
                                        </strong>
                                        <span>@{friend.username}</span>
                                    </div>
                                    <button className="add-button">Add</button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                {/* 👆 END OF NEW CONTENT AREA CODE 👆 */}
            </div>
        </div>
    );
}
