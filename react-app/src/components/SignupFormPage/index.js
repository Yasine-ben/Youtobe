import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { signUp } from "../../store/session";
import './SignupForm.css';
import gooo from '../../Images/gooo.png'
import account from '../../Images/account.png'

function SignupFormPage() {
  const dispatch = useDispatch();
  const history = useHistory()
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  // const [cover_image, setCover_image] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const cover_image = 'https://i.ibb.co/cr3mJ0m/Default.jpg'

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    let err = {}

    if (email.length >= 45) err.email = "Email must be less than 45 characters";

    if (username.length < 4) err.username = "Username must be at least 4 characters";
    if (username.length >= 12) err.maxUsername = "Username must be less than 12 characters";

    if (password.length >= 20) err.maxPassword = "Password must be less than 20 characters";
    if (password.length < 6) err.password = "Password must be at least 6 characters";
    if (password !== confirmPassword) err.match = "Passwords must match";

    if (Object.values(err).length) return setErrors(err);

    if (password === confirmPassword) {
      const data = await dispatch(signUp(username, first_name, last_name, cover_image, email, password));
      if (data) {
        let dataErr = {};
        if (data.some(err => err.includes('username'))) dataErr.username = "Username is already in use"
        if (data.some(err => err.includes('email'))) dataErr.email = "Email address is already in use"
        setErrors(dataErr);
      } else {
        history.push('/')
      }
    } else {
      let dataErr = {}
      setErrors(dataErr.password =
        "Confirm Password field must be the same as the Password field"
      );
    }
  };

  return (
    <div className="SU-Wrapper">
      <div className="SU-Left-Wrapper">
        <div className="SU-Title-Wrapper">
          <img className='SU-Goo' src={gooo} alt='gooo' onClick={(e) => history.push('/')}/>
          <h1 className="SU-SignIn">Create your Gooo Account</h1>
          <h3 className="SU-SignIn-Cont">to continue to YouTobe</h3>
        </div>
        <form className="SU-Form-Wrapper" onSubmit={handleSubmit}>
          <div className="SU-Inputs-Wrapper">

            <div className="SU-PasswordAndConfirm-Wrapper">
              <label>
                <input
                  className="SU-Password-Input"
                  placeholder="First Name"
                  type="text"
                  value={first_name}
                  onChange={(e) => setFirst_name(e.target.value)}
                  required
                />
              </label>
              <label>
                <input
                  className="SU-Confirm-Input"
                  placeholder="Last Name"
                  type="text"
                  value={last_name}
                  onChange={(e) => setLast_name(e.target.value)}
                  required
                />
              </label>
            </div>

            <label className="SU-Username-Wrapper">
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
            <div className="SU-Sign-In-Instead-Button" onClick={((e) => history.push('/login'))}>Sign in instead</div>
            <button className="SU-Submit-Button" type="submit">Sign Up</button>
          </div>
        </form>
      </div>
      <div className="SU-Right-Wrapper">
        <img className="SU-Account-Img" src={account} alt='account img' />
        <p className="SU-OAAOGWFY-Top">One account. All of Gooo</p>
        <p className="SU-OAAOGWFY-Bot">working for you.</p>
        <div className="SignUp-Errors">
          {Object.values(errors).map((error, idx) => (
            <p className='SignUp-Error' key={idx}>{`* ${error}`}</p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SignupFormPage;
