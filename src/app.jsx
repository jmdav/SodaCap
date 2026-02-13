import React, { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadAll } from "@tsparticles/all";
import "./app.css";

export default function App() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadAll(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const options = useMemo(
    () => ({
      fullScreen: {
        enable: true,
        zIndex: -1,
      },
      particles: {
        stroke: {
          width: 4,
          color: "#000000",
          opacity: 0.1,
        },
        number: {
          value: 60,
          density: {
            enable: true,
            area: 900,
          },
        },
        color: {
          value: "#ffffff",
        },
        shape: {
          type: "circle",
          fill: false,
        },

        opacity: {
          value: 1,
        },
        size: {
          value: {
            min: 5,
            max: 50,
          },
          random: true,
        },
        move: {
          gravity: -0.3,
          enable: true,
          speed: {
            min: 3,
            max: 10,
          },
          angle: 50,
          random: true,
          straight: false,
          direction: "top",
          outModes: {
            default: "out",
          },
        },
      },

      interactivity: {
        detect_on: "window",
        events: {
          onhover: {
            enable: false,
          },
          onclick: {
            enable: false,
          },
        },
      },
      retina_detect: true,
    }),
    [],
  );

  return (
    <div className="body preload" id="particles-js">
      {init && <Particles id="tsparticles" options={options} />}
      <div className="content">
        <header>
          <img
            className="logo"
            src="/sodacap.png"
            width="400px"
            alt="SodaCap"
          />
          <nav>
            <menu className="main-nav">
              <a href="index.html">Home</a>
              <a href="play.html">Play</a>
              <a href="tutorial.html">About</a>
            </menu>
          </nav>
        </header>

        <main>
          <form method="get" action="play.html">
            <div>
              <input type="text" placeholder="username" />
            </div>
            <div>
              <input type="password" placeholder="password" />
            </div>
            <div className="login-buttons">
              <button type="submit" className="btn">
                Login
              </button>
              <button type="submit" className="btn">
                Create
              </button>
            </div>
          </form>
        </main>
      </div>
      <footer>
        <span className="text-reset">Game by James Davies</span>
        <a href="https://github.com/jmdav/soda">GitHub</a>
        <a href="https://vincentgarreau.com/particles.js/">particles-js</a>
      </footer>
    </div>
  );
}
