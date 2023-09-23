import express from "express";
// import sql from "./db.js";
import cors from "cors";
// import bcrypt from "bcrypt";
// import pgPromise from "pg-promise";
import routes from './routes/index.js';
// const pgp = pgPromise();
// const connectionOptions = {
//   connectionString: process.env.DATABASE_URL,
//   ssl: {
//     rejectUnauthorized: false,
//   },
// };
// const db = pgp(connectionOptions);
const app = express();
app.use(cors());

app.use(express.json());
app.use(routes)

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
