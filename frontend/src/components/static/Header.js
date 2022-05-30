import React from 'react';

function Header () {
  return (
      <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-2 shadow">
        <a className="navbar-brand col-md-3 col-lg-2 mr-0 px-3" href="/admin">
          Company name
        </a>
        <ul className="navbar-nav px-3">
          <li className="nav-item text-nowrap">
            {/* <a className="nav-link " href="/admin/logout">Sign out</a> */}
            <button className="btn btn-light">Sign Out</button>
          </li>
        </ul>
      </nav>
  );
}

export default Header;
