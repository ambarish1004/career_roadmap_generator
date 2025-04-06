// src/components/TechStack.jsx
import React from "react";
import "../components/techStack.css";

const techPartners = [
  {
    name: "OpenAI",
    logo: "https://upload.wikimedia.org/wikipedia/commons/0/04/OpenAI_Logo.svg",
  },
  {
    name: "Firebase",
    logo: "https://upload.wikimedia.org/wikipedia/commons/3/37/Firebase_Logo.svg",
  },
  {
    name: "Vercel",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a1/Vercel-logo.svg",
  },
  {
    name: "Tailwind CSS",
    logo: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg",
  },
  {
    name: "React",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
  },
];

const TechStack = () => {
  return (
    <section className="tech-stack-section">
      <div className="tech-stack-container">
        <h2 className="tech-title">Backed by modern technologies</h2>
        <div className="logo-grid">
          {techPartners.map((tech, i) => (
            <div key={i} className="logo-card" title={tech.name}>
              <img src={tech.logo} alt={tech.name} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
