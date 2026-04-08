import React, { useState, useEffect, useRef } from "react";
import styles from "./play.module.css";

import { TopBar } from "./TopBar";
import { CapitalDisplay } from "./CapitalDisplay";
import { SuppliesBar } from "./supplies/SuppliesBar";
import { StoreBar } from "./store/StoreBar";
import { GameOver } from "./GameOver";
import { Leaderboard } from "./Leaderboard";
import { upgrades } from "./upgrades.js";

export function Play({ username }) {
  const ws = useRef(null);
  //Game variables
  const [gameTime, setGameTime] = useState(300.1);
  const [liveLeaderboard, setLiveLeaderboard] = useState([]);
  const [scores, setScores] = useState(null);
  const [timeOffset, setTimeOffset] = useState(21590000);
  const [capital, setCapital] = useState(20.0);
  const [maxCapital, setMaxCapital] = useState(50.0);
  const [economy, setEconomy] = useState({
    demand: 14,
    changeRate: 0.1,
    sellRatio: 0.9,
  });

  const [itemEconomy, setItemEconomy] = useState({
    syrup: {
      basePrice: 1,
      waves: {
        small: { amplitude: 0.4, periodMs: 100003, phase: 0 },
        med: { amplitude: 0.1, periodMs: 597613, phase: Math.PI / 4 },
      },
    },
    straw: {
      basePrice: 0.5,
      waves: {
        small: { amplitude: 0.4, periodMs: 86029, phase: Math.PI / 4 },
        med: { amplitude: 0.1, periodMs: 545063, phase: 0 },
      },
    },
  });

  const [supplies, setSupplies] = useState({
    soda: 0,
    syrup: 20,
    straw: 20,
  });

  const updateSupplies = (type, amount) => {
    setSupplies((prev) => ({
      ...prev,
      [type]: prev[type] + amount,
    }));
  };

  const changeSodaPrice = (amount) => {
    const newPrice = Math.max(sellPrices.soda + amount, 0.001);

    setSellPrices((prev) => ({
      ...prev,
      soda: newPrice,
    }));

    setStats((prev) => ({
      ...prev,
    }));
  };

  function randomInterval(min, max) {
    return seededRandom(min) * (max - min) + min;
  }

  function seededRandom(seed = 1.1) {
    seed += Math.floor((Date.now() + timeOffset) / 100);
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }

  const rerollPrices = React.useCallback(
    (type) => {
      const currentGlobalTimeMs = Date.now() + timeOffset;
      const currentEconomy = economyRef.current;

      const itemData = itemEconomy[type];
      if (!itemData) return;

      let calculatedPrice = itemData.basePrice;

      for (const wave of Object.values(itemData.waves)) {
        const progress = (currentGlobalTimeMs % wave.periodMs) / wave.periodMs;
        const currentWaveValue = Math.sin(progress * 2 * Math.PI + wave.phase);

        calculatedPrice += wave.amplitude * currentWaveValue;
      }

      const finalBuyPrice = Math.max(0.05, calculatedPrice);
      console.log(finalBuyPrice);
      setSellPrices((prevSell) => ({
        ...prevSell,
        [type]: finalBuyPrice * currentEconomy.sellRatio,
      }));

      setBuyPrices((prevBuy) => ({
        ...prevBuy,
        [type]: finalBuyPrice,
      }));
    },
    [timeOffset, itemEconomy],
  );

  const updateCapital = (amount) => {
    setCapital((prev) => prev + amount);
  };

  const [sellPrices, setSellPrices] = useState({
    soda: 3.0,
    syrup: 0.4,
    straw: 0.4,
  });
  const [buyPrices, setBuyPrices] = useState({
    syrup: 1.5,
    straw: 1.5,
  });

  const [stats, setStats] = useState({
    mixTime: 1,
    mixAmount: 1,
    autoMixRate: 0,
    syrupMakeRate: 0,
    strawMakeRate: 0,
    supplyEfficiency: 1,
  });

  const [upgradesOwned, setUpgradesOwned] = useState(() =>
    Object.keys(upgrades).reduce((acc, upgradeId) => {
      acc[upgradeId] = 0;
      return acc;
    }, {}),
  );

  // 3rd party time sync
  useEffect(() => {

    const timeCheck = async () => {
      try {
        const fetchStart = Date.now();
        const response = await fetch(
          "https://timeapi.io/api/Time/current/zone?timeZone=UTC",
        );
        const fetchEnd = Date.now();
        const latency = (fetchEnd - fetchStart) / 2;
        const data = await response.json();
        const trueGlobalTime = new Date(data.dateTime).getTime();
        const localMidpoint = fetchStart + latency;
        const offset =
          Math.floor((trueGlobalTime - localMidpoint) / 10000) * 10000;
        setTimeOffset(offset);
        console.log(offset);
        rerollPrices("syrup");
        rerollPrices("straw");
      } catch (error) {
        setTimeOffset(0);
      }
    };

    timeCheck();
  }, []);

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
    const currentCost =
      upgradeData.baseCost *
      Math.pow(upgradeData.costMultiplier || 1.15, currentCount);
    if (capital >= currentCost) {
      setCapital((prev) => prev - currentCost);
      setUpgradesOwned((prev) => ({
        ...prev,
        [upgradeId]: currentCount + 1,
      }));
      upgradeData.onPurchase({
        setEconomy,
        setStats,
        setSellPrices,
        setBuyPrices,
      });
    }
  };

  // Websocket handler
  useEffect(() => {

    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsUrl = `${protocol}//localhost:7000`;

    ws.current = new WebSocket(wsUrl);

    ws.current.onopen = () => {
      console.log("Websocket open");
      ws.current.send(JSON.stringify({ username, score: capital }));
    };

    ws.current.onmessage = (event) => {
      try {
        const newLeaderboard = JSON.parse(event.data);

        setLiveLeaderboard(Object.entries(newLeaderboard)
          .sort((a, b) => b[1] - a[1])
          .map(([username, score]) => ({ username, score })));
      }
      catch (error) {
        console.error(error);
      }
    }

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };

  }, [username]);


  // Game loop handler
  useEffect(() => {
    const gameLoop = setInterval(() => {
      if (gameTime >= 0.1) {
        tickCount.current++;
        setGameTime((prev) => prev - 0.1);

        if (capitalRef.current > maxCapitalRef.current) {
          setMaxCapital(capitalRef.current);
        }

        if (tickCount.current % 50 == 0) {
          rerollPrices("syrup");
        }
        if (tickCount.current % 50 == 25) {
          rerollPrices("straw");
        }

        setSupplies((prev) => {
          let currentSodas = prev.soda;
          let currentSyrup = prev.syrup;
          let currentStraw = prev.straw;
          currentSyrup += stats.syrupMakeRate / 10;
          currentStraw += stats.strawMakeRate / 10;
          partialSodas.current += (stats.autoMixRate) / 10;
          const finishedSodas = Math.floor(partialSodas.current);
          partialSodas.current -= finishedSodas;

          if (finishedSodas > 0) {
            const suppliesPerSoda = stats.supplyEfficiency;
            const actualSodas = Math.min(
              finishedSodas,
              Math.floor(currentSyrup / suppliesPerSoda),
              Math.floor(currentStraw / suppliesPerSoda),
            );

            if (actualSodas > 0) {
              currentSodas += actualSodas;
              currentSyrup -= actualSodas * suppliesPerSoda;
              currentStraw -= actualSodas * suppliesPerSoda;
            }
          }

          const priceSensitivity = 1.5;
          const adjustedPrice = Math.pow(sellPricesRef.current.soda, priceSensitivity);

          const publicDemand =
            economyRef.current.demand / adjustedPrice;
          const sellChance = publicDemand / 20;
          let capitalEarnedThisTick = 0;

          if (seededRandom(3) < sellChance && currentSodas > 0) {
            let batchSize = Math.max(
              1,
              Math.floor(0.5 * Math.pow(publicDemand, 1.15)),
            );

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
      }
      if (ws.current && ws.current.readyState === WebSocket.OPEN) {
        ws.current.send(JSON.stringify({
          username: username,
          score: capital
        }));
      }
    }, 100);

    return () => clearInterval(gameLoop);
  }, [economy.demand, sellPrices.soda, stats.autoMixRate, gameTime]);

  const scoreSubmitted = React.useRef(false);


  // Game end handler
  useEffect(() => {
    if (gameTime <= 0.1 && !scoreSubmitted.current) {
      scoreSubmitted.current = true;
      (async () => {
        try {
          const res = await fetch("/api/scores", {
            method: "post",
            body: JSON.stringify({ username, score: capitalRef.current }),
            headers: { "Content-type": "application/json; charset=UTF-8" },
            credentials: "include",
          });
          if (res.ok) {
            setScores(await res.json());
          } else {
            console.error("Score save failed:", res.status);
          }
        } catch (err) {
          console.error("Score save request failed:", err);
        }
      })();
    }
  }, [gameTime, username]);

  return (
    <div className={styles.container}>
      <TopBar gameTime={gameTime.toFixed(0)} username={username} />
      <main className={styles.main}>
        <CapitalDisplay capital={capital} />
        <div className={styles.lowerWrapper}>
          {gameTime > 0.1 && (
            <>
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
              <Leaderboard
                capital={capital}
                username={username}
                scores={liveLeaderboard}
              />
            </>
          )}
          {gameTime < 0.1 && (
            <>
              <GameOver capital={capital} />
              <Leaderboard
                capital={capital}
                username={username}
                scores={scores}
              />
            </>
          )}
        </div>
      </main>
    </div>
  );
}
