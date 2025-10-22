import "./friend.css";
import { useState } from "react";
import axios from "axios";
import NavBar from "../../components/navbar";
import Sidebar from "../../components/sidebar"; // ✅ import sidebar component
export function FriendPage() {
  const [username, setUsername] = useState("");
  const [friend, setFriend] = useState<any>(null);
  const [error, setError] = useState("");

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
    <>
      <NavBar />

      <div className="d-flex">
        {/* ✅ Use Sidebar component */}
        <Sidebar />

        {/* Main content */}
        <div className="flex-grow-1 mainContent p-4">
          <div className="container py-4" style={{ maxWidth: "700px" }}>
            {/* Search bar */}
            <div className="mb-5">
              <input
                type="text"
                className="form-control form-control-lg rounded-pill"
                placeholder="Search for people"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>

            {/* Friend row (static example) */}
            <div className="d-flex justify-content-between align-items-center p-3 bg-white border rounded shadow-sm mb-3">
              <div className="d-flex align-items-center">
                <div
                  className="rounded-circle bg-dark me-3"
                  style={{ width: "44px", height: "44px" }}
                ></div>
                <span className="fw-semibold">NatriumCL</span>
              </div>
              <button className="btn btn-success rounded-pill px-4">
                Add Friend
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
