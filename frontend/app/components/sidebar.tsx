const Sidebar = () => {
  return (
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
    </div>
  );
};

export default Sidebar;
