import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getUser } from '../utils/auth-me';
import "../components/styles/auth_navbar.css"

// --- Helper function to delete cookies ---
// We need this because JavaScript can't just "remove" a cookie.
// You have to set its expiration date to the past.
function deleteCookie(name: string) {
  // Sets the cookie's expiration to a time in the past
  // 'path=/' ensures it deletes the cookie from the root path, which
  // matches what your screenshot shows.
  document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
}


interface AuthNavBarProps {
  onToggleSidebar?: () => void;
}

export function AuthNavBar({ onToggleSidebar }: AuthNavBarProps) {
  const user = getUser();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 68, right: 10 });
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate(); 

  const handleToggle = () => {
    if (onToggleSidebar) {
      onToggleSidebar();
    }
  };

  const toggleDropdown = (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + 8,
        right: window.innerWidth - rect.right
      });
    }
    
    setIsDropdownOpen(!isDropdownOpen);
  };

  // --- Start: Updated Logout Handler ---
  /**
   * Handles the complete logout process.
   */
  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault(); 

    try {
      // 1. (Still good practice) Call your backend to invalidate the session.
      await fetch('/api/v1/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

    } catch (error) {
      console.error("Server logout failed (continuing client-side):", error);
    }

    // 2. Clear client-side cookies.
    // THIS IS THE FIX. We are now deleting the cookies from your screenshot.
    deleteCookie('accessToken');
    deleteCookie('user');

    // 3. Redirect to the login page
    navigate('/login');
  };
  // --- End: Updated Logout Handler ---


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Recalculate position on window resize
  useEffect(() => {
    const handleResize = () => {
      if (isDropdownOpen && triggerRef.current) {
        const rect = triggerRef.current.getBoundingClientRect();
        setDropdownPosition({
          top: rect.bottom + 8,
          right: window.innerWidth - rect.right
        });
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isDropdownOpen]);

  return (
    <div className="top-nav-bar">
      <div className="left-links-container">
        <button 
          className="open-sidebar-button" 
          onClick={handleToggle}
          aria-label="Toggle sidebar"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            height="32px" 
            viewBox="0 -960 960 960" 
            width="32px" 
            fill="currentColor"
          >
            <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/>
          </svg>
        </button>
        <Link to="/" className="nav-logo">Place? Holder</Link>
      </div>
      
      <div className="right-links-container">

        <Link to="/#" className="top-nav-item">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            height="24px" 
            viewBox="0 -960 960 960"
            width="24px" 
            fill="currentColor">
            <path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z"/>
          </svg>
        </Link>

        <Link to="/#" className="top-nav-item">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            height="24px" 
            viewBox="0 -960 960 960"
            width="24px" 
            fill="currentColor">
            <path d="M40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Zm720 0v-120q0-44-24.5-84.5T666-434q51 6 96 20.5t84 35.5q36 20 55 44.5t19 53.5v120H760ZM360-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Zm400-160q0 66-47 113t-113 47q-11 0-28-2.5t-28-5.5q27-32 41.5-71t14.5-81q0-42-14.5-81T544-792q14-5 28-6.5t28-1.5q66 0 113 47t47 113ZM120-240h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360q-56 0-111 13.5T140-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T440-640q0-33-23.5-56.5T360-720q-33 0-56.5 23.5T280-640q0 33 23.5 56.5T360-560Zm0 320Zm0-400Z"/>
          </svg>
        </Link>

        <Link to="/#" className="top-nav-item" aria-label="Profile">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            height="24px" 
            viewBox="0 -960 960 960"
            width="24px" 
            fill="currentColor">
            <path d="M160-200v-80h80v-280q0-83 50-147.5T420-792v-28q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v28q80 20 130 84.5T720-560v280h80v80H160Zm320-300Zm0 420q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80ZM320-280h320v-280q0-66-47-113t-113-47q-66 0-113 47t-47 113v280Z"/>
          </svg>
        </Link>

        {/* User dropdown */}
        <div className={`dropdown ${isDropdownOpen ? 'active' : ''}`} ref={dropdownRef}>
          <button 
            ref={triggerRef}
            onClick={toggleDropdown} 
            className="dropdown-trigger"
            aria-label="User menu"
          >
            <img 
              src={user?.profile_image === "default" ? "default_user.png" : user?.profile_image} 
              alt="User" 
              className="user-icon"
            />
          </button>
          
          {isDropdownOpen && (
            <div 
              className="dropdown-content"
              style={{
                top: `${dropdownPosition.top}px`,
                right: `${dropdownPosition.right}px`
              }}
            >
              <a href="/profile" className="dropdown-userbox">
                <img 
                  src={user?.profile_image === "default" ? "default_user.png" : user?.profile_image}
                  alt="User" 
                  className="user-icon"
                />
                <div>
                  <div className="dropdown-username">
                    <span>{user?.display_name || user?.username || 'User'}</span>
                  </div>
                  <div className="dropdown-handle">
                    <span>@{user?.username || 'user'}</span>
                  </div>
                </div>
              </a>
              
              <div className="dropdown-divider"></div>
              
              <a href="/notifications" className="dropdown-option">
                <span>Notification</span>
                <i className="bi bi-bell"></i>
              </a>
              <a href="/friend" className="dropdown-option">
                <span>Friends</span>
                <i className="bi bi-people"></i>
              </a>
              <a href="/messages" className="dropdown-option">
                <span>Messages</span>
                <i className="bi bi-envelope"></i>
              </a>
              
              <div className="dropdown-divider"></div>
              
              {/* --- Logout Button --- */}
              <button onClick={handleLogout} className="dropdown-option">
                <span>Log out</span>
                <i className="bi bi-box-arrow-right"></i>
              </button>
              
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
