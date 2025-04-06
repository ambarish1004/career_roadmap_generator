import FluidCanvas from "./FluidCanvas";
import "../components/about.css";
import SimpleButton from "./SimpleButton";

const About = () => {
  return (
    <div className="about-wrapper">
      <FluidCanvas />

      <div className="about-content">
        <h1>About Aarohan</h1>
        <p>
          Aarohan is a modern platform guiding individuals through personalized
          career journeys — built with intelligence, clarity, and care.
        </p>
        <p>
          Dive into structured roadmaps, curated insights, and actionable next
          steps to build your future with confidence.
        </p>
        <SimpleButton>Explore Roadmap</SimpleButton>
      </div>
    </div>
  );
};

export default About;
