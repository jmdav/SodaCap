<!doctype html>

<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>SodaCap - Tutorial</title>
    <link rel="icon" href="favicon.ico" />
    <link rel="stylesheet" href="main.css" />
    <link href="https://fonts.googleapis.com" rel="stylesheet" />
    <script>
      setTimeout(() => {
        document.querySelector(".preload").classList.toggle("preload");
      }, 1000);
    </script>
    <script src="https://cdn.jsdelivr.net/npm/particles.js@2.0.0/particles.min.js"></script>
  </head>

  <body class="preload">
    <div id="particles-js"></div>
    <div class="content">
      <header>
        <img class="logo" src="sodacap.png" width="400px" alt="SodaCap" />
        <nav>
          <menu class="main-nav">
            <a href="index.html">Home</a>
            <a href="play.html">Play</a>
            <a href="tutorial.html">About</a>
          </menu>
        </nav>
      </header>
      <h2>Welcome to SODACAP(ITALISM)!</h2>
      <p>The game is simple: earn as much <b>liquid capital</b> as you can before 5 minutes are up.</p>
      <ul>
        <li>Earn money by selling <b>sodas</b></li>
        <li>Mix sodas by combining 1 <b>straw</b> and 1 <b>syrup</b></li>
        <li>Buy supplies and set the right soda price to turn a profit!</li>
      </ul>
    </main>

 <footer>
      <span class="text-reset">Game by James Davies</span>
      <a href="https://github.com/jmdav/soda">GitHub</a>
      <a href="https://vincentgarreau.com/particles.js/">particles-js</a>
    </footer>
  </body>

  <script>
    particlesJS.load("particles-js", "particles.json", function () {
      console.log("particles-js config loaded");
    });
  </script>
</html>