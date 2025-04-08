import React from "react";
import "../components/terms.css";
import SimpleButton from "./SimpleButton"; // Adjust path if needed
import { useNavigate } from "react-router-dom";

const Terms = () => {
  const navigate = useNavigate();

  const handleAgree = () => {
    // You can navigate somewhere, trigger a modal, or store agreement
    navigate("/"); // Example: Go back to homepage
  };

  return (
    <div className="terms-container">
      <div className="animated-bg"></div>

      <div className="terms-content">
        <h1>Terms and Conditions</h1>

        <section>
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing and using Aarohan, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree, please discontinue use.
          </p>
        </section>

        <section>
          <h2>2. User Responsibilities</h2>
          <p>
            You agree to use Aarohan only for lawful purposes and in a way that does not infringe the rights of others or restrict their use of the platform.
          </p>
        </section>

        <section>
          <h2>3. Account Suspension</h2>
          <p>
            Aarohan reserves the right to suspend or terminate user accounts at its discretion if these terms are violated.
          </p>
        </section>

        <section>
          <h2>4. Modifications</h2>
          <p>
            We may update these terms occasionally. Continued use of the platform means you accept any changes made.
          </p>
        </section>

        <section>
          <h2>5. Contact</h2>
          <p>
            If you have questions regarding these terms, please contact us via the Contact page.
          </p>
        </section>

        <div className="button-container">
          <SimpleButton onClick={handleAgree}>I Agree</SimpleButton>
        </div>
      </div>
    </div>
  );
};

export default Terms;
