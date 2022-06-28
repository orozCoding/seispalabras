/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { logOut } from '../../redux/userSlice';
import { restoreActives } from '../../redux/activesSlice';
import { restoreCompleted } from '../../redux/completedSlice';
import { volumeOFF, volumeON } from '../../redux/soundSlice';

const NavBar = () => {
  const user = useSelector((state) => state.user);
  const sound = useSelector((state) => state.sound);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [mobile, setMobile] = useState(false);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    if (window.innerWidth <= 600) {
      setMobile(true);
    } else {
      setMobile(false);
      setClicked(false);
    }
    setClicked(false);

    window.addEventListener('resize', () => {
      if (window.innerWidth <= 600) {
        setMobile(true);
      } else {
        setMobile(false);
      }
      setClicked(false);
    });
  }, []);

  const handleSignOut = () => {
    dispatch(logOut());
    dispatch(restoreActives());
    dispatch(restoreCompleted());
    navigate('/');
    toast('Signed out successfully');
  };

  const handleBurgerClick = () => {
    setClicked(!clicked);
  };

  const handleSound = () => {
    if (sound) {
      dispatch(volumeOFF());
    } else {
      dispatch(volumeON());
    }
  };

  return (
    <nav id="navBar" className="navBar d-flex">
      <div>
        {sound ? <i className="bi bi-volume-up volume-icon" onClick={handleSound} />
          : <i className="bi bi-volume-mute volume-icon" onClick={handleSound} />}
      </div>
      <div>
        <i
          className={`burger-icon bi bi-list click ${mobile ? '' : 'none'}`}
          onClick={handleBurgerClick}
        />
      </div>
      <ul
        id="pagesList"
        className={`links-container d-flex bold ${mobile ? 'mobile' : ''}
      ${clicked ? 'show' : 'hide'}`}
      >
        <li key="Home">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? 'activeLink' : 'pageLink')}
            onClick={handleBurgerClick}
          >
            HOME
          </NavLink>
        </li>
        <li key="Completed">
          <NavLink
            to="/Completed"
            className={({ isActive }) => (isActive ? 'activeLink' : 'pageLink')}
            onClick={handleBurgerClick}
          >
            COMPLETED
          </NavLink>
        </li>
        <li key="About">
          <NavLink
            to="/About"
            className={({ isActive }) => (isActive ? 'activeLink' : 'pageLink')}
            onClick={handleBurgerClick}
          >
            ABOUT
          </NavLink>
        </li>
        {user.logged ? null : (
          <li key="Login">
            <NavLink
              to="/Login"
              className={({ isActive }) => (isActive ? 'activeLink' : 'pageLink')}
              onClick={handleBurgerClick}
            >
              LOGIN
            </NavLink>
          </li>
        )}
        {user.logged && (
          <li>
            <button
              type="button"
              onClick={() => {
                handleSignOut();
                handleBurgerClick();
              }}
              className="pageLink click"
            >
              SIGN OUT
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
