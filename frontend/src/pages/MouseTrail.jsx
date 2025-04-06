import React, { useRef, useEffect, useState } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const MAX_PARTICLES = 100;

const ParticleBurst = () => {
  const { viewport, size } = useThree();
  const group = useRef();
  const particles = useRef([]);
  const clock = useRef(new THREE.Clock());

  const [mouse, setMouse] = useState(new THREE.Vector3());

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / size.width) * 2 - 1;
      const y = -(e.clientY / size.height) * 2 + 1;
      const pos = new THREE.Vector3(
        x * viewport.width / 2,
        y * viewport.height / 2,
        0
      );
      setMouse(pos);

      // Create a burst of particles
      for (let i = 0; i < 10; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.1 + Math.random() * 0.1;
        const velocity = new THREE.Vector3(
          Math.cos(angle) * speed,
          Math.sin(angle) * speed,
          0
        );
        particles.current.push({
          position: pos.clone(),
          velocity,
          life: 1,
        });
      }

      // Limit total particles
      if (particles.current.length > MAX_PARTICLES) {
        particles.current.splice(0, particles.current.length - MAX_PARTICLES);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [viewport, size]);

  useFrame(() => {
    const delta = clock.current.getDelta();

    if (!group.current) return;

    particles.current.forEach((p) => {
      p.position.add(p.velocity);
      p.life -= delta * 1.5;
    });

    particles.current = particles.current.filter((p) => p.life > 0);

    group.current.children.forEach((mesh, i) => {
      const p = particles.current[i];
      if (p) {
        mesh.visible = true;
        mesh.position.copy(p.position);
        mesh.material.opacity = p.life;
      } else {
        mesh.visible = false;
      }
    });
  });

  return (
    <group ref={group}>
      {Array.from({ length: MAX_PARTICLES }).map((_, i) => (
        <mesh key={i}>
          <sphereGeometry args={[0.01, 8, 8]} />
          <meshStandardMaterial
            color="white"
            emissive="white"
            emissiveIntensity={1.5}
            transparent
            opacity={0}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
};

export default ParticleBurst;
