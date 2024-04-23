import React, { useState } from 'react';
import './SideBar.css';
import { SiHomeadvisor, SiAmazondocumentdb, SiAudiomack } from 'react-icons/si';
import headerImage from './logo_twitter.jpeg';
import { FaGithub } from 'react-icons/fa'; // Import the GitHub icon from react-icons/fa

function Sidebar({ onMenuClick, homeRef, documentRef, audioRef }) {
  const [activeMenuItem, setActiveMenuItem] = useState(null);

  const handleMenuClick = (ref) => {
    onMenuClick(ref);
    setActiveMenuItem(ref); // Set the active menu item when clicked
  };

  return (
    <div className='sidebar-container'>
      <div className='sidebar'>
        <div className='sidebar-header'>
          <img src={headerImage} alt='Header' className='header-image' />
          SPEECH ENHANCEMENT
        </div>
        <ul className='sidebar-menu-items'>
          <li
            className={activeMenuItem === homeRef ? 'active' : ''}
            onClick={() => handleMenuClick(homeRef)}
          >
            <SiHomeadvisor size={28} />
            <span>Home</span>
          </li>
          <li
            className={activeMenuItem === audioRef ? 'active' : ''}
            onClick={() => handleMenuClick(audioRef)}
          >
            <SiAudiomack size={28} />
            <span>Audio</span>
          </li>
          <li
            className={activeMenuItem === documentRef ? 'active' : ''}
            onClick={() => handleMenuClick(documentRef)}
          >
            <SiAmazondocumentdb size={28} />
            <span>About</span>
          </li>
        </ul>
        <div className="sidebar-footer">
          <hr />
          <a href="https://github.com/maralgunV/speech/tree/master" target="_blank" rel="noopener noreferrer" style={{ color: 'white', textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
            <FaGithub style={{ marginRight: '5px' }} /> {/* GitHub icon */}
            Source code
          </a>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
