import React from "react";
import styles from "./play.module.css";

export function CapitalDisplay({ capital }) {
  return (
    <div className={styles.capitalWrapper}>
      <div className={styles.capital}>
        <p>LIQUID CAPITAL:</p>
        <p className={styles.gameCapital}>${capital}</p>
      </div>
    </div>
  );
}
