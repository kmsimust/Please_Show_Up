import "./group.css";
import logo from "../../images/logo.png";


export function Group() {
  const handleCreateGroup = () => {};

  return (
    <>
      {/* Navbar */}
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

      {/* Main content with sidebar */}
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

        {/* Group content */}
        <div className="flex-grow-1 p-4">
          {/* Create group button */}
          <div className="mb-4">
            <button
              onClick={handleCreateGroup}
              type="button"
              className="btn btn-green text-white fw-bold fs-5 px-4 py-2"
            >
              Create group
            </button>
          </div>

          {/* Group cards */}
          <div className="groupCard rounded-4 p-3 mb-4">
            <div className="d-flex justify-content-between align-items-center">
              <p className="fw-bold fontGeorgia fs-4 m-0">isp group work</p>
              <p className="fw-bold fontGeorgia fs-5 m-0">members: 5</p>
            </div>
            <div className="d-flex justify-content-between align-items-center mt-3">
              <div className="d-flex">
                <div className="groupImg bg-dark me-2"></div>
                <div className="groupImg bg-success me-2"></div>
                <div className="groupImg bg-light me-2"></div>
                <div className="groupImg bg-info me-2"></div>
                <div className="groupImg bg-danger me-2"></div>
              </div>
              <div className="d-flex align-items-center">
                <span className="fw-semibold fontGeorgia fs-6 me-2">
                  group creater:
                </span>
                <div className="groupImg bg-dark"></div>
              </div>
            </div>
          </div>

          <div className="groupCard rounded-4 p-3">
            <div className="d-flex justify-content-between align-items-center">
              <p className="fw-bold fontGeorgia fs-4 m-0">our friend gang</p>
              <p className="fw-bold fontGeorgia fs-5 m-0">members: 4</p>
            </div>
            <div className="d-flex justify-content-between align-items-center mt-3">
              <div className="d-flex">
                <div className="groupImg bg-success me-2"></div>
                <div className="groupImg bg-light me-2"></div>
                <div className="groupImg bg-dark me-2"></div>
                <div className="groupImg bg-info me-2"></div>
              </div>
              <div className="d-flex align-items-center">
                <span className="fw-semibold fontGeorgia fs-6 me-2">
                  group creater:
                </span>
                <div className="groupImg bg-success"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
