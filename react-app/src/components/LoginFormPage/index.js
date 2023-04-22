import React, { useState } from "react";
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
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  return (
    <div className="LI-Wrapper">
      <div className="LI-Inner-Wrapper">
        <div className="LI-Title-Wrapper">
          <img className='LI-Goo' src={gooo} alt='goo icon' />
          <h1 className="LI-SignIn">Sign in</h1>
          <h3 className="LI-SignIn-Cont">to continue to YouTobe</h3>
        </div>
        <form className="LI-Form-Wrapper" onSubmit={handleSubmit}>
          <ul className="LI-Error-Wrapper">
            {errors.map((error, idx) => (
              <li className="LI-Error" key={idx}>{error}</li>
            ))}
          </ul>
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
            <button className="LI-Submit-Button" type="submit">Log In</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginFormPage;
