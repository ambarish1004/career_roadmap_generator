import React from "react";
import {
  Briefcase,
  Compass,
  Users,
  BarChart,
  Brain,
  Target,
} from "lucide-react";
import "../components/features.css";

const features = [
  {
    icon: <Compass className="icon" />,
    title: "Personalized Roadmaps",
    description: "Get step-by-step learning paths tailored to your goals.",
  },
  {
    icon: <Brain className="icon" />,
    title: "AI Career Guidance",
    description: "Smart suggestions based on your skills and interests.",
  },
  {
    icon: <Users className="icon" />,
    title: "Community Groups",
    description: "Learn together with peers, mentors, and role models.",
  },
  {
    icon: <BarChart className="icon" />,
    title: "Skill Tracking",
    description: "Track your progress and master new skills over time.",
  },
  {
    icon: <Briefcase className="icon" />,
    title: "Job Insights",
    description: "Understand roles, salaries, and job demand in real-time.",
  },
  {
    icon: <Target className="icon" />,
    title: "Goal-Based Learning",
    description: "Set goals and let the roadmap guide your journey.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="features-container">
      <div className="features-content">
        <h2 className="features-heading">What You’ll Get</h2>
        <p className="features-subtext">
          Tools, guidance, and a powerful community — everything you need to grow.
        </p>

        <div className="features-grid">
          {features.map((feature, index) => (
            <div className="feature-card" key={index}>
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
