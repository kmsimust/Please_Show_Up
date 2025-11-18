import { useState, useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router";
import NavBar from "../../components/navbar";
import Sidebar from "../../components/sidebar";
import { AuthNavBar } from "../../components/auth_navbar";
import "./edit.css";

import EditProfileAccount from "~/components/editProfileAccount";
import EditProfilePicture from "~/components/editProfilePicture";

import "bootstrap/dist/css/bootstrap.min.css"; // try to not use bootstrap

type TabKey = "profile" | "account" | "notifications" | "history";
const VALID_TABS: TabKey[] = ["profile", "account", "notifications", "history"];

export function EditProfilePage() {
    // Every page need this function.
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const navigate = useNavigate();
    const params = useParams();
    const tabParam = (params.tab as string | undefined)?.toLowerCase();
    const initialTab: TabKey = VALID_TABS.includes(tabParam as TabKey)
        ? (tabParam as TabKey)
        : "profile";

    const [activeTab, setActiveTab] = useState<TabKey>(initialTab);

    // other profile fields (unused now but kept)
    const [description, setDescription] = useState<string>("");
    const maxDescriptionLength = 5000;

    useEffect(() => {
        if (tabParam && VALID_TABS.includes(tabParam as TabKey)) {
            setActiveTab(tabParam as TabKey);
        }
    }, [tabParam]);

    const handleTabChange = (newTab: TabKey) => {
        setActiveTab(newTab);
        navigate(`/account/${newTab}`, { replace: true });
    };

    return (
        <div className="page-container">
            {/* Same top bar as GroupPage */}
            <AuthNavBar
                onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
            />

            {/* Same 2-column layout as GroupPage */}
            <div className="main-content">
                {/* Sidebar */}
                <Sidebar
                    isOpen={isSidebarOpen}
                    onClose={() => setIsSidebarOpen(false)}
                />

                {/* Main content */}
                <div className="content-area">
                    <div className="settings-container">
                        {/* Settings Sidebar (left tabs inside main content) */}
                        <div
                            className="settings-sidebar"
                            role="tablist"
                            aria-label="Settings tabs"
                        >
                            <button
                                type="button"
                                className={`settings-nav-item ${activeTab === "profile" ? "active" : ""}`}
                                onClick={() => handleTabChange("profile")}
                                aria-selected={activeTab === "profile"}
                            >
                                {/* svg omitted for brevity */}
                                <svg
                                    className="settings-icon"
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="24px"
                                    viewBox="0 -960 960 960"
                                    width="24px"
                                    fill="currentColor"
                                >
                                    <path d="M160-80q-33 0-56.5-23.5T80-160v-440q0-33 23.5-56.5T160-680h200v-120q0-33 23.5-56.5T440-880h80q33 0 56.5 23.5T600-800v120h200q33 0 56.5 23.5T880-600v440q0 33-23.5 56.5T800-80H160Zm0-80h640v-440H600q0 33-23.5 56.5T520-520h-80q-33 0-56.5-23.5T360-600H160v440Zm80-80h240v-18q0-17-9.5-31.5T444-312q-20-9-40.5-13.5T360-330q-23 0-43.5 4.5T276-312q-17 8-26.5 22.5T240-258v18Zm320-60h160v-60H560v60Zm-200-60q25 0 42.5-17.5T420-420q0-25-17.5-42.5T360-480q-25 0-42.5 17.5T300-420q0 25 17.5 42.5T360-360Zm200-60h160v-60H560v60ZM440-600h80v-200h-80v200Zm40 220Z" />
                                </svg>
                                <span>Profile</span>
                            </button>

                            <button
                                type="button"
                                className={`settings-nav-item ${activeTab === "account" ? "active" : ""}`}
                                onClick={() => handleTabChange("account")}
                                aria-selected={activeTab === "account"}
                            >
                                <svg
                                    className="settings-icon"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    aria-hidden="true"
                                >
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
                                </svg>
                                <span>Account</span>
                            </button>

                            <button
                                type="button"
                                className={`settings-nav-item ${activeTab === "notifications" ? "active" : ""}`}
                                onClick={() => handleTabChange("notifications")}
                                aria-selected={activeTab === "notifications"}
                            >
                                <svg
                                    className="settings-icon"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    aria-hidden="true"
                                >
                                    <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
                                </svg>
                                <span>Notifications</span>
                            </button>

                            <button
                                type="button"
                                className={`settings-nav-item ${activeTab === "history" ? "active" : ""}`}
                                onClick={() => handleTabChange("history")}
                                aria-selected={activeTab === "history"}
                            >
                                <svg
                                    className="settings-icon"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    aria-hidden="true"
                                >
                                    <path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z" />
                                </svg>
                                <span>History</span>
                            </button>
                        </div>

                        {/* Settings Content */}
                        <div className="settings-content">
                            {activeTab === "profile" && <EditProfilePicture />}

                            {activeTab === "account" && <EditProfileAccount />}

                            {activeTab !== "profile" &&
                                activeTab !== "account" && (
                                    <div className="coming-soon">
                                        <h2>
                                            {activeTab.charAt(0).toUpperCase() +
                                                activeTab.slice(1)}{" "}
                                            Settings
                                        </h2>
                                        <p>Coming soon...</p>
                                    </div>
                                )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
