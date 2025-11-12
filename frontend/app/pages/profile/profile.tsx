import "./profile.css";
import { AuthNavBar } from "../../components/auth_navbar";
import Sidebar from "../../components/sidebar";
import axios from "axios";
import React, { useEffect, useState } from "react";

// ✅ Read cookie
function getCookie(name: string) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i].trim();
        if (c.indexOf(nameEQ) === 0)
            return c.substring(nameEQ.length, c.length);
    }
    return null;
}

export function ProfilePage() {

    // Every page need this function.
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const [userdata, setUserdata] = useState<any | null>(null);
    const [error, setError] = useState("");

    useEffect(() => {
        get_user_data();
    }, []);

    async function get_user_data() {
        try {
            // ✅ use cookie token first
            let token = getCookie("accessToken");

            // ✅ fallback to localStorage (if you store JWT there)
            if (!token) {
                token = localStorage.getItem("accessToken") || "";
            }

            console.log("TOKEN:", token);

            // ✅ API request
            const resp = await axios.get("http://localhost:8000/api/user/me/", {
                headers: {
                    Authorization: "Bearer " + token,
                },
                // ❌ REMOVE withCredentials unless your backend requires cookies
                // withCredentials: true,
            });

            console.log("API RESPONSE:", resp.data);
            setUserdata(resp.data);
        } catch (err: any) {
            console.error("ERROR /me:", err);
            setError(err.response?.data || "Failed to load profile.");
        }
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
           <AuthNavBar onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

            <div className="main-content">
                <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

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
                                        ? userdata.profile_image
                                        : "/default_user.png"
                                }
                            />

                            <div className="profile-user-name-case">
                                <div className="profile-user-display-name">
                                    {userdata.display_name || userdata.username}
                                </div>
                                {userdata.username}
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
