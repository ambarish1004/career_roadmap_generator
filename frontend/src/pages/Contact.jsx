import React from "react";
import { useNavigate } from "react-router-dom";
import FluidCanvas from "./FluidCanvas";
import SimpleButton from "./SimpleButton";
import "../components/contact.css"; // Reusing styles

const Contact = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent! (This is just a placeholder)");
  };

  return (
    <div className="contact-wrapper">
      <div className="animated-bg" /> {/* 🔥 Re-added animated background */}
      <FluidCanvas />

      <div className="about-content">
        <h1>Contact Us</h1>
        <p>We’d love to hear from you. Drop us a message!</p>

        <form className="about-card contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input type="text" placeholder="Your Name" required />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="you@example.com" required />
          </div>

          <div className="form-group">
            <label>Message</label>
            <textarea rows="5" placeholder="Type your message here..." required />
          </div>

          <button type="submit" className="simple-button">Send Message</button>
        </form>

        <SimpleButton onClick={() => navigate("/")}>Back To Home</SimpleButton>
      </div>
    </div>
  );
};

export default Contact;
