import express, { json } from 'express';
const app = express();
import cookieParser from 'cookie-parser';
import bcrypt from 'bcryptjs';
import uuid from 'uuid';
app.use(json());

let users = [];
let scores = [];

let apiRouter = express.Router();
app.use(`/api`, apiRouter);

const port = process.argv.length > 2 ? process.argv[2] : 3000;

app.get('/{*path}', (_req, res) => {
  res.send({ msg: 'Simon service' });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});