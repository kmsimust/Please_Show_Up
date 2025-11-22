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

                                <div className="tw:ml-[1rem] tw:mt-[2rem]"> 
                                    <div className="profile-user-display-name">
                                        {userdata.display_name || userdata.username}
                                    </div>
                                    <span className="common-muted">
                                        @{userdata?.username || "user"}
                                    </span>
                                    <div className="tw:m-[0.5rem]"></div>
                                    <span>{userdata.first_name} {userdata.last_name}</span>
                                    {/*
                                    <p>Firstname: {userdata.first_name} Lastname: {userdata.last_name}</p>
                                    <p>phone number: {userdata?.phone_number}</p>
                                    <p>Birthday: {userdata?.date_of_birth}</p>
                                    <p>Gender: {userdata?.gender}</p>
                                    <p>{userdata.first_name} {userdata.last_name}</p>
                                    */}
                                </div>
                            </div>

                            <div>
                                <a href="/account/profile">
                                    <button className="tw:btn common-btn profile-edit-profile-button">
                                        Edit profile
                                    </button>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="profile-section-case">
                        <div className="profile-info-section">
                            <label className="tw:text-lg">Info</label>
                        </div>
                    </div>

                    <div className="profile-info-case">
                        <div className="profile-info-section">
                            <div className="tw:flex tw:items-center tw:mb-2">
                                {userdata.gender ? (
                                    <span>{userdata.gender}</span>
                                ) : (
                                    <span className="common-faded">gender not set</span>
                                )}
                            </div>
                            <div className="tw:flex tw:items-center tw:mb-2">
                                <svg className="tw:mr-4"
                                xmlns="http://www.w3.org/2000/svg" width="1.25rem" height="1.25rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                                {userdata.email ? (
                                    <span>{userdata.email}</span>
                                ) : (
                                    <span className="common-faded">email not set</span>
                                )}
                            </div>
                            <div className="tw:flex tw:items-center tw:mb-2">
                                <svg className="tw:mr-4"
                                xmlns="http://www.w3.org/2000/svg" width="1.25rem" height="1.25rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                                {userdata.phone_number ? (
                                    <span>{userdata.phone_number}</span>
                                ) : (
                                    <span className="common-faded">phone number not set</span>
                                )}
                            </div>
                            <div className="tw:flex tw:items-center tw:mb-2">
                                <svg className="bi bi-cake2 tw:mr-4"
                                xmlns="http://www.w3.org/2000/svg" width="1.25rem" height="1.25rem" fill="currentColor" viewBox="0 0 16 16"><path d="m3.494.013-.595.79A.747.747 0 0 0 3 1.814v2.683q-.224.051-.432.107c-.702.187-1.305.418-1.745.696C.408 5.56 0 5.954 0 6.5v7c0 .546.408.94.823 1.201.44.278 1.043.51 1.745.696C3.978 15.773 5.898 16 8 16s4.022-.227 5.432-.603c.701-.187 1.305-.418 1.745-.696.415-.261.823-.655.823-1.201v-7c0-.546-.408-.94-.823-1.201-.44-.278-1.043-.51-1.745-.696A12 12 0 0 0 13 4.496v-2.69a.747.747 0 0 0 .092-1.004l-.598-.79-.595.792A.747.747 0 0 0 12 1.813V4.3a22 22 0 0 0-2-.23V1.806a.747.747 0 0 0 .092-1.004l-.598-.79-.595.792A.747.747 0 0 0 9 1.813v2.204a29 29 0 0 0-2 0V1.806A.747.747 0 0 0 7.092.802l-.598-.79-.595.792A.747.747 0 0 0 6 1.813V4.07c-.71.05-1.383.129-2 .23V1.806A.747.747 0 0 0 4.092.802zm-.668 5.556L3 5.524v.967q.468.111 1 .201V5.315a21 21 0 0 1 2-.242v1.855q.488.036 1 .054V5.018a28 28 0 0 1 2 0v1.964q.512-.018 1-.054V5.073c.72.054 1.393.137 2 .242v1.377q.532-.09 1-.201v-.967l.175.045c.655.175 1.15.374 1.469.575.344.217.356.35.356.356s-.012.139-.356.356c-.319.2-.814.4-1.47.575C11.87 7.78 10.041 8 8 8c-2.04 0-3.87-.221-5.174-.569-.656-.175-1.151-.374-1.47-.575C1.012 6.639 1 6.506 1 6.5s.012-.139.356-.356c.319-.2.814-.4 1.47-.575M15 7.806v1.027l-.68.907a.94.94 0 0 1-1.17.276 1.94 1.94 0 0 0-2.236.363l-.348.348a1 1 0 0 1-1.307.092l-.06-.044a2 2 0 0 0-2.399 0l-.06.044a1 1 0 0 1-1.306-.092l-.35-.35a1.935 1.935 0 0 0-2.233-.362.935.935 0 0 1-1.168-.277L1 8.82V7.806c.42.232.956.428 1.568.591C3.978 8.773 5.898 9 8 9s4.022-.227 5.432-.603c.612-.163 1.149-.36 1.568-.591m0 2.679V13.5c0 .006-.012.139-.356.355-.319.202-.814.401-1.47.576C11.87 14.78 10.041 15 8 15c-2.04 0-3.87-.221-5.174-.569-.656-.175-1.151-.374-1.47-.575-.344-.217-.356-.35-.356-.356v-3.02a1.935 1.935 0 0 0 2.298.43.935.935 0 0 1 1.08.175l.348.349a2 2 0 0 0 2.615.185l.059-.044a1 1 0 0 1 1.2 0l.06.044a2 2 0 0 0 2.613-.185l.348-.348a.94.94 0 0 1 1.082-.175c.781.39 1.718.208 2.297-.426"/></svg>
                                {userdata.date_of_birth ? (
                                    <span>{userdata.date_of_birth}</span>
                                ) : (
                                    <span className="common-faded">birthday not set</span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}