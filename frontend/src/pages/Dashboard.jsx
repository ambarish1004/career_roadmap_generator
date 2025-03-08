import React, { useEffect, useState } from "react";
import axios from "../services/axios";
import "../components/dashboard.css";
import "../index.css";
import Search_icon from "../assets/Search_icon.png";
import msg_logo from "../assets/msg_logo.png";
import notification_logo from "../assets/notification_logo.png";
import user_img from "../assets/user_img.jpg";



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
      <div className="left-sidebar"></div>
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
