import React from 'react';
import styles from "../main.module.css";

export function Login() {
  return (
    <main className={styles.container}>
      <form method="get" action="play.html">
        <div>
          <input type="text" placeholder="username" />
        </div>
        <div>
          <input type="password" placeholder="password" />
        </div>
        <div className="login-buttons">
          <button type="submit" className="btn">Login</button>
          <button type="submit" className="btn">Create</button>
        </div>
      </form>
    </main>
  );
}