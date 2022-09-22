// frontend/src/components/LoginFormModal/LoginForm.js
import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import "./LoginForm.css";
import {useHistory} from "react-router-dom"


function LoginForm({setShowLoginModal}) {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const history = useHistory()

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);

    dispatch(sessionActions.login({ credential, password })).then(() => setShowLoginModal(false)).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors)
        setErrors(data.errors);
      },
      // history.push('/')
      );
      reset()
      return false
    };

    const reset = () => {
      setCredential('');
      setPassword('')
    }

  return (
    <div className= 'login-title-container'>
    <form className="login-form" onSubmit={handleSubmit}>
        <div className="signup-form-wrapper">
          <div className="signup-title">
            <h1 className="signup-h3">Login up</h1>
        </div>
      </div>
      <ul>
        {errors.map((error, idx) => (
          <li className= 'errors-list' key={idx}>{error}</li>
        ))}
      </ul>
      <div className="information">

        <input
          type="text"
          className="login-input"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          placeholder={'Username or Email'}
          required
          />
        <input
          type="password"
          className="login-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={'password'}
          required
          />
        </div>
      <button
        className="login-button "
        type="submit"

        >Log In
        </button>
    </form>
    </div>
  );
}

export default LoginForm;
