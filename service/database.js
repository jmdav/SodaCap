const { MongoClient } = require("mongodb");
const config = require("./dbConfig.json");

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db("soda");
const userCollection = db.collection("user");
const scoreCollection = db.collection("score");

(async function testConnection() {
  try {
    await db.command({ ping: 1 });
    console.log(`Connected to database`);
  } catch (ex) {
    console.log(
      `Unable to connect to database with ${url} because ${ex.message}`,
    );
    process.exit(1);
  }
})();

function getUser(username) {
  return userCollection.findOne({ username: username });
}

function getUserByToken(token) {
  return userCollection.findOne({ token: token });
}

async function addUser(user) {
  await userCollection.insertOne(user);
  return userCollection.findOne({ username: user.username });
}

async function updateUser(user) {
  await userCollection.updateOne({ username: user.username }, { $set: user });
}

async function updateUserRemoveAuth(user) {
  await userCollection.updateOne(
    { username: user.username },
    { $unset: { token: 1 } },
  );
}

async function updateScore(score) {
  await scoreCollection.updateOne(
    { username: score.username },
    { $set: score },
    { upsert: true },
  );
  return getHighScores();
}

async function getHighScores() {
  const options = {
    sort: { score: -1 },
    limit: 20,
  };
  const cursor = scoreCollection.find({}, options);
  const scores = await cursor.toArray();
  return scores;
}

module.exports = {
  getUser,
  getUserByToken,
  addUser,
  updateUser,
  updateUserRemoveAuth,
  updateScore,
  getHighScores,
};
