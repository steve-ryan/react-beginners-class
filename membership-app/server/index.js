import { config } from "dotenv";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
config({ path: join(__dirname, "..", ".env") });

import express from "express";
import mysql, { createConnection } from "mysql";
import cors from "cors";
import cookieParser from "cookie-parser";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { error } from "console";

const app = express();
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["POST", "GET", "PUT"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

const conn = mysql.createConnection({
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
});

conn.connect(function (error) {
  if (error) {
    console.log(`Error in connection!` + error);
  } else {
    console.log(`Connected to the database ` + process.env.database);
  }
});

app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const sql = "SELECT * FROM member WHERE email = ?";
  conn.query(sql, [email], (error, result) => {
    if (error) {
      return res.json({ Status: "Error", Error: "Error executing query" });
    }

    if (result.length === 0) {
      return res.json({ Status: "Error", Error: "Wrong Email or Password!" });
    }

    const hashedPassword = result[0].pword;

    // Compare the entered password with the hashed password using bcrypt
    bcrypt.compare(password, hashedPassword, (err, isMatch) => {
      if (err) {
        return res.json({
          Status: "Error",
          Error: "Error in password comparison",
        });
      }

      if (isMatch) {
        const id = result[0].id;

        jwt.sign({ id }, process.env.key, { expiresIn: "1d" }, (err, token) => {
          if (err) {
            return res.json({
              Status: "Error",
              Error: "Error in generating token",
            });
          }
          // Set the token as a cookie in the response
          res.cookie("token", token);
          return res.json({ Status: "Success", message: "Login successful" });
        });
      } else {
        return res.json({ Status: "Error", Error: "Wrong Email or Password!" });
      }
    });
  });
});

app.post("/register", (req, res) => {
  const getLastMembershipNoQuery =
    "SELECT membershipNo FROM member ORDER BY id DESC LIMIT 1";
  conn.query(getLastMembershipNoQuery, (err, rows) => {
    if (err) {
      return res.json({
        Error: "Error in retrieving last membershipNo from the database",
      });
    }

    let lastMembershipNo = 0;
    if (rows.length > 0) {
      lastMembershipNo = parseInt(rows[0].membershipNo);
    }

    // Get the current year and month
    const currentDate = new Date();
    const year = currentDate.getFullYear().toString();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");

    if (
      lastMembershipNo === 0 || // If there is no lastMembershipNo (first entry)
      year !== lastMembershipNo.toString().slice(0, 4) || // New Year
      month !== lastMembershipNo.toString().slice(4, 6) // New Month
    ) {
      // Reset the counter to 1 for new year or month
      lastMembershipNo = parseInt(year + month + "01");
    } else {
      lastMembershipNo++;
    }

    const sql =
      "INSERT INTO member (`membershipNo`, `fname`, `lname`, `surname`, `IDNo`, `phone`, `email`, `pword`, `dob`) VALUES (?)";

    bcrypt.hash(req.body.password.toString(), 10, (err, hash) => {
      if (err) return res.json({ Error: "Error in hashing password" });

      const values = [
        lastMembershipNo,
        req.body.fname,
        req.body.lname,
        req.body.surname,
        req.body.idno,
        req.body.phone,
        req.body.email,
        hash,
        req.body.dob,
      ];

      conn.query(sql, [values], (err, result) => {
        if (err) return res.json({ Error: "Error in our register query" });
        return res.json({ Status: "Success", membershipNo: lastMembershipNo });
      });
    });
  });
});

const verifyMember = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ Error: "Not Authenticated" });
  } else {
    jwt.verify(token, process.env.key, (err, decoded) => {
      if (err) return res.json({ Error: "Wrong token" });
      req.id = decoded.id;
      next();
    });
  }
};

app.get("/dashboard", verifyMember, (req, res) => {
  return res.json({ Status: "Success", id: req.id });
});

app.get("/member/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM member where id = ?";
  conn.query(sql, [id], (err, result) => {
    if (err) return res.json({ Error: "Sql query failed" });
    return res.json({ Status: "Success", Result: result });
  });
});

app.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.json({ Status: "Success..." });
});

app.listen(8001, () => {
  console.log("Server kicked and running!");
});
