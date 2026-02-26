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
  //How many sodas are sold per second
  const [demand, setDemand] = useState(0.33);
  //How flexible the economy is
  const [elasticity, setElasticity] = useState(1.5);
  const [supplies, setSupplies] = useState({
    soda: 0,
    syrup: 10,
    straw: 10,
  });

  const updateSupplies = (type, amount) => {
    setSupplies((prev) => ({
      ...prev,
      [type]: prev[type] + amount,
    }));
  }

  const changeSodaPrice = (amount) => {

    const newPrice = Math.max(sellPrices.soda + amount, 0.001)
    const newSellRate = demand / Math.pow(newPrice, elasticity)

    setSellPrices((prev) => ({
      ...prev,
      soda: newPrice,
    }));

    setStats((prev) => ({
      ...prev,
      sellRate: newSellRate,
    }));
  }

  const updateCapital = (amount) => {
    setCapital((prev) => prev + amount);
  }

  const [sellPrices, setSellPrices] = useState({
    soda: 4.0,
    syrup: 0.9,
    straw: 0.4,
  });
  const [buyPrices, setBuyPrices] = useState({
    soda: 3.0,
    syrup: 1.0,
    straw: 0.5,
  });
  const [stats, setStats] = useState({
    sellRate: 1.0,
    mixTime: 1,
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
            updateSupplies={updateSupplies}
            updateCapital={updateCapital}
            changeSodaPrice={changeSodaPrice}
          />
          <StoreBar capital={capital} />
          <InventoryBar upgrades={upgrades} />
          <Leaderboard capital={capital} />
        </div>
      </main>
    </div>
  );
}
