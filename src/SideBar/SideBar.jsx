import React from "react";
import "./SideBar.css";
import { SiHomeadvisor, SiAmazondocumentdb, SiAudiomack } from "react-icons/si";
import headerImage from "./logo_twitter.jpeg";

function Sidebar() {
  return (
    <div className="sidebar-container">
      <div className="sidebar">
        <div className="sidebar-header">
          <img src={headerImage} alt="Header" className="header-image" />
          SPEECH ENHANCEMENT
        </div>
        <div className="sidebar-menu">
          <ul className="sidebar-menu">
            <li>
              <a href="/">
                <SiHomeadvisor />
                <span>Home</span>
              </a>
            </li>
            <li>
              <a href="/Document">
                <SiAmazondocumentdb />
                <span>Document</span>
              </a>
            </li>
            <li>
              <a href="audio">
                <SiAudiomack />
                <span>Audio</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
