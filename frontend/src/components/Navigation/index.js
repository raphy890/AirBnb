// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';
import favicon from '../Navigation/images/Favicon.png'
import SignUpFormModal from '../SignupFormPage/SignUpFormModal';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  const [showSignUp, setShowSignUp] = useState(false)
  const history = useHistory()

    return (
      <nav className='main-navbar-nav'>
        <div className='svg-container' onClick={() => history.push('/')}>
          <img className='favicon' src={favicon} />
        </div>
        {isLoaded && (
          <div className='right-profile-container'>
            <ProfileButton user={sessionUser} isLoaded={isLoaded}
            setShowSignUp={setShowSignUp}/>
          </div>
        )}
        {showSignUp && (<SignUpFormModal showSignUp={showSignUp} setShowSignUp={setShowSignUp}/>)}
      </nav>
    );
  }

export default Navigation
