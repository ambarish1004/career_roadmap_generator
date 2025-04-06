import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as THREE from "three";
import NET from "vanta/dist/vanta.net.min";
import GLOBE from "vanta/dist/vanta.globe.min"; // <-- Import GLOBE for slider

import "../components/darkStyle.css";
import "../components/style.css";
import "../index.css";

import axios from "../services/axios";
import Aarohan_name from "../assets/Aarohan_name.png";
import White_Apple_logo from "../assets/White_Apple_logo.png";
import Apple_logo from "../assets/Apple_logo.png";
import Facebook_icon from "../assets/Facebook_icon.png";
import Google_icon from "../assets/Google_icon.png";
import hand_only from "../assets/hand_only.png";
import Logo from "../assets/Logo.png";

const Login_Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const vantaRef = useRef(null);
  const vantaEffect = useRef(null);

  const sliderRef = useRef(null);
  const sliderEffect = useRef(null);

  useEffect(() => {
    if (!vantaEffect.current && vantaRef.current) {
      vantaEffect.current = NET({
        el: vantaRef.current,
        THREE,
        mouseControls: true,
        touchControls: true,
        minHeight: 200.0,
        minWidth: 200.0,
        scale: 1.0,
        scaleMobile: 1.0,
        color: 0x00ffff,
        backgroundColor: 0x1a1aff,
        points: 10.0,
        maxDistance: 20.0,
      });
    }

    return () => {
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
        vantaEffect.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!sliderEffect.current && sliderRef.current) {
      sliderEffect.current = GLOBE({
        el: sliderRef.current,
        THREE,
        mouseControls: true,
        touchControls: true,
        minHeight: 200.0,
        minWidth: 200.0,
        scale: 1.0,
        scaleMobile: 1.0,
        color: 0xffffff,
        backgroundColor: 0x0b0c10,
      });
    }

    return () => {
      if (sliderEffect.current) {
        sliderEffect.current.destroy();
        sliderEffect.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    const isDark = savedTheme === "dark";
    setIsDarkMode(isDark);
    if (isDark) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("theme", newMode ? "dark" : "light");
      if (newMode) {
        document.body.classList.add("dark-mode");
      } else {
        document.body.classList.remove("dark-mode");
      }
      return newMode;
    });
  };

  const handleSlide = (login) => {
    setIsLogin(login);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:5000/api/auth/login", { email, password });
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      await axios.post("http://localhost:5000/api/auth/signup", { name, email, password });
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
    }
  };

  const handleOAuthLogin = (provider) => {
    window.location.href = `http://localhost:5000/api/auth/${provider}`;
  };

  return (
    <>
      {/* Vanta Background Layer */}
      <div ref={vantaRef} className="fixed inset-0 w-screen h-screen -z-10"></div>

      {/* Main Content Above Vanta */}
      <div className="main-container relative z-10 min-h-screen overflow-hidden">
        <div className="container">
          <div className={`login ${isLogin ? "" : "hidden"}`}>
            <div className="logo_place">
              <img className="logo" src={Logo} alt="Logo" />
              <div className="togglebtn" onClick={toggleTheme}>
                <div className={`toggle-circular-switch ${isDarkMode ? "move-right" : ""}`}></div>
              </div>
            </div>
            <header className="login_header">
              <h1>Login</h1>
            </header>
            <div className="email-pass-field">
              <div className="email_in">
                <input
                  className="border-2 border-black rounded p-5 w-3/4 mt-4"
                  id="email_login"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <br />
              <div className="pass_in">
                <input
                  className="password border-2 border-black rounded p-2 w-3/4 mt-4"
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="with-error">
                  <div className="forget">
                    <h5>Forget Password?</h5>
                    <div className="remember">
                      <label htmlFor="block">Remember Me</label>
                      <input type="checkbox" id="block" className="hidden-checkbox" />
                      <span className="custom-checkbox"></span>
                    </div>
                  </div>
                  {error && <p id="error_login" className="text-red-500">{error}</p>}
                </div>
              </div>
              <div className="logbtndiv">
                <button
                  id="loginBtn"
                  className="bg-blue-600 text-white rounded px-6 py-2 mt-4 hover:bg-blue-800"
                  onClick={handleLogin}
                >
                  Login
                </button>
              </div>
            </div>

            <div className="using_other_sites">
              <div className="google" onClick={() => handleOAuthLogin("google")}>
                <img className="googleId" src={Google_icon} alt="google logo" />
                <h5>Continue with Google</h5>
              </div>
              <div className="facebook" onClick={() => handleOAuthLogin("facebook")}>
                <img className="facebookId" src={Facebook_icon} alt="facebook logo" />
                <h5>Continue with Facebook</h5>
              </div>
              <div className="apple" onClick={() => handleOAuthLogin("apple")}>
                <img className="appleId" src={White_Apple_logo} alt="apple logo" />
                <h5>Continue with Apple</h5>
              </div>
            </div>

            <div className="go_to_signup">
              <h4>Are you new here?</h4>
              <Link className="SignUpLink" onClick={() => handleSlide(false)}><h2>Sign Up</h2></Link>
            </div>
          </div>
        </div>

        {/* SLIDER WITH GLOBE VANTA */}
        <div ref={sliderRef} className={`slider ${isLogin ? "move-right" : "move-left"}`}>
          <div className="slide_logo">
            <img id="hand_logo" src={hand_only} alt="out_logo" />
            <br />
            <h1 id="Aarohan_logo">Aarohan</h1>
            <div id="line_rect"></div>
          </div>
          <div className="qoute">
            <h1 id="quote_slide">"Ascend the ladder of Knowledge"</h1>
          </div>
          <div id="welcome_Text">
            <h2>WELCOME TO TRACK</h2>
            <h2>YOUR CAREER...</h2>
          </div>
        </div>

        <div className="container">
          <div className={`signup ${isLogin ? "hidden" : ""}`}>
            <div className="logo_place">
              <img className="logo" src={Logo} alt="Logo" />
              <div className="togglebtn" onClick={toggleTheme}>
                <div className={`toggle-circular-switch ${isDarkMode ? "move-right" : ""}`}></div>
              </div>
            </div>
            <header className="login_header">
              <h1>Signup</h1>
            </header>
            <div className="email-pass-confirm-field-in-signup">
              <div className="name_in">
                <input
                  id="name"
                  type="text"
                  placeholder="Enter name here"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="email_in">
                <input
                  id="email_signup"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="pass_in_up">
                <input
                  className="password"
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="pass_in_up">
                <input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="signupbtndiv">
              <button id="signupBtn" onClick={handleSignup}>
                {loading ? <span className="loader"></span> : "Sign Up"}
              </button>
            </div>
            <div className="error-field">
              <div className="with-error-signup">
                {error && <p className="text-red-500">{error}</p>}
              </div>
            </div>
            <div className="using_other_sites-in-signup">
              <div className="google" onClick={() => handleOAuthLogin("google")}>
                <img className="googleId" src={Google_icon} alt="google logo" />
                <h5>Continue with Google</h5>
              </div>
              <div className="facebook" onClick={() => handleOAuthLogin("facebook")}>
                <img className="facebookId" src={Facebook_icon} alt="facebook logo" />
                <h5>Continue with Facebook</h5>
              </div>
              <div className="apple" onClick={() => handleOAuthLogin("apple")}>
                <img className="appleId" src={White_Apple_logo} alt="apple logo" />
                <h5>Continue with Apple</h5>
              </div>
            </div>
            <div className="go_to_login">
              <h4>Already Registered?</h4>
              <Link className="SignUpLink" onClick={() => handleSlide(true)}><h2>Login</h2></Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export { Login_Signup };
