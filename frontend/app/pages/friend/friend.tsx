import logo from "../../images/logo.png";
import "./friend.css";
import { useState } from "react";
import axios from 'axios';

export function Friend() {
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
          `http://localhost:8000/api/users/?username=${encodeURIComponent(username)}`
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
      <nav className="navbar navbar-expand-lg bg-green-main">
        <div className="container-fluid d-flex justify-content-between align-items-center px-4">
          {/* Logo */}
          <a className="navbar-brand d-flex align-items-center" href="#">
            <img src={logo} style={{ width: 140 }} alt="logo" />
          </a>

          {/* Profile */}
          <div className="d-flex align-items-center">
            <span className="fw-semibold fontGeorgia fs-6 me-2">Gotzibara</span>
            <a href="/profile">
              <img
                src="/image/genki_dama.jpg"
                alt="profile"
                className="rounded-circle"
                style={{ width: "50px", height: "50px" }}
              />
            </a>
          </div>
        </div>
      </nav>

      <div className="d-flex">
        {/* Sidebar */}
        <div className="sidebar p-3">
          <a href="/group">
            <button className="sideBtn mb-3">Home</button>
          </a>
          <a href="/profile">
            <button className="sideBtn mb-3">Profile</button>
          </a>
          <a href="/friend">
            <button className="sideBtn mb-3">Friends</button>
          </a>
          <a href="/message">
            <button className="sideBtn mb-3">Messages</button>
          </a>
        </div>
        <div className="mainContent">
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
                //somehow when press enter handle enter by fetch username from backend(url.py in user)
              />
            </div>

            {/* Friend row */}
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
