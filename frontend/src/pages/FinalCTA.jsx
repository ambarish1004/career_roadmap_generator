// src/components/FinalCTA.jsx
import React from "react";
import "../components/finalCTA.css";

const FinalCTA = () => {
  return (
    <section className="final-cta-section">
      <div className="final-cta-container">
        <h2>Ready to Build Your Dream Career?</h2>
        <p>
          Join thousands already discovering their path with AI-powered roadmaps, 
          mentorship, and a supportive community.
        </p>
        <a href="/login" className="cta-btn">
          Join Now - It’s Free 🚀
        </a>
      </div>
    </section>
  );
};

export default FinalCTA;