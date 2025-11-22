import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import './styles/sidebar.css';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ isOpen = true, onClose }: SidebarProps) {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;

  const [width, setWidth] = useState<number | null>(null);

  useEffect(() => {
    // Only run on client
    if (typeof window !== 'undefined') {
      const handleResize = () => setWidth(window.innerWidth);
      handleResize(); // Set initial width
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  const isMobile = width !== null && width <= 768;

  const handleLinkClick = () => {
    // Close sidebar on mobile when link is clicked
    if (isMobile && onClose) {
      onClose();
    }
  };
  
  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && width !== null && width <= 768 && (
        <div className="sidebar-overlay" onClick={onClose}></div>
      )}
      
      <div className={`side-bar ${isOpen ? 'open' : 'closed'}`}>
        <Link 
          to="/group" 
          className={`sidebar-item ${isActive('/') ? 'active' : ''}`}
          onClick={handleLinkClick}
        >
          <svg className="sidebar-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
          </svg>
          <span>Home</span>
        </Link>

        <Link 
          to="#" 
          className={`sidebar-item ${isActive('/search') ? 'active' : ''}`}
          onClick={handleLinkClick}
        >
          <svg className="sidebar-icon"
               xmlns="http://www.w3.org/2000/svg"
               height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
            <path d="M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Z"/>
          </svg>
          <span>Calender</span>
        </Link>

        <Link 
          to="#" 
          className={`sidebar-item ${isActive('/search') ? 'active' : ''}`}
          onClick={handleLinkClick}
        >
          <svg className="sidebar-icon"
               xmlns="http://www.w3.org/2000/svg"
               height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
            <path d="M0-240v-63q0-43 44-70t116-27q13 0 25 .5t23 2.5q-14 21-21 44t-7 48v65H0Zm240 0v-65q0-32 17.5-58.5T307-410q32-20 76.5-30t96.5-10q53 0 97.5 10t76.5 30q32 20 49 46.5t17 58.5v65H240Zm540 0v-65q0-26-6.5-49T754-397q11-2 22.5-2.5t23.5-.5q72 0 116 26.5t44 70.5v63H780Zm-455-80h311q-10-20-55.5-35T480-370q-55 0-100.5 15T325-320ZM160-440q-33 0-56.5-23.5T80-520q0-34 23.5-57t56.5-23q34 0 57 23t23 57q0 33-23 56.5T160-440Zm640 0q-33 0-56.5-23.5T720-520q0-34 23.5-57t56.5-23q34 0 57 23t23 57q0 33-23 56.5T800-440Zm-320-40q-50 0-85-35t-35-85q0-51 35-85.5t85-34.5q51 0 85.5 34.5T600-600q0 50-34.5 85T480-480Zm0-80q17 0 28.5-11.5T520-600q0-17-11.5-28.5T480-640q-17 0-28.5 11.5T440-600q0 17 11.5 28.5T480-560Zm1 240Zm-1-280Z"/>
          </svg>
          <span>Groups</span>
        </Link>

        <Link 
          to="/account/profile" 
          className={`sidebar-item ${isActive('/search') ? 'active' : ''}`}
          onClick={handleLinkClick}
        >
          <svg className="sidebar-icon"
               xmlns="http://www.w3.org/2000/svg"
               height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
            <path d="m370-80-16-128q-13-5-24.5-12T307-235l-119 50L78-375l103-78q-1-7-1-13.5v-27q0-6.5 1-13.5L78-585l110-190 119 50q11-8 23-15t24-12l16-128h220l16 128q13 5 24.5 12t22.5 15l119-50 110 190-103 78q1 7 1 13.5v27q0 6.5-2 13.5l103 78-110 190-118-50q-11 8-23 15t-24 12L590-80H370Zm70-80h79l14-106q31-8 57.5-23.5T639-327l99 41 39-68-86-65q5-14 7-29.5t2-31.5q0-16-2-31.5t-7-29.5l86-65-39-68-99 42q-22-23-48.5-38.5T533-694l-13-106h-79l-14 106q-31 8-57.5 23.5T321-633l-99-41-39 68 86 64q-5 15-7 30t-2 32q0 16 2 31t7 30l-86 65 39 68 99-42q22 23 48.5 38.5T427-266l13 106Zm42-180q58 0 99-41t41-99q0-58-41-99t-99-41q-59 0-99.5 41T342-480q0 58 40.5 99t99.5 41Zm-2-140Z"/>
          </svg>
          <span>Setting</span>
        </Link>

      </div>
    </>
  );
}
