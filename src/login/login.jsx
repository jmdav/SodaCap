import React from "react";
import { Unauthenticated } from "./unauthenticated";
import { Authenticated } from "./authenticated";
import { AuthState } from "./authState";
import styles from "../main.module.css";

export function Login({ authState, username, onAuthChange }) {
  return (
    <main className={styles.main}>
      <div clasName={styles.centered}>
        {authState !== AuthState.Unknown}
        {authState === AuthState.Authenticated && (
          <Authenticated
            username={username}
            onLogout={() => onAuthChange("", AuthState.Unauthenticated)}
          />
        )}
        {authState === AuthState.Unauthenticated && (
          <Unauthenticated
            username={username}
            onLogin={(loginUserName) => {
              onAuthChange(loginUserName, AuthState.Authenticated);
            }}
          />
        )}
      </div>
    </main>
  );
}
