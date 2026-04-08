import React from "react";
import styles from "./play.module.css";

export function Leaderboard({ username, capital, scores: externalScores }) {
  const [scores, setScores] = React.useState(externalScores || []);

  React.useEffect(() => {
    if (externalScores) {
      setScores(externalScores);
      return;
    }
    async function fetchScores() {
      try {
        const res = await fetch("/api/scores");
        if (res.ok) setScores(await res.json());
      } catch { }
    }
    fetchScores();
  }, [externalScores]);

  return (
    <div className={styles.leaderboardWrapper}>
      <h2 className={styles.h2}>LEADERBOARD</h2>
      <table className={styles.leaderboard}>
        <tbody>
          {scores.map((s, i) => {
            const isCurrentPlayer = s.username === username;
            console.log(username + " " + s.username + " " + isCurrentPlayer);
            return (
              <tr
                key={i}
                className={`${styles.leaderboardData} ${isCurrentPlayer ? styles.highlightRow : ""}`}
              >
                <td>{i + 1}</td>
                <td>{s.username}</td>
                <td>${s.score.toFixed(2)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
