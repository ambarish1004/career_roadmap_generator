import React from "react";
import "../components/testimonials.css";

const testimonials = [
  {
    name: "Aarav S.",
    role: "Final-Year Student",
    avatar: "https://i.pravatar.cc/150?img=11",
    quote: "This platform gave me clarity when I had none. The roadmap is super easy to follow!",
  },
  {
    name: "Ritika M.",
    role: "Frontend Developer Intern",
    avatar: "https://i.pravatar.cc/150?img=45",
    quote: "I landed my internship thanks to the AI guidance and community support!",
  },
  {
    name: "Manav T.",
    role: "Career Switcher",
    avatar: "https://i.pravatar.cc/150?img=22",
    quote: "Coming from a non-tech background, this roadmap gave me confidence to start fresh.",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="testimonials-section">
      <div className="testimonials-container">
        <h2 className="testimonials-title">What Our Users Say</h2>
        <p className="testimonials-subtitle">
          Real stories from learners who found their path.
        </p>

        <div className="testimonials-grid">
          {testimonials.map((t, idx) => (
            <div className="testimonial-card" key={idx}>
              <img src={t.avatar} alt={t.name} className="testimonial-avatar" />
              <p className="testimonial-quote">“{t.quote}”</p>
              <div className="testimonial-name">{t.name}</div>
              <div className="testimonial-role">{t.role}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
