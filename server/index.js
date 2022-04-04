const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const { encrypt, decrypt } = require("./EncryptionHandler");

require("dotenv").config();

//Session Login
// const bcrypt = require("bcrypt");
// const saltRounds = 10;
// const bodyParser = require("body-parser");
// const cookieParser = require("cookie-parser");
// const session = require("express-session");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  }),
  express.urlencoded({ extended: true }),
  function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
  }
  // cookieParser()
);

const db = mysql.createConnection({
  user: process.env.DATABASE_USER,
  host: process.env.DATABASE_HOST,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
});
app.post("/create-user", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const encryptedPassword = encrypt(password);
  db.query(
    `INSERT INTO users(username,password, password_iv) VALUES(?, ?, ?)`,
    [username, encryptedPassword.password, encryptedPassword.iv],
    (error, rows) => {
      if (error) throw error;
    }
  );
});

app.listen(3002, () => {
  console.log(process.env.DATABASE_HOST);
  console.log("running server on 3002");
});
