import { useState, useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router";
import NavBar from "../../components/navbar";
import Sidebar from "../../components/sidebar";
import { AuthNavBar } from "../../components/auth_navbar"
import "./edit.css";

type TabKey = "profile" | "account" | "notifications" | "history";
const VALID_TABS: TabKey[] = ["profile", "account", "notifications", "history"];

export function EditProfilePage() {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navigate = useNavigate();
  const params = useParams();
  const tabParam = (params.tab as string | undefined)?.toLowerCase();
  const initialTab: TabKey = VALID_TABS.includes(tabParam as TabKey)
    ? (tabParam as TabKey)
    : "profile";

  const [activeTab, setActiveTab] = useState<TabKey>(initialTab);

  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [headerFile, setHeaderFile] = useState<File | null>(null);
  const [description, setDescription] = useState<string>("");
  const maxDescriptionLength = 5000;

  // Limits (bytes)
  const AVATAR_MAX = 0.6 * 1024 * 1024;
  const HEADER_MAX = 1.5 * 1024 * 1024;
  const ALLOWED_TYPES = useMemo(
    () => ["image/jpeg", "image/png", "image/gif", "image/webp", "video/webm"],
    []
  );

  useEffect(() => {
    if (tabParam && VALID_TABS.includes(tabParam as TabKey)) {
      setActiveTab(tabParam as TabKey);
    }
  }, [tabParam]);

  const handleTabChange = (newTab: TabKey) => {
    setActiveTab(newTab);
    navigate(`/account/${newTab}`, { replace: true });
  };

  const validateFile = (file: File, maxBytes: number) => {
    if (!ALLOWED_TYPES.includes(file.type)) {
      alert("Invalid file type.");
      return false;
    }
    if (file.size > maxBytes) {
      alert("File too large.");
      return false;
    }
    return true;
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && validateFile(file, AVATAR_MAX)) setAvatarFile(file);
  };

  const handleHeaderUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && validateFile(file, HEADER_MAX)) setHeaderFile(file);
  };

  const handleSubmitAvatar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!avatarFile) return;
    console.log("Avatar uploaded:", avatarFile);
  };

  const handleSubmitHeader = (e: React.FormEvent) => {
    e.preventDefault();
    if (!headerFile) return;
    console.log("Header uploaded:", headerFile);
  };

//   const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
//     const value = e.target.value.slice(0, maxDescriptionLength);
//     setDescription(value);
//   };

  return (
    <>
      {/* Same top bar as GroupPage */}
      <AuthNavBar 
      onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

      {/* Same 2-column layout as GroupPage */}
      <div className="d-flex">
        {/* Sidebar */}
        <Sidebar 
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)} />

        {/* Main content */}
        <div className="flex-grow-1 p-4">
          <div className="settings-container">
            {/* Settings Sidebar (left tabs inside main content) */}
            <div className="settings-sidebar" role="tablist" aria-label="Settings tabs">
              <button
                type="button"
                className={`settings-nav-item ${activeTab === "profile" ? "active" : ""}`}
                onClick={() => handleTabChange("profile")}
                aria-selected={activeTab === "profile"}
              >
                <svg className="settings-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
                </svg>
                <span>Profile</span>
              </button>

              <button
                type="button"
                className={`settings-nav-item ${activeTab === "account" ? "active" : ""}`}
                onClick={() => handleTabChange("account")}
                aria-selected={activeTab === "account"}
              >
                <svg className="settings-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
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
                <svg className="settings-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
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
                <svg className="settings-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z" />
                </svg>
                <span>History</span>
              </button>
            </div>

            {/* Settings Content */}
            <div className="settings-content">
              {activeTab === "profile" && (
                <>
                  <h1 className="settings-title">Profile picture settings</h1>

                  {/* Avatar */}
                  <div className="settings-section">
                    <h2 className="section-title">Avatar</h2>
                    <p className="section-description">
                      File Size: &lt; 0.6MB, File Formats: | .jpg | .png | .gif | .webp | .webm |, Recommended resolution: 300×300
                    </p>

                    <form onSubmit={handleSubmitAvatar}>
                      <div className="upload-area">
                        <input
                          type="file"
                          id="avatar-upload"
                          accept=".jpg,.jpeg,.png,.gif,.webp,.webm"
                          onChange={handleAvatarUpload}
                          hidden
                        />
                        <label htmlFor="avatar-upload" className="upload-label">
                          <div className="upload-content">
                            <p className="upload-title">Upload file(s)</p>
                            <p className="upload-subtitle">Drop file(s) here, or click to select.</p>
                          </div>
                        </label>
                        {avatarFile && <p className="file-selected">Selected: {avatarFile.name}</p>}
                      </div>
                      <button type="submit" className="submit-btn" disabled={!avatarFile}>
                        Submit
                      </button>
                    </form>
                  </div>

                  {/* Header */}
                  <div className="settings-section">
                    <h2 className="section-title">Banner</h2>
                    <p className="section-description">
                      File Size: &lt; 1.5MB, File Formats: | .jpg | .png | .gif | .webp | .webm |, Recommended resolution: 1500×430
                    </p>

                    <form onSubmit={handleSubmitHeader}>
                      <div className="upload-area">
                        <input
                          type="file"
                          id="header-upload"
                          accept=".jpg,.jpeg,.png,.gif,.webp,.webm"
                          onChange={handleHeaderUpload}
                          hidden
                        />
                        <label htmlFor="header-upload" className="upload-label">
                          <div className="upload-content">
                            <p className="upload-title">Upload file(s)</p>
                            <p className="upload-subtitle">Drop file(s) here, or click to select.</p>
                          </div>
                        </label>
                        {headerFile && <p className="file-selected">Selected: {headerFile.name}</p>}
                      </div>
                      <button type="submit" className="submit-btn" disabled={!headerFile}>
                        Submit
                      </button>
                    </form>
                  </div>

                  {/* Description */}
                  {/* <div className="settings-section">
                    <h2 className="section-title">Description</h2>
                    <p className="section-description">Visible on your profile page. You can tell users about yourself.</p>

                    <form onSubmit={(e) => e.preventDefault()}>
                      <label htmlFor="profile-description" className="sr-only">
                        Profile description
                      </label>
                      <textarea
                        id="profile-description"
                        className="settings-input textarea"
                        maxLength={maxDescriptionLength}
                        value={description}
                        onChange={handleDescriptionChange}
                        rows={6}
                        placeholder="Say hi 👋, what you’re studying, interests, etc."
                      />
                      <div className="char-counter">
                        {description.length}/{maxDescriptionLength}
                      </div>
                      <button type="submit" className="submit-btn">
                        Submit
                      </button>
                    </form>
                  </div> */}
                </>
              )}

              {activeTab === "account" && (
                <>
                  <h1 className="settings-title">Account settings</h1>

                  <div className="settings-section">
                    <h2 className="section-title">Change name</h2>
                    <p className="section-description">Change your display name</p>

                    <form onSubmit={(e) => e.preventDefault()}>
                      <input type="text" placeholder="User" className="settings-input"/>
                      <button type="submit" className="submit-btn">
                        Submit
                      </button>
                    </form>
                  </div>

                  <div className="settings-section">
                    <h2 className="section-title">Change password</h2>
                    <p className="section-description">Request password reset link.</p>

                    <button className="submit-btn" type="button">
                      Send new link
                    </button>
                  </div>

                  <div className="settings-section">
                    <h2 className="section-title">Change email</h2>
                    <p className="section-description">Change the email associated with your account.</p>

                    <form onSubmit={(e) => e.preventDefault()}>
                      <input type="email" placeholder="New email" className="settings-input" />
                      <input type="password" placeholder="Current password" className="settings-input" />
                      <button type="submit" className="submit-btn">
                        Submit
                      </button>
                    </form>
                  </div>

                  <div className="settings-section">
                    <h2 className="section-title">Change gender</h2>
                    <p className="section-description">Input your gender as you like</p>

                    <form onSubmit={(e) => e.preventDefault()}>
                      <input type="text" placeholder="example: Male/Female/Non-binary/prefer not to say" className="settings-input"/>
                      <button type="submit" className="submit-btn">
                        Submit
                      </button>
                    </form>
                  </div>

                  <div className="settings-section">
                    <h2 className="section-title">Change date of birth</h2>
                    <p className="section-description">Input your date of birth as you like</p>

                    <form onSubmit={(e) => e.preventDefault()}>
                      <input type="text" placeholder="example: 2000-01-01" className="settings-input"/>
                      <button type="submit" className="submit-btn">
                        Submit
                      </button>
                    </form>
                  </div>

                  <div className="settings-section">
                    <h2 className="section-title">Change phone_number</h2>
                    <p className="section-description">Input your phone_number</p>

                    <form onSubmit={(e) => e.preventDefault()}>
                      <input type="text" placeholder="example: 098-232-xxxx" className="settings-input"/>
                      <button type="submit" className="submit-btn">
                        Submit
                      </button>
                    </form>
                  </div>

                  <div className="settings-section">
                    <h2 className="section-title">Change display name</h2>
                    <p className="section-description">Input the display name you want</p>

                    <form onSubmit={(e) => e.preventDefault()}>
                      <input type="text" placeholder="name" className="settings-input"/>
                      <button type="submit" className="submit-btn">
                        Submit
                      </button>
                    </form>
                  </div>

                  <div className="settings-section">
                    <h2 className="section-title">Change Firstname</h2>
                    <p className="section-description">Input your Firstname</p>

                    <form onSubmit={(e) => e.preventDefault()}>
                      <input type="text" placeholder="Firstname" className="settings-input" />
                      <button type="submit" className="submit-btn">
                        Submit
                      </button>
                    </form>
                  </div>

                  <div className="settings-section">
                    <h2 className="section-title">Change Lastname</h2>
                    <p className="section-description">Input your Lastname</p>

                    <form onSubmit={(e) => e.preventDefault()}>
                      <input type="text" placeholder="Lastname" className="settings-input"/>
                      <button type="submit" className="submit-btn">
                        Submit
                      </button>
                    </form>
                  </div>
                </>
              )}

              {activeTab !== "profile" && activeTab !== "account" && (
                <div className="coming-soon">
                  <h2>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Settings</h2>
                  <p>Coming soon...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
