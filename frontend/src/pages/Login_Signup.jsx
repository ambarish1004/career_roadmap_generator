import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../components/darkStyle.css";
// import "../components/style.css"; // Import the regular CSS file
import axios from "../services/axios";
import "../index.css";
import Aarohan_name from "../assets/Aarohan_name.png";
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
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => {
        const newMode = !prevMode;
        localStorage.setItem("theme", newMode ? "dark" : "light");

        // Add or remove class from <body>
        document.body.classList.toggle("dark-mode", newMode);

        return newMode;
    });
};

useEffect(() => {
    // Load theme from localStorage on page load
    const savedTheme = localStorage.getItem("theme") || "light";
    const isDark = savedTheme === "dark";

    setIsDarkMode(isDark);
    document.body.classList.toggle("dark-mode", isDark);
}, []);
  const handleSlide = (login) => {
    setIsLogin(login);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:5000/api/auth/login", { email, password });
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user)); // Store user details
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
    }
  };

  const handleOAuthLogin = (provider) => {
    window.location.href = `http://localhost:5000/api/auth/${provider}`;
  };

  const [name, setName] = useState("");

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
//  {isDarkMode ? "Light Mode" : "Dark Mode"}
  return (
    <div className="main-container">
      <div className="container">
      <div className={`login ${isLogin ? "" : "hidden"}`}>
        <div className="logo_place">
          <img className="logo" src={Logo} alt="Logo" />
          <div className="tobbglebtn" onClick={toggleTheme}>
            <div className={`toggle-circular-switch ${isDarkMode ? "move-right" : ""}`}></div>
          </div>
        </div>
        <header className="login_header">
          <h1>Login</h1>
        </header>
        <div className="email-pass-field">
          <div className="email_in">
            <h4 id="labelEmail" htmlFor="email_login">Email:</h4>
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
            <h4 id="labelPassword" htmlFor="password">Password:</h4>
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
                    <label htmlFor="block">Remember Me</label>
                    <input type="checkbox" id="block" className="hidden-checkbox"></input>
                    <span className="custom-checkbox"></span>
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

        <div className="using_other_sites">
          <div className="google" onClick={() => handleOAuthLogin("google")}>
            <img id="googleId" src={Google_icon} alt="google logo"/>
            <h5>Continue with Google</h5>
          </div>
          <div className="facebook" onClick={() => handleOAuthLogin("facebook")}>
            <img id="facebookId" src={Facebook_icon} alt="facebook logo"/>
            <h5>Continue with Facebook</h5>
          </div>
          <div className="apple" onClick={() => handleOAuthLogin("apple")}>
            <img id="appleId" src={Apple_logo} alt="apple logo"/>
            <h5>Continue with Apple</h5>
          </div>
        </div>


          <div className="go_to_signup">
            <h4>
              Are you new here?
            </h4>
            <Link id="SignUpLink" onClick={() => handleSlide(false)}>Sign Up</Link>
          </div>
        </div>
      </div>





      {/* slidder part */}
      <div className={`slider ${isLogin ? "move-right" : "move-left"}`}>
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

      {/* Signup part */}


      <div className="container">
        <div className={`signup ${isLogin ? "hidden" : ""}`}>
          <div className="logo_place">
            <img className="logo" src={Logo} alt="Logo" />
            <div className="tobbglebtn" onClick={toggleTheme}>
              <div className={`toggle-circular-switch ${isDarkMode ? "move-right" : ""}`}></div>
            </div>
          </div>
          <header className="login_header">
            <h1>Signup</h1>
          </header>
          <div className="email-pass-confirm-field">
            <div className="name_in">
              <h4 htmlFor="name">Name:</h4>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="email_in">
                <h4 htmlFor="email_signup">Email:</h4>
                <input id="email_signup" type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div className="pass_in_up">
                <h4 htmlFor="password">Password:</h4>
                <input id="password" type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <div className="pass_in_up">
                <h4 htmlFor="password">Confirm Password:</h4>
                <input id="confirmPassword" type="password" name="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
              </div>
          </div>
          <div className="signupbtndiv">
              <button id="signupBtn" onClick={handleSignup}>
                SignUp
              </button>
              <div className="line"></div>
          </div>
          <div className="error-field">
            <div className="with-error-signup">
              {error && <p className="text-red-500">{error}</p>}</div>
            </div>
            <div className="using_other_sites-in-signup">
              <div className="google" onClick={() => handleOAuthLogin("google")}>
                <img id="googleId" src={Google_icon} alt="google logo"/>
                <h5>Continue with Google</h5>
              </div>
              <div className="facebook" onClick={() => handleOAuthLogin("facebook")}>
                <img id="facebookId" src={Facebook_icon} alt="facebook logo"/>
                <h5>Continue with Facebook</h5>
              </div>
              <div className="apple" onClick={() => handleOAuthLogin("apple")}>
                <img id="appleId" src={Apple_logo} alt="apple logo"/>
                <h5>Continue with Apple</h5>
              </div>
            </div>
            <div className="go_to_login">
              <h4>
                Already Registered?
              </h4>
              <Link id="SignUpLink" onClick={() => handleSlide(true)}>Login</Link>
            </div>
        </div>
      </div>
    </div>
  );
};

export { Login_Signup};