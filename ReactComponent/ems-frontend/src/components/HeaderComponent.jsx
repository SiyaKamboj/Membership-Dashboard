import React from 'react';
import { Link } from 'react-router-dom';
import './HeaderComponent.css'; // Assuming you add custom styles in a CSS file

const HeaderComponent = () => {
  return (
    <div>
      <header>
        <nav className="navbar navbar-dark bg-dark">
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <Link to="/employees" className="nav-link">
                Members
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/projects" className="nav-link">
                Projects
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default HeaderComponent;
