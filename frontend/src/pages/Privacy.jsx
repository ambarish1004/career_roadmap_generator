import React from "react";
import "../components/privacy.css";
import SimpleButton from "./SimpleButton";
import { useNavigate } from "react-router-dom";

const Privacy = () => {
  const navigate = useNavigate();

  const handleAcknowledge = () => {
    navigate("/"); // Change route as needed
  };

  return (
    <div className="privacy-container">
      <div className="animated-bg"></div>

      <div className="privacy-content">
        <h1>Privacy Policy</h1>

        <section>
          <p>
            Your data privacy is important to us. Aarohan collects limited user data to personalize your experience and will never sell your information.
          </p>
          <p>
            We use cookies to enhance usability and track platform usage, in accordance with modern best practices.
          </p>
          <p>
            Our platform uses secure protocols (HTTPS) and encryption to safeguard your data during transmission and storage.
          </p>
          <p>
            We only collect information essential for improving your career roadmap, such as skill preferences, usage analytics, and basic account information.
          </p>
          <p>
            Aarohan may use third-party tools (like analytics or authentication services) that comply with GDPR and other data protection regulations.
          </p>
          <p>
            You have the right to request access, update, or deletion of your personal data at any time by contacting our support team.
          </p>
        </section>

        <div className="button-container">
          <SimpleButton onClick={handleAcknowledge}>Got It</SimpleButton>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
