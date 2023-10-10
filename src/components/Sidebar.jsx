import React, { useState } from 'react';
import '../Styling/Sidebar.css';
import { FaBars , FaTimes } from 'react-icons/fa'; 
import { Link } from 'react-router-dom';
function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`btn ${isOpen ? 'click' : ''}`}
      >
        {isOpen ? <FaTimes/> : <FaBars/> }
      </button>

      <nav className={`sidebar ${isOpen ? 'show' : ''}`}>
        <div className="text">Side Menu</div>
        <ul>
          <li className="active"><Link to={'/home'}>Home</Link></li>
          <li><Link to={'/repos'}>Repositories</Link></li>
          <li><Link to={'/createRepo'}>Create Repository</Link></li>
          <li><Link to={'/security'}>Security</Link></li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
