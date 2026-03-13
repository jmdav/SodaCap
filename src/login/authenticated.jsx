import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../main.module.css";

export function Authenticated(props) {
  const navigate = useNavigate();

  function logout() {
    fetch(`/api/auth/logout`, {
      method: "delete",
    })
      .catch(() => {})
      .finally(() => {
        localStorage.removeItem("username");
        props.onLogout();
      });
  }

  return (
    <div>
      <div className={styles.playerName}>Logged in as {props.username}</div>
      <button variant="primary" onClick={() => navigate("/play")}>
        Play
      </button>
      <button onClick={() => logout()}>Logout</button>
    </div>
  );
}
