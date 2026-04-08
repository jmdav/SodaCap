import React from "react";
import styles from "./play.module.css";
import { animatedNumber } from '../animatedNumber';

export function CapitalDisplay({ capital }) {

  const animatedCapital = animatedNumber(capital);

  return (
    <div className={styles.capitalWrapper}>
      <div className={styles.capital}>
        <p>LIQUID CAPITAL:</p>
        <p className={styles.gameCapital}>${animatedCapital.toFixed(2).toLocaleString()}</p>
      </div>
    </div>
  );
}
