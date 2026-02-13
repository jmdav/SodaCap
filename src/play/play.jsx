import React from 'react';
import styles from "./play.module.css";

export function Play() {
  return (
    <div classNameName={styles.container}>
      <div className="top-bar">
        <div className="username-display">
          <h5>Logged in as <span className="username">Player</span></h5>
        </div>

        <div className="timer">
          TIME REMAINING:
          <span id="game-timer">2:56</span>
        </div>
      </div>
      <main>
        <div className="capital-wrapper">
          <div className="capital">
            <p>LIQUID CAPITAL:</p>
            <p id="game-capital">$200.00</p>
          </div>
        </div>
        <div className="lower-wrapper">
          <div className="supplies">
            <div className="supplies-item">
              SODA
              <div id="supply-soda">SUPPLY: 10</div>
              <button id="make-soda" className="btn">MIX</button>
              <meter id="make-soda-meter" value="0.6">60%</meter>
              <br />
              PRICE: <span id="price-soda">$3.00</span>
              <button id="buy-syrup" className="btn">RAISE</button>
              <button id="sell-syrup" className="btn">LOWER</button>
            </div>
            <div className="supplies-item">
              SYRUP <span id="price-syrup">(10 | $1.00 ⬇️)</span>
              <div id="supply-syrup">SUPPLY: 10</div>
              <button id="buy-syrup" className="btn">BUY 10</button>
              <button id="sell-syrup" className="btn">SELL 10</button>
            </div>
            <div className="supplies-item">
              STRAW <span id="price-straw">(10 | $0.50 ⬆️)</span>
              <div id="supply-straw">SUPPLY: 15</div>
              <button id="buy-straw" className="btn">BUY 10</button>
              <button id="sell-straw" className="btn">SELL 10</button>
            </div>
          </div>
          <h2>STORE</h2>
          <div className="store">
            <div className="store-item" id="store-1">
              <div className="item-title">SODA CADET</div>
              <div className="item-price">$20.00</div>
              <button id="buy-item-1" className="btn">BUY</button>
              <div className="item-description">Slowly mixes sodas for you</div>
            </div>
            <div className="store-item" id="store-2">
              <div className="item-title">SOCIAL MEDIA NOVICE</div>
              <div className="item-price">$49.99</div>
              <button id="buy-item-2" className="btn">BUY</button>
              <div className="item-description">Slightly increases soda demand</div>
            </div>
            <div className="store-item" id="store-3">
              <div className="item-title">SODA ADMIRAL</div>
              <div className="item-price">$7777.77</div>
              <button id="buy-item-3" className="btn">BUY</button>
              <div className="item-description">
                Mixes sodas at an exemplary rate
              </div>
            </div>

            <div className="store-item" id="store-4">
              <div className="item-title">BIONIC ARM</div>
              <div className="item-price">$300.00</div>
              <button id="buy-item-1" className="btn">BUY</button>
              <div className="item-description">You mix sodas 200% faster</div>
            </div>
            <div className="store-item" id="store-5">
              <div className="item-title">CONTRACT DEAL</div>
              <div className="item-price">$50.00</div>
              <button id="buy-item-2" className="btn">BUY</button>
              <div className="item-description">Straws 20% cheaper</div>
            </div>
            <div className="store-item" id="store-6">
              <div className="item-title">FUNNY CAT</div>
              <div className="item-price">$100.00</div>
              <button id="buy-item-3" className="btn">BUY</button>
              <div className="item-description">
                Improves marketing effectiveness by 30%
              </div>
            </div>
          </div>
          <h2>INVENTORY</h2>
          <div className="inventory">
            <div className="inventory-item">
              <div className="item-title">TRAINING PROGRAM</div>
              <div className="item-description">Soda mixers 15% faster</div>
            </div>
            <div className="inventory-item">
              <div className="item-title">INSIDER DEAL</div>
              <div className="item-description">Syrup 20% cheaper</div>
            </div>
          </div>
          <h2>LEADERBOARD</h2>
          <table className="leaderboard">
            <tr className="leaderboard-data">
              <td>PLAYER1</td>
              <td>(2 wins)</td>
              <td>$500.00</td>
            </tr>
            <tr className="leaderboard-data">
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