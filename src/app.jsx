import React, { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import "./app.css";

export default function App() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const options = useMemo(
    () => ({
      particles: {
        number: {
          value: 48,
          density: {
            enable: true,
            value_area: 800,
          },
        },
        color: {
          value: "#acacac",
        },
        shape: {
          type: "circle",
          stroke: {
            width: 4,
            color: "#ededed",
          },
        },
        opacity: {
          value: 0.5,
        },
        size: {
          value: 15.99,
          random: true,
        },
        move: {
          enable: true,
          speed: 6,
          direction: "top",
          random: true,
          straight: false,
          out_mode: "out",
        },
      },
      interactivity: {
        detect_on: "canvas",
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
