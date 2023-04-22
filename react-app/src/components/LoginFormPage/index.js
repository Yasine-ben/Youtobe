import React, { useState, useEffect } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";

import './LoginForm.css';
import gooo from '../../Images/gooo.png'


function LoginFormPage() {
  const dispatch = useDispatch();
  const history = useHistory()
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [loginBtn, setLoginBtn] = useState("LogIn-Button-disabled")
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});



  useEffect(() => {
    if (email.length >= 4 && password.length >= 6) {
      setLoginBtn('LogIn-Button-enabled');
    } else {
      setLoginBtn('LogIn-Button-disabled');
    }
  }, [email, password]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    // * Data is null if the user doesn't exist
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors({ message: "Username or password is invalid" });
    } else {
      history.push('/')
    }
  };

  const loginDemoUser = () => {
    setEmail('demo@aa.io')
    setPassword('password')
    setTimeout(() => {
      dispatch(login('demo@aa.io', 'password'))
      history.push('/')
    }, 750)
  }

  const isDisabled = () => {
    if (email.length < 4 || password.length < 6) {
      return true;
    };
    return false;
  }

  return (
    <div className="LI-Wrapper">
      <div className="LI-Inner-Wrapper">
        <div className="LI-Title-Wrapper">
          <img className='LI-Goo' src={gooo} alt='goo icon' />
          <h1 className="LI-SignIn">Sign in</h1>
          <h3 className="LI-SignIn-Cont">to continue to YouTobe</h3>
        </div>
        <form className="LI-Form-Wrapper" onSubmit={handleSubmit}>
          <div className="LI-Error-Wrapper">
            {Object.values(errors).length ? <p style={{ color: 'red' }}> {`* ${errors.message}`}</p> : null}
          </div>
          <div className="LI-Input-Wrapper">
            <label className="LI-Email-Label">
              {/* Email */}
              <input
                className="LI-Email-Input"
                placeholder="Email/Username"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
            <label className="LI-Password-Label">
              {/* Password */}
              <input
                className="LI-Password-Input"
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
          </div>
          <div className="LI-Submit-Button-Wrapper">
            <div className="LI-CreateAccount" onClick={((e) => history.push('/signup'))}>Create account</div>
            <p onClick={() => loginDemoUser()}>Demo User</p>
            <button className="LI-Submit-Button" type="submit" disabled={isDisabled()}>Log In</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginFormPage;
