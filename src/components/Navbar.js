//import { Link } from "react-router-dom";
import React from "react";
import { Link } from "react-router-dom";
import '../styles/navbar.css'

export default function Navbar() {
    return (
      //test
        <div className="sidenav">
          <Link to="/home">Dashboard</Link>
          <Link to="/home">Income Report</Link>
          <Link to="/assets">Asset Report</Link>
          <Link to="/home">Settings</Link>
        </div>
      );
}