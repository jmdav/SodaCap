import React from "react";
import styles from "./play.module.css";

export function TopBar({ username, gameTime }) {
  return (
    <div className={styles.topBar}>
      <div className={styles.usernameDisplay}>
        <h5>
          Logged in as <span className={styles.username}>{username}</span>
        </h5>
      </div>

      <div className={styles.timer}>
        TIME REMAINING:
        <span id="game-timer"> {gameTime}</span>
      </div>
    </div>
  );
}
