import React from "react";
import styles from "../play.module.css";

export function SuppliesBar({
  supplies,
  sellPrices,
  buyPrices,
  stats,
  capital,
}) {
  const [sodaMix, setSodaMix] = useState(0);

  return (
    <div className={styles.supplies}>
      <div className={styles.suppliesItem}>
        SODA
        <div id="supply-soda">SUPPLY: </div>
        <button id="make-soda" className={styles.btn}>
          MIX
        </button>
        <meter id="make-soda-meter" value={sodaMix}>
          60%
        </meter>
        <br />
        PRICE: <span id="price-soda">$3.00</span>
        <button id="buy-syrup" className={styles.btn}>
          RAISE
        </button>
        <button id="sell-syrup" className={styles.btn}>
          LOWER
        </button>
      </div>
      <div className={styles.suppliesItem}>
        SYRUP <span id="price-syrup">(10 | $1.00 ⬇️)</span>
        <div id="supply-syrup">SUPPLY: 10</div>
        <button id="buy-syrup" className={styles.btn}>
          BUY 10
        </button>
        <button id="sell-syrup" className={styles.btn}>
          SELL 10
        </button>
      </div>
      <div className={styles.suppliesItem}>
        STRAW <span id="price-straw">(10 | $0.50 ⬆️)</span>
        <div id="supply-straw">SUPPLY: 15</div>
        <button id="buy-straw" className={styles.btn}>
          BUY 10
        </button>
        <button id="sell-straw" className={styles.btn}>
          SELL 10
        </button>
      </div>
    </div>
  );
}
