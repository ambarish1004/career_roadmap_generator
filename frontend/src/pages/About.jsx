import React from "react";
import { useNavigate } from "react-router-dom";
import FluidCanvas from "./FluidCanvas";
import "../components/about.css";
import SimpleButton from "./SimpleButton";

const About = () => {
  const navigate = useNavigate();
  const [scrollPercent, setScrollPercent] = React.useState(0);

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const height = document.body.scrollHeight - window.innerHeight;
      const scrolled = (scrollTop / height) * 100;
      setScrollPercent(scrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const strokeLength = 3000;
  const dashOffset = strokeLength - (strokeLength * scrollPercent) / 100;

  return (
    <div className="about-wrapper">
      <FluidCanvas />

      {/* Curved SVG path with a loop and white tint */}
      <svg className="scroll-path" viewBox="0 0 1000 3000" preserveAspectRatio="none">
      {/* Primary Path - Left to Right with a loop */}
      <path
        d="
          M 0 0 
          C 150 100, 150 300, 0 400 
          C -100 500, 300 600, 600 900 
          S 800 1500, 1000 3000
        "
        stroke="#ffffffaa"
        strokeWidth="4"
        fill="none"
        strokeDasharray={strokeLength}
        strokeDashoffset={dashOffset}
      />

      {/* Secondary Path - Right to Left curve */}
      <path
        d="
          M 1000 0 
          C 800 200, 700 400, 900 800
          S 600 1600, 0 2800
        "
        stroke="#89cff0aa"  // soft bluish white
        strokeWidth="3"
        fill="none"
        strokeDasharray={strokeLength}
        strokeDashoffset={dashOffset}
      />

      {/* Tertiary Path - Z-shaped midline accent */}
      <path
        d="
          M 200 200 
          C 400 400, 600 100, 800 400
          C 600 700, 400 900, 200 1200
          S 500 2200, 900 2800
        "
        stroke="#ffffff33"  // faint ghost line
        strokeWidth="2"
        fill="none"
        strokeDasharray={strokeLength}
        strokeDashoffset={dashOffset}
      />
    </svg>


      <div className="about-content">
        <h1>About Aarohan</h1>
        <div className="about-board">

          <div className="about-card">
            <h2>Guided Career Paths</h2>
            <p>
              Aarohan simplifies your career journey with clear, structured roadmaps created by professionals. Learn what skills to gain, how to move forward, and what roles fit your current skill set — all while tracking your growth along the way.
            </p>
          </div>

          <div className="about-card">
            <h2>Visualize & Track Progress</h2>
            <p>
              See your milestones, skills, and opportunities laid out like a real roadmap. Discover salary expectations, job titles, and what’s next — based on your current stage.
            </p>
          </div>

          <div className="about-card">
            <h2>Community-Powered Wisdom</h2>
            <p>
              Our platform thrives on shared experience. Users can create and publish their own roadmaps, giving others diverse and practical insights from real career journeys.
            </p>
          </div>

          <div className="about-card">
            <h2>AI-Driven Personalization</h2>
            <p>
              Coming soon: Smart, AI-generated roadmaps tailored to your interests, learning habits, and career aspirations. Get guidance that adapts as you grow.
            </p>
          </div>

          <div className="about-card">
            <h2>Forums & Collaboration</h2>
            <p>
              Join community groups where top contributors and professionals share ideas, tech news, mentorship, and guidance — making Aarohan more than just a tool. It’s your support system.
            </p>
          </div>
        </div>

        <SimpleButton onClick={() => navigate("/")}>Back To Home</SimpleButton>
      </div>
    </div>
  );
};

export default About;
