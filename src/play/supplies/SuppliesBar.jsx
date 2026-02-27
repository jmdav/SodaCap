import React, { useState, useEffect, useRef } from "react";
import styles from "../play.module.css";
import { SuppliesItem } from "./SuppliesItem";

export function SuppliesBar({
  supplies,
  updateSupplies,
  sellPrices,
  buyPrices,
  stats,
  capital,
  updateCapital,
  changeSodaPrice
}) {

  const [isMixing, setIsMixing] = useState(false);
  const [sodaMix, setSodaMix] = useState(0);
  const [buyAmount, setBuyAmount] = useState({
    syrup: 5,
    straw: 5,
  })
  const mixProgressRef = useRef(0);

  useEffect(() => {
    let intervalId;

    if (isMixing) {
      const intervalTime = 50;
      const totalDurationMs = stats.mixTime * 1000;
      const progressStep = (100 * intervalTime) / totalDurationMs;
      mixProgressRef.current = 0;

      intervalId = setInterval(() => {
        const nextMix = mixProgressRef.current + progressStep;

        if (nextMix >= 100) {
          clearInterval(intervalId);
          mixProgressRef.current = 0;
          setSodaMix(0);
          setIsMixing(false);
          updateSupplies("soda", stats.mixAmount);
          return;
        }

        mixProgressRef.current = nextMix;
        setSodaMix(nextMix);
      }, intervalTime);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };

  }, [isMixing, stats?.mixTime]);

  const handleMixClick = () => {
    if (!isMixing && supplies.straw > 0 && supplies.syrup > 0) {
      setIsMixing(true);
      updateSupplies("straw", -1);
      updateSupplies("syrup", -1);
    }
  };

  const buySupply = (type, amount) => {
    if ((buyPrices[type] * amount) <= capital) {
      updateCapital(-1 * (buyPrices[type] * amount));
      updateSupplies(type, amount);
    }
  }

  const sellSupply = (type, amount) => {
    if ((supplies[type] - amount) >= 0) {
      updateCapital(sellPrices[type] * amount);
      updateSupplies(type, (amount * -1));
    }
  }

  const changeAmount = (type, amount) => {
    if ((supplies[type] - amount) >= 0) {
      updateCapital(sellPrices[type] * amount);
      updateSupplies(type, (amount * -1));
    }
  }

  return (
    <div className={styles.supplies}>
      <div className={styles.suppliesItem}>
        <h3>SODA</h3>
        <h4>PRICE: ${sellPrices.soda.toFixed(2)}</h4>
        <button
          id="raise-soda-price"
          className={styles.btn}
          onClick={() => changeSodaPrice(0.25)}
        >
          ↑
        </button>
        <button
          id="lower-soda-price"
          className={styles.btn}
          disabled={sellPrices.soda <= 0.25}
          onClick={() => changeSodaPrice(-0.25)}
        >
          ↓
        </button>
        <div id="supply-soda">SUPPLY: {supplies.soda}</div>

        <button
          className={styles.btn}
          onClick={handleMixClick}
          disabled={isMixing || supplies.straw === 0 || supplies.syrup === 0}
        >
          {"MIX"}
        </button>

        <meter id="make-soda-meter" value={sodaMix} max="100" />
        <br />

      </div>

      <SuppliesItem
        key="syrup"
        name="syrup"
        capital={capital}
        buyPrices={buyPrices}
        sellPrices={sellPrices}
        supplies={supplies}
        buySupply={buySupply}
        sellSupply={sellSupply}
        setBuyAmount={setBuyAmount}
        amount={buyAmount.syrup}
      />

      <SuppliesItem
        key="straw"
        name="straw"
        capital={capital}
        buyPrices={buyPrices}
        sellPrices={sellPrices}
        supplies={supplies}
        buySupply={buySupply}
        sellSupply={sellSupply}
        setBuyAmount={setBuyAmount}
        amount={buyAmount.straw}
      />

    </div>
  );
}