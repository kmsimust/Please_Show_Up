import "../../components/styles/styles.css";
import "../../components/styles/common.css";
import "./profile.css";
import Sidebar from "../../components/sidebar";
import { AuthNavBar } from "~/components/auth_navbar";

import React, { useEffect, useState } from "react";

import { get_user_data } from "~/services/user";

//import "bootstrap/dist/css/bootstrap.min.css"; // try to not use bootstrap


export function ProfilePage() {
    // Every page need this function.
    const domain_link = "http://localhost:8000/"
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
        <div className="flex justify-center p-5">
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

                <div className="profile-page">
                    <div className="profile-case">
                        <div
                            className="profile-banner"
                            style={{
                                backgroundImage:
                                    userdata.banner !== "default"
                                        ? `url(${domain_link}public/${userdata.banner})`
                                        : "url(/default_banner.jpg)",
                            }}
                        ></div>
                        <div className="profile-test">
                            <img
                                className="profile-user-avatar"
                                src={
                                    userdata.profile_image !== "default"
                                        ? domain_link + "public/" +
                                            userdata.profile_image
                                        : "/default_user.png"
                                }
                            />
                        </div>

                        <div className="profile-user-case">
                            <div className="profile-user-case2">

                                <div className="ml-[1rem] mt-[2rem]"> 
                                    <div className="profile-user-display-name">
                                        {userdata.display_name || userdata.username}
                                    </div>
                                    <span className="common-muted">
                                        @{userdata?.username || "user"}
                                    </span>
                                    <div className="m-[0.5rem]"></div>
                                    <p>Firstname: {userdata.first_name} Lastname: {userdata.last_name}</p>
                                    <p>phone number: {userdata?.phone_number}</p>
                                    <p>Birthday: {userdata?.date_of_birth}</p>
                                    <p>Gender: {userdata?.gender}</p>
                                    <p>{userdata.first_name} {userdata.last_name}</p>
                                </div>
                            </div>

                            <div>
                                <a href="/account/:tab?">
                                    <button className="btn common-btn profile-edit-profile-button">
                                        Edit profile
                                    </button>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="profile-section-case">
                        <div className="profile-info-section">
                            <label className="text-lg">Info</label>
                        </div>
                    </div>

                    <div className="profile-info-case">
                        <div className="profile-info-section">
                            <div className="flex items-center mb-3 mt-1">
                                {userdata.gender ? (
                                    <p>{userdata.gender}</p>
                                ) : (
                                    <p className="common-faded">gender not set</p>
                                )}
                            </div>
                            <div className="flex items-center mb-2">
                                <svg className="mr-4"
                                xmlns="http://www.w3.org/2000/svg" width="1.25rem" height="1.25rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                                {userdata.email ? (
                                    <p>{userdata.email}</p>
                                ) : (
                                    <p className="common-faded">email not set</p>
                                )}
                            </div>
                            <div className="flex items-center mb-2">
                                <svg className="mr-4"
                                xmlns="http://www.w3.org/2000/svg" width="1.25rem" height="1.25rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                                {userdata.phone_number ? (
                                    <p>{userdata.phone_number}</p>
                                ) : (
                                    <p className="common-faded">phone number not set</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}