import React, { useEffect, useState } from "react";
import axios from "../services/axios";
import "../components/dashboard.css";
import "../index.css";
import Search_icon from "../assets/Search_icon.png";
import msg_logo from "../assets/msg_logo.png";
import notification_logo from "../assets/notification_logo.png";
import user_img from "../assets/user_img.jpg";
import Ai_logo from "../assets/Ai_logo.png";
import Community_logo from "../assets/Community_logo.png";
import explore_path_logo from "../assets/explore_path_logo.png";
import Home_logo from "../assets/Home.png";
import News_logo from "../assets/News_logo.png";
import Roadmap_logo from "../assets/Roadmap_logo.png";
import Schedule_logo from "../assets/Schedule_logo.png";
import Setting_logo from "../assets/Setting_logo.png";
import Logout_logo from "../assets/logout_logo.png";




const Dashboard = () => {
  const [roadmaps, setRoadmaps] = useState([]);

  useEffect(() => {
    const fetchRoadmaps = async () => {
      try {
        const { data } = await axios.get("/roadmaps", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setRoadmaps(data.roadmaps);
      } catch (err) {
        console.error("Error fetching roadmaps:", err);
      }
    };
    fetchRoadmaps();
  }, []);

  return (
    <div className="main-container">
      <div className="left-sidebar">
        <div className="left-sidebar-content">
          <div className="user-profile-left-sidebar">
            <div className="user-profile">
                  <div className="user-img">
                    <img id="user-img-imgtag" src={user_img}/>
                  </div>
              </div>
              <h2 id="user-name-left-sidebar">User Name</h2>
          </div>
          <div className="other-navbar-content">
            <div id="home">
              <img id="home-logo" src={Home_logo}/>
              <h1>Home</h1>
            </div>
            <div id="my-roadmaps">
              <img id="my-roadmaps-logo" src={Roadmap_logo}/>
              <h1>My Roadmaps</h1>
            </div>
            <div id="explore-career-paths">
              <img id="explore-career-paths-logo" src={explore_path_logo}/>
              <h1>Explore Career Paths</h1>
            </div>
            <div id="schedule-mentor-session">
              <img id="schedule-mentor-session-logo" src={Schedule_logo}/>
              <h1>Schedule Mentor Session</h1>
            </div>
            <div id="community-forum">
              <img id="community-forum-logo" src={Community_logo}/>
              <h1>Community Forum</h1>
            </div>
            <div id="line"></div>
            <div className="features">
              <h1>Features</h1>
            </div>
            <div id="chat-with-AI">
              <img id="chat-with-AI-logo" src={Ai_logo}/>
              <h1>Chat with AI</h1>
            </div>
            <div id="technical-news">
              <img id="technical-news-logo" src={News_logo}/>
              <h1>Technical News</h1>
            </div>
          </div>
          <div className="settings-logout">
            <div id="settings-opt">
              <img id="settings-opt-logo" src={Setting_logo}/>
              <h1>Settings</h1>
            </div>
            <div id="logout-opt">
              <img id="logout-opt-logo" src={Logout_logo}/>
              <h1>Logout</h1>
            </div>
          </div>
        </div>
      </div>
      <div className="main-content">
        <navbar>
          <div className="main-search-field-line">
            <div className="main-search-field">
              <label id="search-label" for="search">Search for anything</label>
              <input 
                type="search" 
                // placeholder="   Search for anything..." 
                aria-label="Search"
                className="search-input"
              />
              <img id="search-icon" src={Search_icon}/>
            </div>
            <div className="user-msg-notification">
              <div className="msg-logo">
                <img src={msg_logo}/>
              </div>
              <div className="notification-logo">
                <img src={notification_logo}/>
              </div>
              <div className="user-profile">
                <div className="user-img">
                  <img id="user-img-imgtag" src={user_img}/>
                </div>
              </div>
            </div>
          </div>
          <div className="dashboard-name">
            <h1 id="Aarohan-name">Aarohan</h1>
            <h1 id="Aarohan-quote"><i>"Ascend the ladder of knowledge"</i></h1>
          </div>
        </navbar>
        <div className="dashboard-content">
          <div className="main-dashboard-conent">
            <div className="overview"></div>
            <div className="mentoring"></div>
          </div>
          <div className="right-sidebar">
            <div className="upper-right-sidebar"></div>
            <div className="bottom-right-sidebar"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
