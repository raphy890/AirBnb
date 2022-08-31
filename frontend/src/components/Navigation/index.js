// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';
import favicon from '../Navigation/images/Favicon.png'

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  const history = useHistory()

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <div className='right-profile-container'>
        <ProfileButton user={sessionUser} isLoaded={isLoaded} />
      </div>
    );
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <NavLink to="/signup">Sign Up</NavLink>
      </>
    );
  }

  return (
    <nav className='main-navbar'>
      <div className='svg-container' onClick={() => history.push('/')}>
        <img className='favicon' src={favicon}/>
      </div>
      {isLoaded && sessionLinks}
    </nav>
  );
}

export default Navigation;
