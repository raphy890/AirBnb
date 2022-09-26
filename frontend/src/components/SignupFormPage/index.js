// frontend/src/components/SignupFormPage/index.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Redirect} from "react-router-dom"
import * as sessionActions from "../../store/session";
import './SignupForm.css';


//Render a form with controlled inputs for the new user's username, email, and
//password, and confirm password fields.


function SignupFormPage({setSignUpFormModal}) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);



  // if (sessionUser) return <Redirect to="/" />;


//On submit of the form, validate that the confirm password is the same as the password fields,
//then dispatch the signup thunk action with the form input values. Make sure to handle and
//display errors from the signup thunk action if there are any. If the confirm password is
//not the same as the password, display an error message for this.

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ firstName, lastName, email, username, password }))
        .then(() => setSignUpFormModal(false))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };



  return (
    <div className= 'login-title-container'>
    <form className="login-form"  onSubmit={handleSubmit}>
      <div className="signup-form-wrapper">
        <div className="signup-title">
          <h1 className="signup-h3">Sign up</h1>
        </div>
      </div>
      <ul>
        {errors.map((error, idx) => <li className= 'errors-list-sign' key={idx}>{error}</li>)}
      </ul>
      <label>
        <input
          type="text"
          value={firstName}
          className="login-input"
          onChange={(e) => setFirstName(e.target.value)}
          required
          placeholder={'first name'}
        />
      </label>
      <label>
        <input
          type="text"
          value={lastName}
          className="login-input"
          onChange={(e) => setLastName(e.target.value)}
          required
          placeholder={'last name'}
        />
      </label>
      <label>

        <input
          type="text"
          value={email}
          className="login-input"
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder={'email'}
        />
      </label>
      <label>

        <input
          type="text"
          value={username}
          className="login-input"
          onChange={(e) => setUsername(e.target.value)}
          required
          placeholder={'username'}
        />
      </label>
      <label>

        <input
          type="password"
          value={password}
          className="login-input"
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder={'password'}
        />
      </label>
      <label>
        <input
          type="password"
          value={confirmPassword}
          className="login-input"
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          placeholder={'password'}
        />
      </label>
      <button
        className="login-button-sign "
        type="submit">Sign Up</button>
    </form>
    </div>
  );
}


export default SignupFormPage;
