import React from "react";
import "./SideBar.css";
import { SiHomeadvisor, SiAmazondocumentdb, SiAudiomack } from "react-icons/si";
import headerImage from "./logo_twitter.jpeg";

function Sidebar({ onMenuClick, homeRef, documentRef, audioRef }) {
  return (
    <div className="sidebar-container">
      <div className="sidebar">
        <div className="sidebar-header">
          <img src={headerImage} alt="Header" className="header-image" />
          SPEECH ENHANCEMENT
        </div>
        <ul className="sidebar-menu-items">
          <li onClick={() => onMenuClick(homeRef)}>
            <SiHomeadvisor size={28} /> {/* Adjust the size prop */}
            <span>Home</span>
          </li>
          <li onClick={() => onMenuClick(audioRef)}>
            <SiAudiomack size={28} /> {/* Adjust the size prop */}
            <span>Audio</span>
          </li>
          <li onClick={() => onMenuClick(documentRef)}>
            <SiAmazondocumentdb size={28} /> {/* Adjust the size prop */}
            <span>About</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
