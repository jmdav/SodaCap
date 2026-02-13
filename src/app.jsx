import React, { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadAll } from "@tsparticles/all";
import { useLocation } from 'react-router-dom';
import styles from "./app.module.css";


import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Play } from './play/play';
import { Tutorial } from './tutorial/tutorial';

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
    <BrowserRouter>
      <div className="body" id="particles-js">
        {init && <Particles id="tsparticles" options={options} />}
        <div className="content">
          <Header />
          <Routes>
            <Route path='/' element={<Login />} exact />
            <Route path='/play' element={<Play />} />
            <Route path='/tutorial' element={<Tutorial />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </div>
        <footer className="footer">
          <span className="text-reset">Game by James Davies</span>
          <a href="https://github.com/jmdav/soda">GitHub</a>
        </footer>

      </div>
    </BrowserRouter>
  );

  function NotFound() {
    return <main className="container-fluid bg-secondary text-center">404: Return to sender. Address unknown.</main>;
  }

  function Header() {
    const location = useLocation();
    var headerClass;
    if (location.pathname === '/' || location.pathname === "/tutorial") {
      headerClass = styles.headerMain;
    }
    if (location.pathname === '/play') {
      headerClass = styles.headerPlay;
    }
    return (
      <header className={headerClass}>
        <img
          className={styles.logo}
          src="/sodacap.png"
          width="400px"
          alt="SodaCap"
        />
        <nav className={styles.nav}>
          <menu className={styles.mainNav}>
            <NavLink className={styles.navLink} to="">Home</NavLink>
            <NavLink className={styles.navLink} to="play">Play</NavLink>
            <NavLink className={styles.navLink} to="tutorial">About</NavLink>
          </menu>
        </nav>
      </header>
    );
  }

}
