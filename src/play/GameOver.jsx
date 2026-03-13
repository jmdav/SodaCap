import React, { useState, useEffect } from "react";
import styles from "./play.module.css";

export function GameOver({ capital }) {
  return (
    <div className={styles.gameOver}>
      <div>
        After a profitable 5 minutes, you decide to take your $
        {capital.toFixed(0)} and peacefully retire.{" "}
      </div>
      <br></br>
      <div>
        Here's your place in the red-carpeted and spill-stained halls of Soda
        Capitalist History:
      </div>
      <br></br>
    </div>
  );
}
