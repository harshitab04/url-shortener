import { useCallback } from "react";
import Particles from "@tsparticles/react";
import { loadAll } from "@tsparticles/all";

export default function ParticleBackground({ darkMode }) {
  const particlesInit = useCallback(async (engine) => {
    await loadAll(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      className="absolute inset-0 -z-10"
      init={particlesInit}
      options={{
        fpsLimit: 60,
        particles: {
          number: { value: 50 },
          color: { value: darkMode ? "#ef4444" : "#60a5fa" },
          size: { value: { min: 1, max: 5 } },
          links: {
            enable: true,
            color: darkMode ? "#fca5a5" : "#93c5fd",
            distance: 120,
            opacity: 0.4,
            width: 1,
          },
          move: { enable: true, speed: 1 },
        },
        interactivity: {
          events: {
            onHover: { enable: true, mode: "repulse" },
            onClick: { enable: true, mode: "push" },
          },
          modes: {
            repulse: { distance: 150 },
            push: { quantity: 4 },
          },
        },
      }}
    />
  );
}
