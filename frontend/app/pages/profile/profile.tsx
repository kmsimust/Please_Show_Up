import "./profile.css";
import NavBar from "../../components/navbar";
import Sidebar from "../../components/sidebar"; // ✅ import Sidebar
import miniuserProfile from "../../../public/user.png";
import { getUser } from "../../utils/auth-me";

export function ProfilePage() {
  const user = getUser();
  return (
    <>
      <NavBar />

      {/* Body with sidebar */}
      <div className="d-flex">
        {/* ✅ Use Sidebar component */}
        <Sidebar />

        {/* Main profile content */}
        <div className="flex-grow-1 p-4">
          {/* Header with cover + avatar + name */}
          <div className="profile-header">
            <div className="profile-cover"></div>

            <img
              src={
                user?.profile_image == "default"
                  ? miniuserProfile
                  : user?.profile_image
              }
              alt="profile"
              className="profile-avatar"
            />

            <div className="profile-bar">
              <span className="profile-username">{user?.username}</span>
              <button className="edit-btn">edit profile</button>
            </div>
          </div>

          {/* Info boxes */}
          <div className="d-flex gap-4">
            <div className="info-box" style={{ width: "250px" }}>
              <h5 className="mb-3 fw-bold">personal info</h5>
              <p>username: {user?.username} </p>
              <p>gender: {user?.gender == null ? "null" : user?.gender}</p>
              <p>birthdate: {user?.date_of_birth == null ? "null" : user?.date_of_birth}</p>
              <p>email: {user?.email == null ? "null" : user?.email}</p>
              <p>tel: {user?.phone_number == null ? "null" : user?.phone_number}</p>
            </div>

            <div
              className="info-box flex-grow-1"
              style={{ minHeight: "220px" }}
            >
              {/* extra content (posts, etc.) */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
