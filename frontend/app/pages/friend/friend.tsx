import axios from "axios";
import NavBar from "../../components/navbar";
import { AuthNavBar } from "../../components/auth_navbar";
import Sidebar from "../../components/sidebar"; // ✅ import sidebar component
import { useState } from 'react';
import './friend.css';
import "bootstrap/dist/css/bootstrap.min.css";

interface Friend {
  id: string;
  username: string;
  display_name: string;
  avatar: string;
  status: 'online' | 'offline';
}

interface FriendRequest {
  id: string;
  username: string;
  display_name: string;
  avatar: string;
  timestamp: string;
}


export function FriendPage() {
  // Every page need this function.
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  type TabKey = "profile" | "account" | "notifications" | "history";
  const VALID_TABS: TabKey[] = ["profile", "account", "notifications", "history"];

  const [username, setUsername] = useState("");
  const [friend, setFriend] = useState<any>(null);
  const [error, setError] = useState("");

  const friends: Friend[] = [];
  const requests: FriendRequest[] = [];

  // 👉 handle "Enter" key
  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault(); // stop form submit or reload

      if (!username.trim()) return;

      try {
        const res = await axios.get(
          `http://localhost:8000/api/users/?username=${encodeURIComponent(
            username
          )}`
        );
        console.log("Friend data:", res.data);

        if (res.data.length === 0) {
          setError("User not found");
          setFriend(null);
        } else {
          setFriend(res.data[0]);
          setError("");
        }
      } catch (err) {
        console.error("Error fetching user:", err);
        setError("Failed to fetch user");
      }
    }
  };

  return (
    <div className="page-container">
      <AuthNavBar onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      
      <div className="main-wrapper">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        
        <div className="content-area">
          
        </div>
      </div>
    </div>
  );
}
        
