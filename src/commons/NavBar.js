import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => (
  <div className="navbar">
    <ul className='nav-bar'>
      <li>
        <Link className="link" to="/">Home</Link>
        <Link className="link" to="/newProject">New Project</Link>
        <Link className="link" to="/newWorker">New Worker</Link>
      </li>
    </ul>
  </div>
);

export default NavBar;