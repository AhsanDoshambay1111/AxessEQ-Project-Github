import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faUser, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import '../Styling/HeroNavbar.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

function HeroNavbar() {

  AOS.init({
    duration: 1000, // Animation duration in milliseconds
    once: false,     // Whether the animation should only happen once
  });


  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };


  return (
    <div data-aos="zoom-in">
    <nav className={`hero-navbar ${menuOpen ? 'menu-open' : ''}`}>
      <div className='open-class'>
        <div className="logo">
          <a href="https://www.axesseq.com/"><img src={require('../assets/AxessEQ Logo.png')} alt="Logo" /></a>
        </div>
        <div className={`menu-toggle ${menuOpen ? 'hidden' : ''}`} onClick={toggleMenu} >
          <FontAwesomeIcon icon={faBars} />
        </div>
        <div className={`close-icon ${menuOpen ? '' : 'hidden'}`} onClick={toggleMenu}>
          <FontAwesomeIcon icon={faTimes} />
        </div>
      </div>
     
      <ul className={`menu ${menuOpen ? 'open' : ''}`}>
        <li className="menu-item">
          Products <FontAwesomeIcon icon={faCaretDown} />
          <ul className="submenu">
            <li>
              <a href="https://apps.apple.com/us/app/axesseq/id6444820689" target="_blank" rel="noopener noreferrer">
                IOS App
              </a>
            </li>
            <li>
              <a href="https://play.google.com/store/apps/details?id=com.axesseq" target="_blank" rel="noopener noreferrer">
                Android App
              </a>
            </li>
            <li>
              <a href="https://www.app.axesseq.com/our-goal" target="_blank" rel="noopener noreferrer">
                Web App
              </a>
            </li>
            {/* Add more products here */}
          </ul>
        </li>
        <li className="menu-item">
          Subscription <FontAwesomeIcon icon={faCaretDown} />
          <ul className="submenu">
            <li>
              <a href="https://www.axesseq.com/subscription" target="_blank" rel="noopener noreferrer">
                Gold Axess
              </a>
            </li>
            {/* Add more services here */}
          </ul>
        </li>
      </ul>
      <div className={`herologin-button ${menuOpen ? 'hidden' : ''}`} >
        <Link to="/login"><button><FontAwesomeIcon icon={faUser} className='user-icon'/> Login</button></Link>
      </div>
    </nav>
    </div>
  );
}

export default HeroNavbar;
