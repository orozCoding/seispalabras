import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {

  return (
    <nav id="navBar" className="navBar">
      <ul id="pagesList" className="d-flex bold">
        <li key={'Home'}>
          <NavLink to="/" className={({isActive}) => isActive ? 'activeLink' : 'pageLink'}>HOME</NavLink>
        </li>
        <li key={'Completed'}>
          <NavLink to="/Completed" className={({isActive}) => isActive ? 'activeLink' : 'pageLink'}>COMPLETED</NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default NavBar;
