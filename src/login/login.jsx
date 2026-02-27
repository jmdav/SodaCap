import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../main.module.css";

export function Login({ startGame }) {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleStart = (event) => {
    event.preventDefault();
    startGame(username);
    navigate("/play");
  };

  return (
    <main className={styles.main}>
      <form>
        <div>
          <input
            type="text"
            placeholder="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div>
          <input type="password" placeholder="password" />
        </div>
        <div className="login-buttons">
          <button type="button" className="btn" onClick={handleStart}>
            Login
          </button>
          <button type="button" className="btn" onClick={handleStart}>
            Create
          </button>
        </div>
      </form>
    </main>
  );
}