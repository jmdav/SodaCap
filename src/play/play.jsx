import React, { useState } from "react";
import styles from "./play.module.css";

import { TopBar } from "./TopBar";
import { CapitalDisplay } from "./CapitalDisplay";
import { SuppliesBar } from "./supplies/SuppliesBar";
import { StoreBar } from "./store/StoreBar";
import { InventoryBar } from "./store/InventoryBar";
import { Leaderboard } from "./Leaderboard";

export function Play({ username }) {
  //Game variables
  const [gameTime, setGameTime] = useState(600);
  const [capital, setCapital] = useState(20.0);
  const [supplies, setSupplies] = useState({
    soda: 0,
    syrup: 10,
    straw: 10,
  });
  const [sellPrices, setSellPrices] = useState({
    soda: 4.0,
    syrup: -1,
    straw: -1,
  });
  const [buyPrices, setBuyPrices] = useState({
    soda: 3.0,
    syrup: 1.0,
    straw: 0.5,
  });
  const [stats, setStats] = useState({
    sellRate: 1.0,
    mixTime: 0.5,
    autoMixTime: -1,
  });
  const [upgrades, setUpgrades] = useState([]);

  return (
    <div className={styles.container}>
      <TopBar gameTime={gameTime} username={username} />
      <main className={styles.main}>
        <CapitalDisplay capital={capital} />
        <div className={styles.lowerWrapper}>
          <SuppliesBar
            supplies={supplies}
            sellPrices={sellPrices}
            buyPrices={buyPrices}
            stats={stats}
            capital={capital}
          />
          <StoreBar capital={capital} />
          <InventoryBar upgrades={upgrades} />
          <Leaderboard capital={capital} />
        </div>
      </main>
    </div>
  );
}
