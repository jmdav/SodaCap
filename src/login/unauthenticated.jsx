import React from "react";
import styles from "../main.module.css";

export function Unauthenticated(props) {
  const [username, setUsername] = React.useState(props.username || "");
  const [password, setPassword] = React.useState("");
  const [displayError, setDisplayError] = React.useState(null);

  async function loginUser() {
    loginOrCreate(`/api/auth/login`);
  }

  async function createUser() {
    loginOrCreate(`/api/auth/create`);
  }

  async function loginOrCreate(endpoint) {
    const response = await fetch(endpoint, {
      method: "post",
      body: JSON.stringify({ username: username, password: password }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    if (response?.status === 200) {
      localStorage.setItem("username", username);
      props.onLogin(username);
    } else {
      const body = await response.json();
      setDisplayError(`${body.msg}`);
    }
  }

  return (
    <>
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
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div className="login-buttons">
          <button
            type="button"
            className={styles.btn}
            onClick={() => loginUser()}
          >
            Login
          </button>
          <button
            type="button"
            className={styles.btn}
            onClick={() => createUser()}
          >
            Create
          </button>
        </div>

        <div className={styles.errorDisplay}>{displayError}</div>
      </form>
    </>
  );
}
