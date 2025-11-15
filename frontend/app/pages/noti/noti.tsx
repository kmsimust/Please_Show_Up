import "./noti.css";
import Sidebar from "../../components/sidebar";
import { AuthNavBar } from "~/components/auth_navbar";

import React, { useState } from "react";

export function Noti() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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

                {/* ✅ No more Bootstrap row/columns, just our own wrapper */}
                <div className="noti-wrapper">
                    <div className="noti-container">
                        <h1 className="noti-title">Notifications</h1>

                        {/* Group Invites */}
                        <section className="noti-section">
                            <h2 className="noti-section-title">
                                Group Invites
                            </h2>

                            <div className="noti-card">
                                <div className="noti-left">
                                    <div className="noti-avatar">
                                        <span>U</span>
                                    </div>
                                    <p className="noti-text">
                                        User X has invited you to join Group Y
                                    </p>
                                </div>

                                <div className="noti-actions">
                                    <button className="noti-btn noti-btn-decline">
                                        ✕
                                    </button>
                                    <button className="noti-btn noti-btn-accept">
                                        ✓
                                    </button>
                                </div>
                            </div>
                        </section>

                        <hr className="noti-divider" />

                        {/* Friend Requests */}
                        <section className="noti-section">
                            <h2 className="noti-section-title">
                                Friend Requests
                            </h2>

                            <div className="noti-card">
                                <div className="noti-left">
                                    <div className="noti-avatar">
                                        <span>U</span>
                                    </div>
                                    <p className="noti-text">
                                        User Z wants to be your friend
                                    </p>
                                </div>

                                <div className="noti-actions">
                                    <button className="noti-btn noti-btn-decline">
                                        ✕
                                    </button>
                                    <button className="noti-btn noti-btn-accept">
                                        ✓
                                    </button>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}
