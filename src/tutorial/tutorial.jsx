import React from 'react';
import styles from "../main.module.css";

export function Tutorial() {
  return (
    <div className={styles.main}>
      <h2>Welcome to SODACAP(ITALISM)!</h2>
      <p>The game is simple: earn as much <b>liquid capital</b> as you can before 5 minutes are up.</p>
      <ul>
        <li>Earn money by selling <b>sodas</b></li>
        <li>Mix sodas by combining 1 <b>straw</b> and 1 <b>syrup</b></li>
        <li>Buy supplies and set the right soda price to turn a profit!</li>
      </ul>
    </div>
  );
}

