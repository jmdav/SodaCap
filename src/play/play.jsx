import React, { useState, useEffect } from "react";
import styles from "./play.module.css";

import { TopBar } from "./TopBar";
import { CapitalDisplay } from "./CapitalDisplay";
import { SuppliesBar } from "./supplies/SuppliesBar";
import { StoreBar } from "./store/StoreBar";
import { InventoryBar } from "./store/InventoryBar";
import { Leaderboard } from "./Leaderboard";
import { upgrades } from "./upgrades.js";

export function Play({ username }) {
  //Game variables
  const [gameTime, setGameTime] = useState(600);
  const [capital, setCapital] = useState(50.0);
  const [maxCapital, setMaxCapital] = useState(50.0);
  const [economy, setEconomy] = useState({
    demand: 45,
    changeRate: 0.1,
    volatility: 0.3,
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

  const rerollPrices = React.useCallback((type) => {
    const currentEconomy = economyRef.current; // Use the ref!

    if (Math.random() < currentEconomy.changeRate) {
      let multiplier = randomInterval(
        1 - currentEconomy.volatility,
        1 + currentEconomy.volatility
      );

      if (Math.random() < currentEconomy.changeRate) {
        multiplier = randomInterval(
          currentEconomy.volatility / 2,
          2 + currentEconomy.volatility
        );
      }

      setBuyPrices((prevBuy) => {
        const newBuyPrice = Math.max(0.5, Math.min(prevBuy[type] * multiplier, 3));

        setSellPrices((prevSell) => ({
          ...prevSell,
          [type]: newBuyPrice * (currentEconomy.sellRatio * randomInterval(0.8, 1.2)),
        }));

        return {
          ...prevBuy,
          [type]: newBuyPrice,
        };
      });
    }
  }, []);

  const updateCapital = (amount) => {
    setCapital((prev) => prev + amount);
  }

  const [sellPrices, setSellPrices] = useState({
    soda: 3.0,
    syrup: 0.4,
    straw: 0.4,
  });
  const [buyPrices, setBuyPrices] = useState({
    soda: 3.0,
    syrup: 0.5,
    straw: 0.5,
  });
  const [stats, setStats] = useState({
    sellRate: economy.demand / sellPrices.soda,
    mixTime: 1,
    mixAmount: 1,
    autoMixRate: 0,
    syrupMakeRate: 0,
    strawMakeRate: 0,
  });

  const [upgradesOwned, setUpgradesOwned] = useState(() =>
    Object.keys(upgrades).reduce((acc, upgradeId) => {
      acc[upgradeId] = 0;
      return acc;
    }, {})
  );

  const partialSodas = React.useRef(0);
  const tickCount = React.useRef(0);
  const economyRef = React.useRef(economy);
  const capitalRef = React.useRef(capital);
  const maxCapitalRef = React.useRef(maxCapital);
  const sellPricesRef = React.useRef(sellPrices);

  useEffect(() => {
    economyRef.current = economy;
    capitalRef.current = capital;
    maxCapitalRef.current = maxCapital;
    sellPricesRef.current = sellPrices;
  }, [economy, capital, maxCapital, sellPrices]);

  const buyUpgrade = (upgradeId) => {
    const upgradeData = upgrades[upgradeId];
    const currentCount = upgradesOwned[upgradeId];
    const currentCost = upgradeData.baseCost * Math.pow(upgradeData.costMultiplier || 1.15, currentCount);
    if (capital >= currentCost) {
      setCapital((prev) => prev - currentCost);
      setUpgradesOwned((prev) => ({
        ...prev,
        [upgradeId]: currentCount + 1
      }))
      upgradeData.onPurchase({
        setEconomy,
        setStats
      });
    }

  }

  useEffect(() => {

    const gameLoop = setInterval(() => {

      tickCount.current++;
      setGameTime((prev) => prev - 0.1);

      if (capitalRef.current > maxCapitalRef.current) {
        setMaxCapital(capitalRef.current);
      }

      // Only reroll prices every other tick
      if (tickCount.current % 2 === 0) {
        rerollPrices("syrup");
        rerollPrices("straw");
      }

      setSupplies((prev) => {
        let currentSodas = prev.soda;
        let currentSyrup = prev.syrup;
        let currentStraw = prev.straw;

        partialSodas.current += (stats.autoMixRate / 10);
        const finishedSodas = Math.floor(partialSodas.current);
        partialSodas.current -= finishedSodas;

        if (finishedSodas > 0) {
          const actualSodas = Math.min(finishedSodas, currentSyrup, currentStraw);

          if (actualSodas > 0) {
            currentSodas += actualSodas;
            currentSyrup -= actualSodas;
            currentStraw -= actualSodas;

          }
        }

        const publicDemand = economyRef.current.demand / sellPricesRef.current.soda;
        const sellChance = publicDemand / 100;
        let capitalEarnedThisTick = 0;

        if (Math.random() < sellChance && currentSodas > 0) {
          let batchSize = Math.max(1, Math.floor(0.8 * Math.pow(publicDemand, 1.15)));

          const actualSales = Math.min(currentSodas, batchSize);

          currentSodas -= actualSales;
          capitalEarnedThisTick = actualSales * sellPricesRef.current.soda;
        }

        if (capitalEarnedThisTick > 0) {
          setCapital((prevCap) => prevCap + capitalEarnedThisTick);
        }

        return {
          ...prev,
          soda: currentSodas,
          syrup: currentSyrup,
          straw: currentStraw,
        };
      });

    }, 100);

    return () => clearInterval(gameLoop);

    // Note: Make sure stats.autoMixRate is in your dependency array if it changes dynamically!
  }, [economy.demand, sellPrices.soda, stats.autoMixRate]);

  return (
    <div className={styles.container}>
      <TopBar gameTime={gameTime.toFixed(0)} username={username} />
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
          <StoreBar
            capital={capital}
            maxCapital={maxCapital}
            upgradesOwned={upgradesOwned}
            buyUpgrade={buyUpgrade}
          />
          <Leaderboard capital={capital} username={username} />
        </div>
      </main>
    </div>
  );
}
