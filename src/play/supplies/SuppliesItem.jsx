import React from "react";
import styles from "../play.module.css";

export function SuppliesItem({
  name,
  capital,
  buyPrices,
  sellPrices,
  supplies,
  buySupply,
  sellSupply,
  setBuyAmount,
  amount,
}) {

  const multipliers = [5, 10, 50, 100, 1000, 5000];

  const updateMultiplier = () => {

    let multiplierIndex = multipliers.indexOf(amount);
    const nextIndex = (multiplierIndex + 1) % multipliers.length;

    setBuyAmount((prev) => ({
      ...prev,
      [name]: multipliers[nextIndex],
    }));
  }

  return (
    <div className={styles.suppliesItem}>
      <h3>{name.toUpperCase()}</h3>
      <h4>(B: ${(buyPrices[name] * amount).toFixed(2)} | S: ${(sellPrices[name] * amount).toFixed(2)})</h4>
      <br />
      <div>SUPPLY: {supplies[name]}</div>

      <button
        className={styles.btn}
        onClick={() => buySupply(name, amount)}
        disabled={buyPrices[name] * amount > capital}>
        BUY
      </button>

      <button
        className={styles.btn}
        onClick={() => sellSupply(name, amount)}
        disabled={supplies[name] < amount}>
        SELL
      </button>
      <button
        className={styles.btn}
        onClick={updateMultiplier}
      >
        x{amount}
      </button>
    </div>
  );
}