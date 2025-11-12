import { useState } from 'react';
import { AuthNavBar } from "../../components/auth_navbar";
import Sidebar from "../../components/sidebar";
import './notification.css';

interface Notification {
  id: string;
  user: {
    username: string;
    avatar: string;
  };
  message: string;
  timestamp: string;
  read: boolean;
}

export function NotificationsPage() {
  // Every page need this function.
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Mock data - replace with actual API call
  const notifications: Notification[] = [];

  return (

    <div>
      <AuthNavBar onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      
      <div className="main-content">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        
        <div className="content-area">
          <div className="content-container">
            <h1 className="notifications-title">Notifications</h1>
            
            {notifications.length === 0 ? (
              <div className="no-results">
                <p>No results found</p>
              </div>
            ) : (
              <div className="notifications-list">
                {notifications.map((notif) => (
                  <div 
                    key={notif.id} 
                    className={`notification-item ${!notif.read ? 'unread' : ''}`}
                  >
                    <img 
                      src={notif.user.avatar} 
                      alt={notif.user.username}
                      className="notification-avatar"
                    />
                    <div className="notification-content">
                      <p className="notification-message">
                        <strong>{notif.user.username}</strong> {notif.message}
                      </p>
                      <span className="notification-time">{notif.timestamp}</span>
                    </div>
                    {!notif.read && <div className="unread-indicator"></div>}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
