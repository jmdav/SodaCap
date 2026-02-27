import React from "react";
import styles from "./play.module.css";

export function Leaderboard({ username, capital }) {
  return (
    <div>
      <h2 className={styles.h2}>LEADERBOARD</h2>
      <table className={styles.leaderboard}>
        <tbody>
          <tr className={styles.leaderboardData}>
            <td>{username}</td>
            <td></td>
            <td>${capital}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
