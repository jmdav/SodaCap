import React, { useEffect, useMemo, useState, useCallback } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { useLocation } from "react-router-dom";
import styles from "./app.module.css";
import {
  BrowserRouter,
  NavLink,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { Login } from "./login/login";
import { Play } from "./play/play";
import { Tutorial } from "./tutorial/tutorial";
import { AuthState } from "./login/authState";

function NotFound() {
  return <main>404: Return to sender. Address unknown.</main>;
}

function Header({ authState }) {
  const location = useLocation();
  let headerClass = styles.headerMain;
  if (location.pathname === "/play") {
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
          <NavLink className={styles.navLink} to="">
            Home
          </NavLink>
          {authState === AuthState.Authenticated && (
            <NavLink className={styles.navLink} to="play">
              Play
            </NavLink>
          )}
          <NavLink className={styles.navLink} to="tutorial">
            About
          </NavLink>
        </menu>
      </nav>
    </header>
  );
}

export default function App() {
  const [init, setInit] = useState(false);
  const [particlesContainer, setParticlesContainer] = useState(null);
  const [username, setUsername] = React.useState(
    localStorage.getItem("username") || "",
  );
  const currentAuthState = username
    ? AuthState.Authenticated
    : AuthState.Unauthenticated;
  const [authState, setAuthState] = React.useState(currentAuthState);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
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
          opacity: {
            min: 0.01,
            max: 0.08,
          },
        },
        number: {
          value: 40,
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
          enable: true,
          speed: {
            min: 3,
            max: 9,
          },
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
          <Header authState={authState} />
          <Routes>
            <Route
              path="/"
              element={
                <Login
                  username={username}
                  authState={authState}
                  onAuthChange={(username, authState) => {
                    setAuthState(authState);
                    setUsername(username);
                  }}
                />
              }
              exact
            />
            <Route
              path="/play"
              element={
                authState === AuthState.Authenticated ? (
                  <Play username={username} />
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
            <Route path="/tutorial" element={<Tutorial />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <footer className="footer">
          <span className="text-reset">Game by James Davies</span>
          <a href="https://github.com/jmdav/soda">GitHub</a>
        </footer>
      </div>
    </BrowserRouter>
  );
}
