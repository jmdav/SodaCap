const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const uuid = require("uuid");
const fs = require("fs");
const path = require("path");

const authCookieName = "token";
const DB_FILE = path.join(__dirname, "db.json");

app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));

const verifyAuth = async (req, res, next) => {
  const user = await findUser("token", req.cookies[authCookieName]);
  if (user) {
    next();
  } else {
    res.status(401).send({ msg: "Unauthorized" });
  }
};

function loadDB() {
  if (fs.existsSync(DB_FILE)) {
    try {
      const data = JSON.parse(fs.readFileSync(DB_FILE, "utf8"));
      return { users: data.users || [], scores: data.scores || [] };
    } catch {}
  }
  return { users: [], scores: [] };
}

function saveDB() {
  fs.writeFileSync(DB_FILE, JSON.stringify({ users, scores }, null, 2));
}

let { users, scores } = loadDB();

let apiRouter = express.Router();
app.use(`/api`, apiRouter);

const port = process.argv.length > 2 ? process.argv[2] : 3000;

function updateScores(newScore) {
  console.log(newScore);
  const normalizedScore = {
    ...newScore,
    score: Number(newScore.score),
  };

  const existingIndex = scores.findIndex(
    (entry) => entry.username === normalizedScore.username,
  );

  console.log(existingIndex);

  if (existingIndex === -1) {
    scores.push(normalizedScore);
  } else if (normalizedScore.score > Number(scores[existingIndex].score)) {
    scores[existingIndex] = normalizedScore;
  }

  scores.sort((a, b) => Number(b.score) - Number(a.score));

  if (scores.length > 20) {
    scores = scores.slice(0, 20);
  }

  return scores;
}

async function createUser(username, password) {
  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    username: username,
    password: passwordHash,
    token: uuid.v4(),
  };
  users.push(user);

  return user;
}

async function findUser(field, value) {
  if (!value) return null;

  return users.find((u) => u[field] === value);
}

function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    secure: false,
    httpOnly: true,
    sameSite: "strict",
  });
}

apiRouter.post("/auth/create", async (req, res) => {
  if (!req.body.username || req.body.username.trim().length == 0) {
    res.status(400).send({ msg: "Invalid username" });
  } else if (!req.body.password || req.body.password.trim().length == 0) {
    res.status(400).send({ msg: "Invalid password" });
  } else if (await findUser("username", req.body.username)) {
    res.status(409).send({ msg: "Existing user" });
  } else {
    const user = await createUser(req.body.username, req.body.password);
    saveDB();
    setAuthCookie(res, user.token);
    res.send({ username: user.username });
  }
});

apiRouter.post("/auth/login", async (req, res) => {
  const user = await findUser("username", req.body.username);
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      user.token = uuid.v4();
      saveDB();
      setAuthCookie(res, user.token);
      res.send({ username: user.username });
      return;
    }
  }
  res.status(401).send({ msg: "Invalid username or password" });
});

apiRouter.get("/scores", (_req, res) => {
  res.send(scores);
});

apiRouter.post("/scores", verifyAuth, (req, res) => {
  const { username, score } = req.body;
  const updated = updateScores({ username, score });
  saveDB();
  res.send(updated);
});

apiRouter.delete("/auth/logout", async (req, res) => {
  const user = await findUser("token", req.cookies[authCookieName]);
  if (user) {
    delete user.token;
  }
  res.clearCookie(authCookieName);
  res.status(204).end();
});

app.use(function (err, req, res, next) {
  res.status(500).send({ type: err.name, message: err.message });
});

app.use((_req, res) => {
  res.sendFile("index.html", { root: "public" });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
