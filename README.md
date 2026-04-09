# SodaCap

### Elevator pitch

A minimalist 5-minute market simulator for the hottest commodity in happy valley. Buy, make, and sell soda, syrup, and straws to game the market and put the other soda shops out of business. Think Universal Paperclips, but the universe is Provo, and you're directly competing with other players and the clock.

### Design

![Design image](mockup.png)

### Key features

- Secure login over HTTPS
- Simple supply/demand simulation
- Ability to buy and sell 3 key commodities
- Live updating company leaderboards
- Auto-trading companies for people without friends
- Leaderboards reset every 5 minutes
- Persistent win tracking

### Technologies

I am going to use the required technologies in the following ways.

- **HTML** - Classy front end with a page for login and a page for gameplay.
- **CSS** - Simple styling to mantain a clean appearance on all screen sizes.
- **React** - Login, leaderboard and market display, buying and selling functionality.
- **Service** - Endpoints for:
  - Generating market prices based on truly random seeds from random.org
  - Registering, login, and logout
- **DB** - Store users and wins.
- **WebSocket**
  - Submitting and retrieving leaderboard and market changes.
  - Enforcing 5 minute timer.

## 🚀 AWS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Server deployed and accessible with custom domain name** - [My server link](https://sodacap.space).

## 🚀 HTML deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **HTML pages** - Three different pages. `index.html` (Home), `play.html`, and `tutorial.html`
- [x] **Proper HTML element usage** - I included many tags and classes for easy element access later, and tables and lists where necessary.
- [x] **Links** - Links between views.
- [x] **Text** - All pages have written text.
- [x] **3rd party API placeholder** - random.org seeds used for market simulation
- [x] **Images** - SodaCap logo on [main page](https://startup.sodacap.space)
- [x] **Login placeholder** - Placeholder for auth on the login page.
- [x] **DB data placeholder** - Inventory and leaderboard on play page
- [x] **WebSocket placeholder** - Play page has placeholders for timer, store, and market prices.

## 🚀 CSS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Header, footer, and main content body** - 'main.css' is used for tutorial and home, and 'play.css' is the very different styling on the game page.
- [x] **Navigation elements** - Just like in the HTML.
- [x] **Responsive to window resizing** - a LOT of flexbox. and one good media rule.
- [x] **Application elements** - Flexing and boxing
- [x] **Application text content** - I used jetbrains mono for my mockup and it grew on me
- [x] **Application images** - Remade the logo in jetbrains mono and I am quite fond of it

## 🚀 React part 1: Routing deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Bundled using Vite** - No issues here
- [x] **Components** - The particles were absolutely horrible. Most of my time on this assignment was trying to get these to work, and the rest of the time was spent trying to get CSS styling to change depending on the page.
- [x] **Router** - Easy to creating the component routing.

## 🚀 React part 2: Reactivity

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **All functionality implemented or mocked out** - This was a whole mess and the learning curve was a bit tricky. I would have done it all much differently if I could start over, which is a great sign for my learning through the process.
- [x] **Hooks** - Main game loop with useEffect, with useRef for components that need to be preserved and iterated on outside that loop. useState was of course used extensively for all the variables needed to simulate a rudimentary economy.

## 🚀 Service deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Node.js/Express HTTP service** - Installed Express with NPM. Default port on 7000`.
- [x] **Static middleware for frontend** - Simple endpoints in `service/index`.
- [x] **Calls to third party endpoints** - Game calls `timeapi.io` to synchronize the game clock (for deterministic market prices across all clients)
- [x] **Backend service endpoints** - Simple endpoints in `service/index` for accounts and leaderboard.
- [x] **Frontend calls service endpoints** - It sure does!
- [x] **Supports registration, login, logout, and restricted endpoint** - Users can register, blank usernames or passwords are blocked. Users can log in or out. At the endo the game, their score is updated on the global leaderboard, limited to one entry per username. Access to the game is restricted until a user is logged in.

## 🚀 Database deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Node.js/Express HTTP service** - Installed Express with NPM. Default port on 7000`.
- [x] **Static middleware for frontend** - Simple endpoints in `service/index`.
- [x] **Calls to third party endpoints** - Game calls `timeapi.io` to synchronize the game clock (for deterministic market prices across all clients)
- [x] **Backend service endpoints** - Simple endpoints in `service/index` for accounts and leaderboard.
- [x] **Frontend calls service endpoints** - It sure does!
- [x] **Supports registration, login, logout, and restricted endpoint** - Users can register, blank usernames or passwords are blocked. Users can log in or out. At the endo the game, their score is updated on the global leaderboard, limited to one entry per username. Access to the game is restricted until a user is logged in.

## 🚀 DB/Login deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Stores data in MongoDB** - Scores stored in MongoDB from `service/database.js`.
- [x] **Stores credentials in MongoDB** - Auth stored in MongoDB from `service/database.js`.

## 🚀 WebSocket deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Backend listens for WebSocket connection** - Backend webSocket management executed in `service/peerProxy.js`.
- [x] **Frontend makes WebSocket connection** - Backend webSocket management executed in `src/play.jsx`.
- [x] **Data sent over WebSocket connection** - All clients send scores every tick to the server, which sends back a unified leaderboard.
- [x] **WebSocket data displayed** - Live-updating leaderboard is displayed during gameplay, with an all-time leaderboard at the game's end.
- [x] **Application is fully functional** - Email jmdav.uni@gmail.com with any balance suggestions!