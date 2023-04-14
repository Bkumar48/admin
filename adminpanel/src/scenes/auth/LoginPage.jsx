import React, { useState, useEffect } from "react";
import "./LoginPage.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import $ from "jquery";
import jwt from 'jwt-decode'
const LoginPage = () => {
  const signupMode = () => {
    $(".container").addClass("sign-up-mode");
  };

  const signinMode = () => {
    $(".container").removeClass("sign-up-mode");
  };

  // ****************** Signup Form State Variables and Functions Start Here ******************
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // ****************** Signup Form State Variables and Functions End Here ******************

  // ************************ Signup Form Submit Handler Start Here *************************
  const signupSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      setLoading(true);
      const { data } = await axios.post(
        "http://localhost:5000/api/v1/user/register",
        {
          first_name: firstName,
          last_name: lastName,
          email: signupEmail,
          contact: mobile,
          password: signupPassword,
          cpassword: confirmPassword,
        },
        config
      );
      setLoading(false);
      console.log(data);
      setSuccess(true);
      navigate("/login");
      enqueueSnackbar("Signup Successful, Now you can login", { variant: "success" });
    } catch (error) {
      setError(error.response.data.message);
      setLoading(false);
      enqueueSnackbar(error, { variant: "error" });
    }
  };
  // ****************** Signup Form Submit Handler End Here ******************

  // ****************** Login Form State Variables and Functions Start Here ******************
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  //  Login Form State Variables and Functions End Here

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  //   ****************** Signup Form Submit Handler Start Here ******************
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      setLoading(true);
      const { data } = await axios.post(
        "http://localhost:5000/api/v1/user/login",
        {
          email,
          password,
        },
        config
      );
      setLoading(false);
      setSuccess(true);
      const token = data.token;
      const user = jwt(token);
      sessionStorage.setItem("token", token);
      console.log(data);
      navigate("/dashboard");
      enqueueSnackbar("Login Successful", { variant: "success" });
    } catch (error) {
      setError(error.response.data.message);
      setLoading(false);
      enqueueSnackbar(error.response.data.message, { variant: "error" });
    }
  };
  //   ****************** Signup Form Submit Handler End Here ******************

  return (
    <>
      <div className="container">
        <div className="forms-container">
          {/* ***************************************************************************** SIGNUP SECTION ***************************************************************************** */}
          <div className="signin-signup">
            <form action="#" className="sign-in-form">
              <h2 className="title">Sign in</h2>
              <div className="input-field">
                <i className="fas fa-user"></i>
                <input
                  type="text"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <input
                type="submit"
                value="Login"
                className="btn solid"
                onClick={submitHandler}
              />
              <p className="social-text">Or Sign in with social platforms</p>
              <div className="social-media">
                <a href="#" className="social-icon">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-google"></i>
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
            </form>
            <form action="#" className="sign-up-form">
              <h2 className="title">Sign up</h2>
              <div className="input-field">
                <i className="fas fa-user"></i>
                <input
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="input-field">
                <i className="fas fa-user"></i>
                <input
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div className="input-field">
                <i className="fas fa-envelope"></i>
                <input
                  type="email"
                  placeholder="Email"
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                />
              </div>
              <div className="input-field">
                <i className="fas fa-envelope"></i>
                <input
                  type="text"
                  placeholder="Mobile No."
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                />
              </div>
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input
                  type="password"
                  placeholder="Password"
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                />
              </div>
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <input
                type="submit"
                className="btn"
                value="Sign up"
                onClick={signupSubmitHandler}
              />
              <p className="social-text">Or Sign up with social platforms</p>
              <div className="social-media">
                <a href="#" className="social-icon">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-google"></i>
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
            </form>
          </div>
        </div>

        {/* ***************************************************************************** SIGNUP SECTION ***************************************************************************** */}

        <div className="panels-container">
          <div className="panel left-panel">
            <div className="content">
              <h3>New here ?</h3>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Debitis, ex ratione. Aliquid!
              </p>
              <button
                className="btn transparent"
                id="sign-up-btn"
                onClick={signupMode}
              >
                Sign up
              </button>
            </div>
            <img src="assets\login.svg" className="image" alt="" />
          </div>
          <div className="panel right-panel">
            <div className="content">
              <h3>One of us ?</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
                laboriosam ad deleniti.
              </p>
              <button
                className="btn transparent"
                id="sign-in-btn"
                onClick={signinMode}
              >
                Sign in
              </button>
            </div>
            <img src="assets\welcome.svg" className="image" alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
