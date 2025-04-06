// src/components/NewsletterSignup.jsx
import React from "react";
import "../components/newsletter.css"; // Optional, for custom styles

const NewsletterSignup = () => {
  return (
    <section className="newsletter-section">
      <div className="container">
        <h2 className="newsletter-title">Stay in the Loop</h2>
        <p className="newsletter-desc">
          Get free roadmap drops, expert career tips, and invites to exclusive events — straight to your inbox.
        </p>

        <form className="newsletter-form">
          <input
            type="email"
            placeholder="Enter your email"
            required
            className="email-input"
          />
          <button type="submit" className="subscribe-btn">
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
};

export default NewsletterSignup;
