import React, { useState, useEffect } from "react";
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

  const [economy, setEconomy] = useState({
    demand: 10,
    changeRate: 0.05,
    volatility: 0.2,
    sellRatio: 0.8,
  })

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
    const newSellRate = economy.demand / newPrice;

    setSellPrices((prev) => ({
      ...prev,
      soda: newPrice,
    }));

    setStats((prev) => ({
      ...prev,
      sellRate: newSellRate,
    }));
  }

  function randomInterval(min, max) {
    return (Math.random() * (max - min)) + min;
  }

  const rerollPrices = (type) => {

    if (Math.random() < economy.changeRate) {
      let multiplier = randomInterval(
        1 - economy.volatility,
        1 + economy.volatility
      );

      //crazy market change
      if (Math.random() < economy.changeRate) {
        multiplier = randomInterval(
          economy.volatility / 2,
          2 + economy.volatility
        );
      }

      setBuyPrices((prevBuy) => {
        const newBuyPrice = Math.max(0.5, Math.min(prevBuy[type] * multiplier, 3));

        setSellPrices((prevSell) => ({
          ...prevSell,
          [type]: newBuyPrice * (economy.sellRatio * randomInterval(0.8, 1.2)),
        }));

        return {
          ...prevBuy,
          [type]: newBuyPrice,
        };
      });
    }
  };

  const updateCapital = (amount) => {
    setCapital((prev) => prev + amount);
  }

  const [sellPrices, setSellPrices] = useState({
    soda: 3.0,
    syrup: 0.9,
    straw: 0.4,
  });
  const [buyPrices, setBuyPrices] = useState({
    soda: 3.0,
    syrup: 2.0,
    straw: 1.0,
  });
  const [stats, setStats] = useState({
    sellRate: economy.demand / sellPrices.soda,
    mixTime: 1,
    autoMixTime: -1,
  });
  const [upgrades, setUpgrades] = useState([]);


  useEffect(() => {

    // Assign the interval ID directly to sellTimer
    const sellTimer = setInterval(() => {

      const publicDemand = economy.demand / sellPrices.soda;
      const sellChance = publicDemand / 100;

      rerollPrices("syrup");
      rerollPrices("straw");

      if (Math.random() < sellChance) {
        let batchSize = Math.floor(0.7 * Math.pow(publicDemand, 1.15));
        if (batchSize < 1) batchSize = 1;

        setSupplies((prevSupplies) => {
          if (prevSupplies.soda > 0) {
            const actualSales = Math.min(prevSupplies.soda, batchSize);
            setCapital((prevCapital) => prevCapital + (actualSales * sellPrices.soda));
            return {
              ...prevSupplies,
              soda: prevSupplies.soda - actualSales,
            };
          }
          return prevSupplies;
        });
      }

    }, 100);

    // Clear the exact same variable!
    return () => clearInterval(sellTimer);

  }, [economy.demand, sellPrices.soda]);

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
