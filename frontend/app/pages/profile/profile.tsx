import "./profile.css";
import Sidebar from "../../components/sidebar";
import { AuthNavBar } from "~/components/auth_navbar";

import React, { useEffect, useState } from "react";

import { get_user_data } from "~/services/user";

import "bootstrap/dist/css/bootstrap.min.css"; // try to not use bootstrap


export function ProfilePage() {
    // Every page need this function.
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const [userdata, setUserdata] = useState<any | null>(null);
    const [error, setError] = useState("");

    useEffect(() => {
        page_load();
    }, []);

    async function page_load() {
        const { result, error } = await get_user_data(); // Call service api function
        setUserdata(result);
        setError(error);
    }

    // ✅ Loading screen
    if (!userdata && !error) {
        return (
<div className="page-container">
    <AuthNavBar onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

    <div className="main-content">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
                
        <div className="content-area">
        <div className="d-flex justify-content-center p-5">
            Loading profile...
        </div>
        </div>
    </div>
</div>
        );
    }

    // ✅ Error screen
    if (error) {
        return (
<div className="page-container">
    <AuthNavBar onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        
    <div className="main-content">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
                
        <div className="content-area">
        <div className="text-center text-danger p-5">
            Failed to load profile: {JSON.stringify(error)}
        </div>
        </div>
    </div>
</div>
        );
    }

    // ✅ Main profile UI (uses userdata)
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

                <div className="profile-case">
                    <div
                        className="profile-banner"
                        style={{
                            backgroundImage:
                                userdata.banner !== "default"
                                    ? `url(http://localhost:8000/public/${userdata.banner})`
                                    : "url(/default_banner.jpg)",
                        }}
                    ></div>

                    <div className="profile-user-case">
                        <div className="profile-user-case2">
                            <img
                                className="profile-user-avatar"
                                src={
                                    userdata.profile_image !== "default"
                                        ? "http://localhost:8000/public/" +
                                          userdata.profile_image
                                        : "/default_user.png"
                                }
                            />

                            <div className="profile-user-name-case">
                                <div className="profile-user-display-name">
                                    {userdata.display_name || userdata.username}
                                </div>
                                <span>@{userdata?.username || "user"}</span>
                            </div>
                        </div>

                        <div>
                            <a href="/account/:tab?">
                                <button className="profile-user-edit-profile-button">
                                    Edit profile
                                </button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
