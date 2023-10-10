
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { FaBars, FaPlus, FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import '../Styling/Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import myImage from '../assets/AxessEQ Logo.png';
import SearchBox from './SearchBox';
import { faShieldAlt } from '@fortawesome/free-solid-svg-icons';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS CSS for styling


function Navbar() {
  AOS.init({
    duration: 1000, // Animation duration in milliseconds
    once: false,     // Whether the animation should only happen once
  });

  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="logo">
          <Sidebar />
        </div>

        <div className='logo-nav' data-aos="fade-up">
          <img src={myImage} alt="My Image" />
        </div>

        <SearchBox data-aos="zoom-in"/>

        <Link to={'/Security'} className='nav-sec-link' data-aos="fade-down">
          <div className='nav-sec'>
            <p>Security</p>
            <FontAwesomeIcon icon={faShieldAlt} className="security-icon" />
          </div>
        </Link>

        <div className="navbar-icons" data-aos="fade-down">
          <Link to={'/CreateRepo'} create-repo-icon>
            <FaPlus className="nav-icon"/>
          </Link>
          
        </div>

        <div className="login-button" data-aos="fade-up">
          <Link to={"/"}><button>Logout</button></Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
