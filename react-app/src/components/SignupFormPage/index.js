import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/session";
import './SignupForm.css';
import gooo from '../../Images/gooo.png'
import account from '../../Images/account.png'

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data)
      }
    } else {
      setErrors(['Confirm Password field must be the same as the Password field']);
    }
  };

  return (
    <div className="SU-Wrapper">
      <div className="SU-Left-Wrapper">
        <div className="SU-Title-Wrapper">
          <img className='SU-Goo' src={gooo} alt='gooo' />
          <h1 className="SU-SignIn">Create your Gooo Account</h1>
          <h3 className="SU-SignIn-Cont">to continue to YouTobe</h3>
        </div>
        <form className="SU-Form-Wrapper" onSubmit={handleSubmit}>

          <ul className="SU-Error-Wrapper">
            {errors.map((error, idx) => <li className="SU-Error" key={idx}>{error}</li>)}
          </ul>

          <div className="SU-Inputs-Wrapper">
            <label className="SU-Username-Wrapper">
              {/* Username */}
              <input
                className="SU-Username-Input"
                placeholder="Username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </label>

            <label className="SU-Email-Wrapper">
              {/* Email */}
              <input
                className="SU-Email-Input"
                placeholder="Email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
            <div className="SU-PasswordAndConfirm-Wrapper">
              <label>
                {/* Password */}
                <input
                  className="SU-Password-Input"
                  placeholder="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </label>

              <label>
                {/* Confirm Password */}
                <input
                  className="SU-Confirm-Input"
                  placeholder="Confirm"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </label>
            </div>
          </div>
          <div className="SU-Buttons-Wrapper">
            <div className="SU-Sign-In-Instead-Button">Sign in instead</div>
            <button className="SU-Submit-Button" type="submit">Sign Up</button>
          </div>
        </form>
      </div>
      <div className="SU-Right-Wrapper">
        <img className="SU-Account-Img" src={account} alt='account img'/>
        <p className="SU-OAAOGWFY-Top">One account. All of Gooo</p>
        <p className="SU-OAAOGWFY-Bot">working for you.</p>
      </div>
    </div>
  );
}

export default SignupFormPage;
