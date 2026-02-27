import React from "react";
import styles from "../play.module.css";

export function StoreItem({
    id,
    name,
    description,
    flavor,
    baseCost,
    costMultiplier,
    capital,
    purchased,
    buyUpgrade,
}) {
    const safeBaseCost = Number(baseCost) || 0;
    const safeMultiplier = Number(costMultiplier) || 1;
    const safePurchased = Number(purchased) || 0;
    const cost = Math.round(safeBaseCost * Math.pow(safeMultiplier, safePurchased));

    const handleBuy = () => {
        if (typeof buyUpgrade === "function") {
            buyUpgrade(id, cost);
        }
    };

    return (
        <div className={styles.storeItem}>
            <div className={styles.itemTitle}>{name}</div>
            <div className={styles.itemPrice}>${cost.toFixed(2)}</div>
            <div className={styles.itemDescription}>
                {description}
            </div>
            <button className={styles.btn} disabled={cost > capital} onClick={handleBuy}>
                BUY ({purchased})
            </button>
            <div className={styles.itemFlavor}>
                {flavor}
            </div>
        </div>
    );
}
