import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";

import SideNav, {
  Toggle,
  Nav,
  NavItem,
  NavIcon,
  NavText
} from "@trendmicro/react-sidenav";

function SideNavBar({ isVisible, toggleSidebar }) {

  // const [isVisible, setIsVisible] = useState(true);
  const navigate=useNavigate();

    
    return (
      
      <SideNav onSelect={(selected)=>{navigate('/'+selected)}} expanded={isVisible}
      style={{
        position: 'fixed', // Keeps the navbar fixed
        top: 0,
        bottom: 0,
        left: 0,
        zIndex: 1000, // Ensures it’s above other content
        overflowY: 'auto', // Optional: adds scrolling within the navbar if content is too long
      }}
      >
       <SideNav.Toggle
        onClick={toggleSidebar} // Toggle visibility on click
      />
        <SideNav.Nav defaultSelected="home">
          <NavItem eventKey="home">
            <NavIcon>
              <i className="fa fa-fw fa-home" style={{ fontSize: "1.75em" }} />
            </NavIcon>
            <NavText>Home</NavText>
          </NavItem>
          <NavItem eventKey="assets">
            <NavIcon>
              <i
                className="fa fa-fw fa-line-chart"
                style={{ fontSize: "1.75em" }}
              />
            </NavIcon>
            <NavText>Assets</NavText>
          </NavItem>
          <NavItem eventKey="logout">
            <NavIcon>
              <i
                className="fa-solid fa-right-from-bracket"
                style={{ fontSize: "1.75em" }}
              />
            </NavIcon>
            <NavText>Logout</NavText>
          </NavItem>
        </SideNav.Nav>
      </SideNav>
    );
}

export default SideNavBar;
