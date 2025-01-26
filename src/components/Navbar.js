//import { Link } from "react-router-dom";
import React, { useState,useEffect,useRef } from "react";
import { Link,Outlet } from "react-router-dom";
import '../styles/navbar.css'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const sidebarRef = useRef(null);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setIsOpen(false); // Close sidebar if clicked outside
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);

    // Close the sidebar when the screen width is more than 768px
    if (window.innerWidth > 768) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    // <div>
    //   <button className="toggle-btn" onClick={toggleSidebar}>
    //     ☰
    //   </button>
    //   <div ref={sidebarRef} className={`sidenav ${isOpen ? 'active' : ''}`}>
    //     <Link to="/home">Dashboard</Link>
    //     <Link to="/home">Income Report</Link>
    //     <Link to="/assets">Asset Report</Link>
    //     <Link to="/home">Settings</Link>
    //   </div>
    // </div>

    <div className="app-container"> {/* New wrapper div */}
      <button className="toggle-btn" onClick={toggleSidebar}>
        ☰
      </button>

      <div ref={sidebarRef} className={`sidenav ${isOpen ? 'active' : ''}`}>
        <Link to="/home">Dashboard</Link>
        <Link to="/home">Income Report</Link>
        <Link to="/assets">Asset Report</Link>
        <Link to="/assetAuditLog">Asset Audit Log</Link>
        <Link to="/home">Settings</Link>
      </div>

      {/* Main content area */}
      <div className={`content ${isOpen ? 'shifted' : ''}`}>
        {/* Your main content goes here */}
        {/* Assuming you're using React Router for rendering routes */}
        <Outlet /> {/* If using React Router v6 for rendering nested routes */}
      </div>
    </div>
  );
}