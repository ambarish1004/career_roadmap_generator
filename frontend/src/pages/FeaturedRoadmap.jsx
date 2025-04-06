// src/components/FeaturedRoadmap.jsx
import React from "react";
import { Code, Layout, MonitorSmartphone, Sparkles } from "lucide-react";
import "../components/featuredRoadmap.css"; // Optional external styling

const roadmapNodes = [
  { title: "HTML & CSS", icon: <Layout size={24} /> },
  { title: "JavaScript", icon: <Code size={24} /> },
  { title: "React.js", icon: <MonitorSmartphone size={24} /> },
  { title: "UI/UX Basics", icon: <Sparkles size={24} /> },
];

const FeaturedRoadmap = () => {
  return (
    <section className="featured-roadmap-section">
      <div className="container">
        <h2 className="section-title">Featured Roadmap: Frontend Developer</h2>
        <p className="section-desc">
          Explore the essential skills to become a frontend developer. Master tools and technologies used by top companies.
        </p>

        <div className="roadmap-preview">
          {roadmapNodes.map((node, index) => (
            <div key={index} className="roadmap-node">
              <div className="icon">{node.icon}</div>
              <div className="label">{node.title}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedRoadmap;
