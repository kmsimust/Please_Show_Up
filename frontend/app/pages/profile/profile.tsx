import "./profile.css";
import logo from "../../images/logo.png";


export function Profile() {
  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg bg-green-main">
        <div className="container-fluid d-flex justify-content-between align-items-center px-4">
          {/* Logo */}
          <a className="navbar-brand d-flex align-items-center" href="/group">
            <img src={logo} style={{ width: 140 }} alt="logo" />
          </a>

          {/* Top-right PFP */}
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

      {/* Body with sidebar */}
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

        {/* Main profile content */}
        <div className="flex-grow-1 p-4">
          {/* Header with cover + avatar + name */}
          <div className="profile-header">
            <div className="profile-cover"></div>

            <img
              src="/image/genki_dama.jpg"
              alt="profile"
              className="profile-avatar"
            />

            <div className="profile-bar">
              <span className="profile-username">gotzibara #name</span>
              <button className="edit-btn">edit profile</button>
            </div>
          </div>

          {/* Info boxes */}
          <div className="d-flex gap-4">
            <div className="info-box" style={{ width: "250px" }}>
              <h5 className="mb-3">personal info</h5>
              <p>username: gotzibara</p>
              <p>gender: --</p>
              <p>birthdate: --</p>
              <p>email: --</p>
              <p>tel: --</p>
            </div>

            <div className="info-box flex-grow-1" style={{ minHeight: "220px" }}>
              {/* extra content (posts, etc.) */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
