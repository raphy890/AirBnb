// frontend/src/components/Navigation/ProfileButton.js
import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { useSelector } from "react-redux";
import * as sessionActions from '../../store/session';
import LoginFormModal from "../LoginFormModal";
import SignUpFormPage from "../SignupFormPage";
import SignUpFormModal from "../SignupFormPage/SignUpFormModal"
import hamburger from '../Navigation/images/hamburgerIcon.svg'
import icon from '../Navigation/images/icon.svg'
import { useHistory } from "react-router-dom";
import { login } from "../../store/session";
import {NavLink} from 'react-router-dom'
import './ProfileButton.css'



function ProfileButton({ user, isLoaded, setShowSignUp }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const history = useHistory()
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);


  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  const handleDemo = () => {
    const user = { credential: 'demo@user.io', password: 'password' }
    dispatch(login(user))
      .then(() => {
        setShowLoginModal(false)
        history.push('/')
      })
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };


    document.addEventListener('click', closeMenu);


    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);



  const sessionUser = useSelector(state => state.session.user);


  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push("/");
  };

  return (
    <>
      {showLoginModal && (<LoginFormModal showLoginModal={showLoginModal} setShowLoginModal={setShowLoginModal} />)}
      {/* {showSignUpModal && (<SignUpFormPage showSignUp={showSignUpModal} setShowSignUp={setShowSignUp} />)} */}
      <div className='right-profile-container'>
        <span className='host-hover-border'>
          <NavLink className='become-host-link' to="/spots/create">Become a Host</NavLink>
        </span>
      </div>
      <div className="profile-button-border" onClick={openMenu}>
        <img className="hamburger-icon" src={hamburger} />
        <img className="profile-icon" src={icon} />
      </div>
      {showMenu && (
        <div className="profile-dropdown">
            {isLoaded && sessionUser && (
            <ul className="profile-list">
              <li className="profile-list-item user-name-li">{user.username}</li>
              <NavLink to="/mySpots">
              <li className="hover-link"><NavLink className="menu-my-bookings" activeClassName="active" to="/mySpots">My Spots</NavLink></li>
              </NavLink>
              <li className="hover-link" onClick={logout}>Log Out</li>
            </ul>
          )}
          {isLoaded && !sessionUser && (
            <ul className="profile-list">
              <li className="hover-link">
              <div className="profile-list-item" onClick={() => setShowLoginModal(true)}>Login</div>
              </li>
              <li className="hover-link">
                <div className='profile-list-item' onClick={() => handleDemo()} to=''>Demo Login</div>
              </li>
              <li className="hover-link">
                <div className='profile-list-item' onClick={() => setShowSignUp(true)} to=''>Sign Up</div>
              </li>
            </ul>
          )}
        </div>
      )}
    </>
  );
}

export default ProfileButton;
