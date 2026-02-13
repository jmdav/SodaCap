import React from 'react';
import styles from "./play.module.css";

export function Play() {
  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <div className={styles.usernameDisplay}>
          <h5>Logged in as <span className={styles.username}>Player</span></h5>
        </div>

        <div className={styles.timer}>
          TIME REMAINING:
          <span id="game-timer"> 2:56</span>
        </div>
      </div>
      <main className={styles.main}>
        <div className={styles.capitalWrapper}>
          <div className={styles.capital}>
            <p>LIQUID CAPITAL:</p>
            <p className={styles.gameCapital}>$200.00</p>
          </div>
        </div>
        <div className={styles.lowerWrapper}>
          <div className={styles.supplies}>
            <div className={styles.suppliesItem}>
              SODA
              <div id="supply-soda">SUPPLY: 10</div>
              <button id="make-soda" className={styles.btn}>MIX</button>
              <meter id="make-soda-meter" value="0.6">60%</meter>
              <br />
              PRICE: <span id="price-soda">$3.00</span>
              <button id="buy-syrup" className={styles.btn}>RAISE</button>
              <button id="sell-syrup" className={styles.btn}>LOWER</button>
            </div>
            <div className={styles.suppliesItem}>
              SYRUP <span id="price-syrup">(10 | $1.00 ⬇️)</span>
              <div id="supply-syrup">SUPPLY: 10</div>
              <button id="buy-syrup" className={styles.btn}>BUY 10</button>
              <button id="sell-syrup" className={styles.btn}>SELL 10</button>
            </div>
            <div className={styles.suppliesItem}>
              STRAW <span id="price-straw">(10 | $0.50 ⬆️)</span>
              <div id="supply-straw">SUPPLY: 15</div>
              <button id="buy-straw" className={styles.btn}>BUY 10</button>
              <button id="sell-straw" className={styles.btn}>SELL 10</button>
            </div>
          </div>
          <h2 className={styles.h2}>STORE</h2>
          <div className={styles.store}>
            <div className={styles.storeItem} id="store-1">
              <div className={styles.itemTitle}>SODA CADET</div>
              <div className={styles.itemPrice}>$20.00</div>
              <button id="buy-item-1" className={styles.btn}>BUY</button>
              <div className={styles.itemDescription}>Slowly mixes sodas for you</div>
            </div>
            <div className={styles.storeItem} id="store-2">
              <div className={styles.itemTitle}>SOCIAL MEDIA NOVICE</div>
              <div className={styles.itemPrice}>$49.99</div>
              <button id="buy-item-2" className={styles.btn}>BUY</button>
              <div className={styles.itemDescription}>Slightly increases soda demand</div>
            </div>
            <div className={styles.storeItem} id="store-3">
              <div className={styles.itemTitle}>SODA ADMIRAL</div>
              <div className={styles.itemPrice}>$7777.77</div>
              <button id="buy-item-3" className={styles.btn}>BUY</button>
              <div className={styles.itemDescription}>
                Mixes sodas at an exemplary rate
              </div>
            </div>

            <div className={styles.storeItem} id="store-4">
              <div className={styles.itemTitle}>BIONIC ARM</div>
              <div className={styles.itemPrice}>$300.00</div>
              <button id="buy-item-1" className={styles.btn}>BUY</button>
              <div className={styles.itemDescription}>You mix sodas 200% faster</div>
            </div>
            <div className={styles.storeItem} id="store-5">
              <div className={styles.itemTitle}>CONTRACT DEAL</div>
              <div className={styles.itemPrice}>$50.00</div>
              <button id="buy-item-2" className={styles.btn}>BUY</button>
              <div className={styles.itemDescription}>Straws 20% cheaper</div>
            </div>
            <div className={styles.storeItem} id="store-6">
              <div className={styles.itemTitle}>FUNNY CAT</div>
              <div className={styles.itemPrice}>$100.00</div>
              <button id="buy-item-3" className={styles.btn}>BUY</button>
              <div className={styles.itemDescription}>
                Improves marketing effectiveness by 30%
              </div>
            </div>
          </div>
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