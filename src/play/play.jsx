import React from 'react';
import styles from "./play.module.css";

import { TopBar } from './TopBar';
import { CapitalDisplay } from './CapitalDisplay';
import { SuppliesPanel } from './supplies/SuppliesBar';
import { StorePanel } from './store/StoreBar';
import { InventoryPanel } from './store/InventoryBar';
import { Leaderboard } from './Leaderboard';

export function Play() {
  return (
    <div className={styles.container}>
      <TopBar />
      <main className={styles.main}>
        <CapitalDisplay />
        <div className={styles.lowerWrapper}>
          <SuppliesPanel />
          <StorePanel />
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
          <h2 className={styles.h2}>LEADERBOARD</h2>
          <table className={styles.leaderboard}>
            <tr className={styles.leaderboardData}>
              <td>PLAYER1</td>
              <td>(2 wins)</td>
              <td>$500.00</td>
            </tr>
            <tr className={styles.leaderboardData}>
              <td>PLAYER2</td>
              <td>(10 wins)</td>
              <td>$200.00</td>
            </tr>
          </table>
        </div>
      </main>
    </div>
  );
}