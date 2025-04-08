import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useNavigate } from "react-router-dom";
import FeaturesSection from "./FeaturesSection";
import MiniRoadmap from "./MiniRoadmap";
import StatSection from "./StatSection";
import TestimonialsSection from "./TestimonialsSection";
import CommunityHighlightSection from "./CommunityHighlightSection";
import "../components/landing.css";
import HowItWorksSection from "./HowItWorksSection";
import JobRoleSpotlight from "./JobRoleSpotlight";
import TechUsed from "./TechUsed";
import FinalCTA from "./FinalCTA";
import Footer from "./Footer";
import RevealWrapper from "./RevealWrapper";
import { motion } from "framer-motion";
import { Parallax } from "react-parallax";
import CustomCursor from "./CustomCursor";

const LandingPage = () => {
  const canvasRef = useRef();
  const navigate = useNavigate();
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    const particleCount = 1000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 20;
    }
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: 0x7f9cf5,
      size: 0.05,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    const animate = () => {
      requestAnimationFrame(animate);
      particles.rotation.y += 0.0008;
      particles.rotation.x += 0.0005;
      renderer.render(scene, camera);
    };
    animate();

    const onMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      particles.rotation.y = x * 0.5;
      particles.rotation.x = y * 0.5;
    };
    window.addEventListener("mousemove", onMouseMove);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      renderer.dispose();
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const top = window.scrollY;
      const height = document.body.scrollHeight - window.innerHeight;
      setScroll((top / height) * 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      {/* Scroll progress bar */}
      <div
        style={{ width: `${scroll}%` }}
        className="fixed top-0 left-0 h-1 bg-indigo-500 z-50 transition-all"
      />

      {/* Background Canvas - separate from content */}
      <canvas ref={canvasRef} className="landing-canvas" />

      <CustomCursor />

      <main className="landing-wrapper">
        {/* Hero Section */}
        <Parallax bgImage="/assets/roadmap-bg.jpg" strength={300}>
          <section className="hero-section py-32 text-white text-center">
            <section className="hero-section">
              <h1>
                Choose your path. <br />
                <span>Shape your future.</span>
              </h1>
              <p>
                Explore personalized career roadmaps, guided by professionals and
                powered by AI.
              </p>
              <div className="hero-buttons">
                <button onClick={() => navigate("/login")}>Login</button>
                <button onClick={() => navigate("/login")}>Sign Up</button>
              </div>
            </section>
          </section>
        </Parallax>

        {/* Scroll-based transform container */}
        <div
          className="scroll-container"
          style={{
            transform: `rotateX(${scroll * 0.1}deg) translateZ(${Math.sin(
              scroll * 0.05
            ) * 20}px)`,
            transition: "transform 0.2s ease-out",
          }}
        >
          <section className="roadmap-section">
            <h2>Interactive Roadmap (Coming Soon)</h2>
            <p>
              A 3D branching roadmap to visualize your journey will appear here.
              Stay tuned!
            </p>
            <div className="roadmap-placeholder">
              [ Placeholder for 3D Roadmap Visualization ]
            </div>
          </section>

          <RevealWrapper>
            <section className="features-section">
              <FeaturesSection />
            </section>

            <StatSection />

            <section className="roadmap-section">
              <MiniRoadmap />
            </section>

            <TestimonialsSection />
            <CommunityHighlightSection />
          </RevealWrapper>

          <HowItWorksSection />
          <JobRoleSpotlight />
          <TechUsed />
          <FinalCTA />
          <Footer />
        </div>
      </main>
    </motion.div>
  );
};

export default LandingPage;
