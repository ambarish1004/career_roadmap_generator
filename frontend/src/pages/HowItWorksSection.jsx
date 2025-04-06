import React from "react";
import "../components/howitworks.css";
import { Compass, Map, Rocket } from "lucide-react";

const steps = [
  {
    icon: <Compass size={40} color="#7f9cf5" />,
    title: "Choose Your Goal",
    description: "Pick a career path or skill you want to master.",
  },
  {
    icon: <Map size={40} color="#7f9cf5" />,
    title: "Explore the Roadmap",
    description: "View your AI-generated step-by-step learning plan.",
  },
  {
    icon: <Rocket size={40} color="#7f9cf5" />,
    title: "Start Learning",
    description: "Access curated resources and track your progress.",
  },
];

const HowItWorksSection = () => {
  return (
    <section className="howitworks-section">
      <div className="howitworks-container">
        <h2 className="howitworks-title">How It Works</h2>
        <p className="howitworks-subtitle">
          Start your journey in just 3 simple steps
        </p>

        <div className="howitworks-steps">
          {steps.map((step, index) => (
            <div className="howitworks-card" key={index}>
              <div className="step-number">{index + 1}</div>
              <div className="step-icon">{step.icon}</div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-desc">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
