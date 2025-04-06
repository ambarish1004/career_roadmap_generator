// src/components/JobSpotlight.jsx
import React from "react";
import "../components/jobSpotlight.css";

const jobs = [
  {
    title: "Frontend Developer",
    salary: "$80k - $120k",
    skills: ["React", "CSS", "JavaScript"],
    hiringRate: "High Demand",
  },
  {
    title: "Data Analyst",
    salary: "$70k - $110k",
    skills: ["Python", "SQL", "Power BI"],
    hiringRate: "Growing Fast",
  },
  {
    title: "AI/ML Engineer",
    salary: "$100k - $150k",
    skills: ["Python", "TensorFlow", "NLP"],
    hiringRate: "Very High",
  },
  {
    title: "Product Manager",
    salary: "$90k - $140k",
    skills: ["Leadership", "UX", "Agile"],
    hiringRate: "Consistent",
  },
];

const JobSpotlight = () => {
  return (
    <section className="job-spotlight-section">
      <div className="job-container">
        <h2 className="job-title">💼 Job Role Spotlight</h2>
        <p className="job-desc">Explore in-demand roles and what it takes to get there.</p>

        <div className="job-grid">
          {jobs.map((job, idx) => (
            <div key={idx} className="job-card glass-card p-6 hover:shadow-xl">
              <h3 className="text-white text-lg font-semibold">{job.title}</h3>
              <p className="salary text-sm text-white/70">{job.salary}</p>
              <div className="skills">
                {job.skills.map((skill, i) => (
                  <span key={i} className="skill-chip">{skill}</span>
                ))}
              </div>
              <p className="hiring-rate">📈 {job.hiringRate}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default JobSpotlight;
