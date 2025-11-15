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

                {/* Main notification area (no Bootstrap) */}
                <main className="noti-main">
                    <div className="noti-panel">
                        <h1 className="noti-title">Notifications</h1>

                        <div className="noti-list">
                            {/* Group invite */}
                            <div className="noti-item">
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

                            {/* Friend request */}
                            <div className="noti-item">
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
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
