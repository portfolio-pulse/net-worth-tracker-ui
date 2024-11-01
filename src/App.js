import logo from './logo.svg';
import React, { useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation
} from "react-router-dom";
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Home from './pages/Home';
import AssetDetails from './pages/AssetDetails';
import SideNavBar from './components/Sidebar';

function AppContent() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login' || location.pathname === '/' || location.pathname === '/logout';
  const [isSidebarVisible, setSidebarVisible] = useState(true);
  return (
    <div style={{ display: "flex" }}>
      {!isLoginPage && (<SideNavBar
        isVisible={isSidebarVisible}
        toggleSidebar={() => setSidebarVisible(!isSidebarVisible)}
      />)}

      <div
        style={{
          marginLeft: !isLoginPage && isSidebarVisible ? 240 : (isLoginPage ? 0 : 64), // Adjust content based on sidebar
          transition: "margin-left 0.3s",
          width: "100%",
          padding: "20px",
        }}
      >
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/login' element={<Login />} />
          <Route path='/home' element={<Home />} />
          <Route path='/assets' element={<AssetDetails />} />
          <Route path='/logout' element={<Login />} />
        </Routes>
      </div>
    </div>

  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App;
