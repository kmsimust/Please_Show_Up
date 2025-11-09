import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { AuthNavBar } from "../../components/auth_navbar";
import Sidebar from "../../components/sidebar";
import './edit.css';

export function EditProfilePage() {
  const navigate = useNavigate();
  const params = useParams();
  const tab = params.tab as string | undefined;
  const [activeTab, setActiveTab] = useState<string>(tab || 'profile');
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [headerFile, setHeaderFile] = useState<File | null>(null);

  useEffect(() => {
    if (tab) setActiveTab(tab);
  }, [tab]);

  const handleTabChange = (newTab: string) => {
    setActiveTab(newTab);
    navigate(`/account/${newTab}`);
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setAvatarFile(file);
  };

  const handleHeaderUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setHeaderFile(file);
  };

  const handleSubmitAvatar = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Avatar uploaded:', avatarFile);
  };

  const handleSubmitHeader = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Header uploaded:', headerFile);
  };

  return (
<div className="page-container">
    <AuthNavBar />
    
    <div className="main-content">
        <div className="side-bar">
            {/* your profile content */}  
        </div>
    
        <div className="content-area">
            <div className="settings-container">
            {/* Settings Sidebar */}
            <div className="settings-sidebar">
                <button
                className={`settings-nav-item ${activeTab === 'profile' ? 'active' : ''}`}
                onClick={() => handleTabChange('profile')}
                >
                <svg className="settings-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                </svg>
                <span>Profile</span>
                </button>

                <button
                className={`settings-nav-item ${activeTab === 'account' ? 'active' : ''}`}
                onClick={() => handleTabChange('account')}
                >
                <svg className="settings-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                </svg>
                <span>Account</span>
                </button>

                <button
                className={`settings-nav-item ${activeTab === 'notifications' ? 'active' : ''}`}
                onClick={() => handleTabChange('notifications')}
                >
                <svg className="settings-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
                </svg>
                <span>Notifications</span>
                </button>

                <button
                className={`settings-nav-item ${activeTab === 'history' ? 'active' : ''}`}
                onClick={() => handleTabChange('history')}
                >
                <svg className="settings-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/>
                </svg>
                <span>History</span>
                </button>
            </div>

            {/* Settings Content */}
            <div className="settings-content">
                {activeTab === 'profile' && (
                <>
                    <h1 className="settings-title">Profile settings</h1>

                    {/* Avatar Section */}
                    <div className="settings-section">
                    <h2 className="section-title">Avatar</h2>
                    <p className="section-description">
                        File Size: &lt; 0.6MB, File Formats: | .jpg | .png | .gif | .webp | .webm |, Recommended resolution: 300x300
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
                        {avatarFile && (
                            <p className="file-selected">Selected: {avatarFile.name}</p>
                        )}
                        </div>
                        <button type="submit" className="submit-btn">Submit</button>
                    </form>
                    </div>

                    {/* Header Section */}
                    <div className="settings-section">
                    <h2 className="section-title">Header</h2>
                    <p className="section-description">
                        File Size: &lt; 1.5MB, File Formats: | .jpg | .png | .gif | .webp | .webm |, Recommended resolution: 1500x430
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
                        {headerFile && (
                            <p className="file-selected">Selected: {headerFile.name}</p>
                        )}
                        </div>
                        <button type="submit" className="submit-btn">Submit</button>
                    </form>
                    </div>
                </>
                )}

                {activeTab === 'account' && (
                <>
                    <h1 className="settings-title">Account settings</h1>

                    {/* Change Name Section */}
                    <div className="settings-section">
                    <h2 className="section-title">Change name</h2>
                    <p className="section-description">Change your display name</p>
                    
                    <form onSubmit={(e) => e.preventDefault()}>
                        <input
                        type="text"
                        placeholder="User"
                        className="settings-input"
                        defaultValue="User"
                        />
                        <button type="submit" className="submit-btn">Submit</button>
                    </form>
                    </div>

                    {/* Change Password Section */}
                    <div className="settings-section">
                    <h2 className="section-title">Change password</h2>
                    <p className="section-description">Request password reset link.</p>
                    
                    <button className="submit-btn">Send new link</button>
                    </div>

                    {/* Change Email Section */}
                    <div className="settings-section">
                    <h2 className="section-title">Change email</h2>
                    <p className="section-description">Change the email associated with your account.</p>
                    
                    <form onSubmit={(e) => e.preventDefault()}>
                        <input
                        type="email"
                        placeholder="New email"
                        className="settings-input"
                        />
                        <input
                        type="password"
                        placeholder="Current password"
                        className="settings-input"
                        />
                        <button type="submit" className="submit-btn">Submit</button>
                    </form>
                    </div>
                </>
                )}

                {activeTab !== 'profile' && activeTab !== 'account' && (
                <div className="coming-soon">
                    <h2>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Settings</h2>
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
