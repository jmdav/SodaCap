import React from "react";
import styles from "./play.module.css";

export function Leaderboard() {
  return (
    <div>
      <h2 className={styles.h2}>LEADERBOARD</h2>
      <table className={styles.leaderboard}>
        <tbody>
          <tr className={styles.leaderboardData}>
            <td>PLAYER1</td>
            <td>(2 wins)</td>
            <td>$500.00</td>
          </tr>
          <tr className={styles.leaderboardData}>
            <td>PLAYER2</td>
            <td>(10 wins)</td>
            <td>$200.00</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
