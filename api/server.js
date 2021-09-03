// server configs

const express = require("express");
const db = require("./config/db");
// const User = require("./models/User");

const models = require("./models");

const router = require("./routes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

const e = async () => {
  try {
    await db.sync({ force: false });
    // Code here
    app.listen(3001, () => {
      console.log("server on port 3001");
    });
  } catch (error) {
    console.log(error);
  }
};

e();
