const Sidebar = () => {
    return (
        <div className="d-flex">
            {/* Sidebar */}
            <div className="sidebar d-flex" id="sidebar">
                <a href="/group" className="sidebar-link p-3">
                    <i className="bi bi-house mx-3"></i>
                    Home
                </a>
                <a href="#" className="sidebar-link p-3">
                    <i className="bi bi-calendar mx-3"></i>
                    Calender
                </a>
                <a href="/group" className="sidebar-link p-3">
                    <i className="bi bi-folder mx-3"></i>
                    Groups
                </a>
                <a href="#" className="sidebar-link p-3">
                    <i className="bi bi-gear mx-3"></i>
                    Settings
                </a>
            </div>
        </div>
    );
};

export default Sidebar;
