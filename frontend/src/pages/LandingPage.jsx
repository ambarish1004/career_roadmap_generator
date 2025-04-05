import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { useNavigate } from "react-router-dom";
import FeaturesSection from "./FeaturesSection";
import "../components/landing.css";

const LandingPage = () => {
  const canvasRef = useRef();
  const navigate = useNavigate();

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

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      renderer.dispose();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="landing-wrapper">
      {/* Background Canvas */}
      <canvas ref={canvasRef} className="landing-canvas" />

      {/* Hero Section */}
      <section className="hero-section">
        <h1>
          Choose your path. <br />
          <span>Shape your future.</span>
        </h1>
        <p>
          Explore personalized career roadmaps, guided by professionals and powered by AI.
        </p>
        <div className="hero-buttons">
          <button onClick={() => navigate("/login")}>Login</button>
          <button onClick={() => navigate("/signup")}>Sign Up</button>
        </div>
      </section>

      {/* 3D Roadmap Placeholder */}
      <section className="roadmap-section">
        <h2>Interactive Roadmap (Coming Soon)</h2>
        <p>
          A 3D branching roadmap to visualize your journey will appear here. Stay tuned!
        </p>
        <div className="roadmap-placeholder">
          [ Placeholder for 3D Roadmap Visualization ]
        </div>
      </section>

      {/* Features */}
      <section className="features-section">
        <FeaturesSection />
      </section>
    </div>
  );
};

export default LandingPage;
