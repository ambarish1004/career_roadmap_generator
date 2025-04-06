import React from "react";
import "../components/community.css";

const mentor = {
  name: "Neha Kapoor",
  title: "Data Scientist at Google",
  image: "https://i.pravatar.cc/150?img=47",
  highlight: "Mentor of the Month",
  quote:
    "Helping learners find their spark in tech has been incredibly rewarding!",
};

const CommunityHighlightSection = () => {
  return (
    <section className="community-section">
      <div className="community-container">
        <h2 className="community-title">Meet Our Community</h2>
        <p className="community-subtitle">
          Learners, mentors & groups that make it all happen.
        </p>

        <div className="mentor-highlight-card">
          <div className="mentor-image-container">
            <img
              src={mentor.image}
              alt={mentor.name}
              className="mentor-image"
            />
            <span className="mentor-badge">{mentor.highlight}</span>
          </div>
          <div className="mentor-info">
            <h3 className="mentor-name">{mentor.name}</h3>
            <p className="mentor-title">{mentor.title}</p>
            <p className="mentor-quote">“{mentor.quote}”</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunityHighlightSection;
