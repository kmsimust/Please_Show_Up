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
          to="/" 
          className={`sidebar-item ${isActive('/') ? 'active' : ''}`}
          onClick={handleLinkClick}
        >
          <svg className="sidebar-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
          </svg>
          <span>Home</span>
        </Link>

        <Link 
          to="/search" 
          className={`sidebar-item ${isActive('/search') ? 'active' : ''}`}
          onClick={handleLinkClick}
        >
          <svg className="sidebar-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
          </svg>
          <span>Search</span>
        </Link>

      </div>
    </>
  );
}
