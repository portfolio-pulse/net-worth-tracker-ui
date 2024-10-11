//import { Link } from "react-router-dom";
import React from "react";
import { Link } from "react-router-dom";
import '../styles/navbar.css'

export default function Navbar() {
    return (
        <div className="sidenav">
          <Link to="/">Dashboard</Link>
          <Link to="/">Income Report</Link>
          <Link to="/assets">Asset Report</Link>
          <Link to="/">Settings</Link>
        </div>
      );
}