import React from "react";
import styles from "../play.module.css";
import { StoreItem } from './StoreItem';
import { upgrades } from '../upgrades.js';

export function StoreBar({
  capital,
  maxCapital,
  upgradesOwned,
  buyUpgrade
}) {
  const effectiveMaxCapital = maxCapital;

  const visibleUpgrades = Object.values(upgrades).filter((item) => {
    const ownedAmount = upgradesOwned[item.id];

    if (ownedAmount > 0) return true;
    if (effectiveMaxCapital >= item.baseCost * 0.6) return true;
    return false;
  });

  return (
    <div>
      <h2 className={styles.h2}>STORE</h2>
      <div className={styles.store}>
        {visibleUpgrades.map((item) => {
          const ownedAmount = upgradesOwned[item.id];

          return (
            <StoreItem
              key={item.id}
              id={item.id}
              name={item.name}
              description={item.description}
              flavor={item.flavor}
              baseCost={item.baseCost}
              costMultiplier={item.costMultiplier}
              capital={capital}
              purchased={ownedAmount}
              buyUpgrade={buyUpgrade}
            />
          );
        })}
      </div>
    </div>
  );
}