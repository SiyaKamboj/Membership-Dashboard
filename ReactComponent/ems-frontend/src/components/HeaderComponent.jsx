import React from 'react'
import { Link } from 'react-router-dom';

const HeaderComponent = () => {
  return (
    <div>
      {/*
        <nav className="navbar navbar-dark bg-dark" >
            <a className='navbar-brand'> TTV Member Management System</a>
        </nav>*/}
      <header>
        <nav className="navbar navbar-dark bg-dark" >
          <ul>
            <li>
              <Link to="/employees">Members</Link>
            </li>
            <li>
              <Link to="/projects">Projects</Link>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  )
}

export default HeaderComponent