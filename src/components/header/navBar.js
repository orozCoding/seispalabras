import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {

  return (
    <nav id="navBar" className="navBar">
      <ul id="pagesList" className="d-flex">
        <li key={'Home'}>
          <NavLink to="/" className={({isActive}) => isActive ? 'activeLink' : undefined}>HOME</NavLink>
        </li>
        <li key={'Completed'}>
          <NavLink to="/Completed" className={({isActive}) => isActive ? 'activeLink' : undefined}>COMPLETED</NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default NavBar;