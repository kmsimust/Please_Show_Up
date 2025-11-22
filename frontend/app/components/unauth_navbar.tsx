import { useState, useEffect } from 'react';
import "../components/styles/unauth_nav.css"
import { getUser } from "../utils/auth-me";
import { Link } from 'react-router-dom';

export function UnAuthNavBar() {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    try {
      const userData = getUser();
      setUser(userData);
    } catch (error) {
      console.error("Error getting user:", error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Don't render anything while loading
  if (isLoading) {
    return (
      <div className="top-nav-bar">
        <div className="links-container">
          <Link className="home-link active" to="/">Home</Link>
          <Link to="/">About Us</Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="top-nav-bar">
      <div className="links-container">
        <Link className="home-link active" to="/">Home</Link>
        <Link to="/">About Us</Link>
        
        {user ? (
          <div className="button-container">
            <Link to="/group" className="custom-button">Open Web</Link>
          </div>
        ) : (
          <>
            <Link to="/signup">Sign Up</Link>
            <Link to="/login">Login</Link>
          </>
        )}
      </div>
    </div>
  );
}
