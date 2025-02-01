import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../components/style.css"; // Import the regular CSS file
import axios from "../services/axios";
import "../index.css";
import Aarohan_name from "../assets/Aarohan_name.png";
import Apple_logo from "../assets/Apple_logo.png";
import Facebook_icon from "../assets/Facebook_icon.png";
import Google_icon from "../assets/Google_icon.png";
import hand_only from "../assets/hand_only.png";
import Logo from "../assets/Logo.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/auth/login", { email, password });
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="container">
      <div className="login">
        <div className="logo_place">
          <img className="logo" src={Logo} alt="Logo" />
        </div>
        <header className="login_header">
          <h1>Login</h1>
        </header>
        <div className="email-pass-field">
          <div className="email_in">
            <h4 id="labelEmail" for="email_login">Email:</h4>
            <input
              className="border-2 border-black rounded p-2 w-3/4 mt-4"
              id="email_login"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <br/>
          <div className="pass_in">
            <h4 id="labelPassword" for="password">Password:</h4>
              <input
                className="border-2 border-black rounded p-2 w-3/4 mt-4"
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="with-error">
                <div className="forget">
                  <h5>Forget Password?</h5>
                  <div className="remember">
                    <label for="block">Remember Me</label>
                    <input type="checkbox" id="block" class="hidden-checkbox"></input>
                    <span class="custom-checkbox"></span>
                  </div>
                </div>
                {error && <p id="error_login" className="text-red-500">{error}</p>}
              </div>
          </div>
          <div className="logbtndiv">
              <button id="loginBtn" className="bg-blue-600 text-white rounded px-6 py-2 mt-4 hover:bg-blue-800" onClick={handleLogin}>
                Login
              </button>
              <div className="line"></div>
          </div>
        </div>

        <div class="using_other_sites">
                <div className="google">
                    <img id="googleId" src={Google_icon} alt="google logo"/>
                    <h5>Continue with Google</h5>
                </div>
                <div className="facebook">
                    <img id="facebookId" src={Facebook_icon} alt="facebook logo"/>
                    <h5>Continue with Facebook</h5>
                </div>
                <div className="apple">
                    <img id="appleId" src={Apple_logo} alt="apple logo"/>
                    <h5>Continue with Apple</h5>
                </div>
          </div>


        <div className="go_to_signup">
          <h4>
            Are you new here?
          </h4>
          <Link id="SignUpLink" to="/signup">Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

const Slider = () => {
  return(
    <div className="slider">
      <div className="slide_logo">
        <img id="hand_logo" src={hand_only} alt="out_logo"/>
        <br/>
        <h1 id="Aarohan_logo">Aarohan</h1>
        <div id="line_rect"></div>
      </div>
      <div className="qoute">
        <h1 id="quote_slide">"Ascend the ladder of Knowledge"</h1>
      </div>
      <div id="welcome_Text">
        <h2>WELCOME BACK</h2>
        <h2>AMBARISH,</h2>
      </div>
    </div>
  );
}

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      await axios.post("/auth/signup", { email, password });
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="container flex h-screen overflow-hidden">
      <div className="signup w-1/2 h-full flex flex-col items-center bg-gray-100 p-10">
        <img className="w-24 h-auto mb-5" src={Logo.png} alt="Logo" />
        <h1 className="text-2xl font-bold">Sign Up</h1>
        {error && <p className="text-red-500">{error}</p>}
        <input
          className="border-2 border-black rounded p-2 w-3/4 mt-4"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="border-2 border-black rounded p-2 w-3/4 mt-4"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          className="border-2 border-black rounded p-2 w-3/4 mt-4"
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white rounded px-6 py-2 mt-4 hover:bg-blue-800"
          onClick={handleSignup}
        >
          Sign Up
        </button>
        <p className="mt-4">
          Already have an account? <Link to="/login" className="text-blue-600">Login</Link>
        </p>
      </div>
      <div className="slider w-1/2 h-full bg-blue-900 text-white flex flex-col justify-center items-center">
        <img className="w-28 h-auto" src={hand_only} alt="out_logo" />
        <h1 className="text-4xl font-bold mt-4">Aarohan</h1>
        <div className="w-3/4 h-0.5 bg-white my-4"></div>
        <h1 className="italic font-light text-lg">"Ascend the ladder of Knowledge"</h1>
      </div>
    </div>
  );
};

export { Login, Signup, Slider };