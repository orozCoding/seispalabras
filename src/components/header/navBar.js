import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logOut } from "../../redux/userSlice";
import { ToastContainer, toast } from 'react-toastify';

const NavBar = () => {

  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const notify = () => toast('Signed out successfully')
  

  const handleSignOut = () => {
    dispatch(logOut());
    navigate('/')
    notify()
  }

  return (
    <nav id="navBar" className="navBar">
      <ul id="pagesList" className="d-flex bold">
        <li key={'Home'}>
          <NavLink to="/" className={({isActive}) => isActive ? 'activeLink' : 'pageLink'}>HOME</NavLink>
        </li>
        <li key={'Completed'}>
          <NavLink to="/Completed" className={({isActive}) => isActive ? 'activeLink' : 'pageLink'}>COMPLETED</NavLink>
        </li>
        <li key={'About'}>
          <NavLink to="/About" className={({isActive}) => isActive ? 'activeLink' : 'pageLink'}>ABOUT</NavLink>
        </li>
        {user.logged ? null : <li key={'Login'}>
          <NavLink to="/Login" className={({isActive}) => isActive ? 'activeLink' : 'pageLink'}>LOGIN</NavLink>
        </li>}
        {user.logged && <li>
          <button type="button" onClick={handleSignOut} className="pageLink click">SIGN OUT</button>
        </li>}
      </ul>
    </nav>
  )
}

export default NavBar;
