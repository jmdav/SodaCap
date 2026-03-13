import React from "react";
import styles from "./play.module.css";

export function Leaderboard({ username, capital }) {
  const [scores, setScores] = React.useState([]);

  React.useEffect(() => {
    async function fetchScores() {
      try {
        const res = await fetch('/api/scores');
        if (res.ok) setScores(await res.json());
      } catch { }
    }
    fetchScores();
    const interval = setInterval(fetchScores, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h2 className={styles.h2}>LEADERBOARD</h2>
      <table className={styles.leaderboard}>
        <tbody>
          {scores.length === 0 ? (
            <tr className={styles.leaderboardData}>
              <td>{username}</td>
              <td></td>
              <td>${capital.toFixed(2)}</td>
            </tr>
          ) : (
            scores.map((s, i) => (
              <tr key={i} className={styles.leaderboardData}>
                <td>{i + 1}</td>
                <td>{s.username}</td>
                <td>${s.score.toFixed(2)}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
