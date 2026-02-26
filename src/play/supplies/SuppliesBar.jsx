import React, { useState, useEffect, useRef } from "react";
import styles from "../play.module.css";

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
          updateSupplies("soda", 1);
          return;
        }

        mixProgressRef.current = nextMix;
        setSodaMix(nextMix);
      }, intervalTime);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };

  }, [isMixing, updateSupplies, stats?.mixTime]);

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

  return (
    <div className={styles.supplies}>
      <div className={styles.suppliesItem}>
        SODA
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
        PRICE: <span id="price-soda">${sellPrices.soda.toFixed(2)}</span>
        <button
          id="raise-soda-price"
          className={styles.btn}
          onClick={() => changeSodaPrice(0.25)}
        >
          RAISE
        </button>
        <button
          id="lower-soda-price"
          className={styles.btn}
          disabled={sellPrices.soda <= 0.25}
          onClick={() => changeSodaPrice(-0.25)}
        >
          LOWER
        </button>
      </div>

      <div className={styles.suppliesItem}>
        SYRUP <span id="price-syrup">(10 | ${buyPrices.syrup.toFixed(2)})</span>

        <div id="supply-syrup">SUPPLY: {supplies.syrup}</div>

        <button
          id="buy-syrup"
          className={styles.btn}
          onClick={() => buySupply("syrup", 10)}
          disabled={buyPrices.syrup > capital}>
          BUY 10
        </button>
        <button
          id="sell-syrup"
          className={styles.btn}
          onClick={() => sellSupply("syrup", 10)}
          disabled={supplies.syrup < 10}>
          SELL 10
        </button>
      </div>

      <div className={styles.suppliesItem}>
        STRAW <span id="price-straw">(10 | ${buyPrices.straw.toFixed(2)})</span>

        <div id="supply-straw">SUPPLY: {supplies.straw}</div>

        <button
          id="buy-straw"
          className={styles.btn}
          onClick={() => buySupply("straw", 10)}
          disabled={buyPrices.straw > capital}>
          BUY 10
        </button>
        <button
          id="sell-straw"
          className={styles.btn}
          onClick={() => sellSupply("straw", 10)}
          disabled={supplies.straw < 10}>
          SELL 10
        </button>
      </div>
    </div>
  );
}