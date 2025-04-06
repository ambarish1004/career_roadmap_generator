import React from "react";
import "../components/statsSection.css";

const stats = [
  {
    value: "80%",
    highlight: "of grads",
    description: "feel confused about their career path.",
  },
  {
    value: "60%",
    highlight: "of learners",
    description: "struggle to stay consistent without guidance.",
  },
  {
    value: "90%",
    highlight: "of professionals",
    description: "say mentorship accelerated their growth.",
  },
  {
    value: "100K+",
    highlight: "job listings",
    description: "analyzed for real-time career trends.",
  },
];

const StatsSection = () => {
  return (
    <section className="stats-section">
      <div className="stats-container">
        <h2 className="stats-title">Why This Platform Matters</h2>
        <p className="stats-subtitle">
          We're solving real problems with smart, community-powered learning.
        </p>
        <div className="stats-grid">
          {stats.map((stat, idx) => (
            <div key={idx} className="stat-card">
              <div className="stat-value">{stat.value}</div>
              <div className="stat-highlight">{stat.highlight}</div>
              <p className="stat-description">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
