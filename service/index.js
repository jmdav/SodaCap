const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const uuid = require("uuid");
const fs = require("fs");
const path = require("path");
const DB = require("./database.js");

const authCookieName = "token";

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

let apiRouter = express.Router();
app.use(`/api`, apiRouter);

const port = process.argv.length > 2 ? process.argv[2] : 7000;

async function updateScores(newScore) {
  const normalizedScore = {
    ...newScore,
    score: Number(newScore.score),
  };
  await DB.updateScore(normalizedScore);
  return DB.getHighScores();
}

async function createUser(username, password) {
  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    username: username,
    password: passwordHash,
    token: uuid.v4(),
  };

  return DB.addUser(user);
}

async function findUser(field, value) {
  if (!value) return null;
  if (field == "username") {
    return DB.getUser(value);
  }
  if (field == "token") {
    return DB.getUserByToken(value);
  }
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
    setAuthCookie(res, user.token);
    res.send({ username: user.username });
  }
});

apiRouter.post("/auth/login", async (req, res) => {
  const user = await findUser("username", req.body.username);
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      user.token = uuid.v4();
      await DB.updateUser(user);
      setAuthCookie(res, user.token);
      res.send({ username: user.username });
      return;
    }
  }
  res.status(401).send({ msg: "Invalid username or password" });
});

apiRouter.get("/scores", async (_req, res) => {
  const scores = await DB.getHighScores();
  res.send(scores);
});

apiRouter.post("/scores", verifyAuth, async (req, res) => {
  const { username, score } = req.body;
  const updated = await updateScores({ username, score });
  res.send(updated);
});

apiRouter.delete("/auth/logout", async (req, res) => {
  const user = await findUser("token", req.cookies[authCookieName]);
  if (user) {
    await DB.updateUserRemoveAuth(user);
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
