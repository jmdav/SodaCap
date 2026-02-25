import React from "react";
import styles from "../play.module.css";

export function InventoryBar() {
  return (
    <div>
      <h2 className={styles.h2}>INVENTORY</h2>
      <div className={styles.inventory}>
        <div className={styles.inventoryItem}>
          <div className={styles.itemTitle}>TRAINING PROGRAM</div>
          <div className={styles.itemDescription}>Soda mixers 15% faster</div>
        </div>
        <div className={styles.inventoryItem}>
          <div className={styles.itemTitle}>INSIDER DEAL</div>
          <div className={styles.itemDescription}>Syrup 20% cheaper</div>
        </div>
      </div>
    </div>
  );
}
