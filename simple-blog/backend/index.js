import cors from "cors";
import mysql from "mysql";
import express from "express";
import { config } from "dotenv";
import multer from "multer";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import { fileURLToPath } from "url";
import path, { join, dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
config({ path: join(__dirname, "..", ".env") });

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
app.use(express.static("public"));

//create connection
const conn = mysql.createConnection({
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
});

conn.connect((error) => {
  if (error) {
    console.log(`Error occurred` + error);
  } else {
    console.log(`Database connected successfully`);
  }
});

const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, "public/profile");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
});

// users register
app.post("/register", upload.single("image"), (req, res) => {
  const duplicateEmail = "SELECT COUNT(*) AS count FROM user WHERE email = ?";
  const sql =
    "INSERT INTO user (`name`,`email`,`dpImage`,`tagline`,`password`) VALUES (?)";

  conn.query(duplicateEmail, [req.body.email], (err, result) => {
    if (err) {
      return res.json({ Error: "Error when checking email existence" });
    }

    const emailExists = result[0].count > 0;

    if (emailExists) {
      return res.json({ Error: "Email already exists" });
    }

    bcrypt.hash(req.body.password.toString(), 10, (err, hash) => {
      if (err) {
        return res.json({ Error: "Error in hashing password" });
      }

      const values = [
        req.body.name,
        req.body.email,
        req.file.filename,
        req.body.tagline,
        hash,
      ];

      conn.query(sql, [values], (err, result) => {
        if (err) return res.json({ Error: "Error when registering occurred" });
        return res.json({ Status: "Success" });
      });
    });
  });
});

//user login
app.post("/login", (req, res) => {
  const getUser = "SELECT * FROM user WHERE email = ?";
  conn.query(getUser, [req.body.email], (err, result) => {
    if (err) {
      return res.status(500).json({ Error: "Server error!" });
    }
    const user = result.length > 0;

    if (!user) {
      return res.json({ Error: "User doesn't exit!" });
    }

    bcrypt.compare(req.body.password, result[0].password, (err, isMatch) => {
      if (err) {
        return res.status(500).json({ Error: "Password comparison error!" });
      }

      if (!isMatch) {
        return res.status(401).json({ Error: "Invalid credentials!" });
      }

      const token = jwt.sign(
        { email: result[0].email, role: result[0].role },
        process.env.key,
        { expiresIn: "2h" }
      );

      //Redirect user based on their role
      if (result[0].role === "writer") {
        return res.json({ token, redirect: "/writer-dash" });
      } else if (result[0].role === "admin") {
        return res.json({ token, redirect: "/admin-dash" });
      } else {
        return res.status(403).json({ Error: "Unknown role!" });
      }
    });
  });
});

app.get("/writer-dash", (req, res) => {
  res.json({ message: "Welcome to the Writer Dashboard!" });
});

// Sample route for the admin dashboard
app.get("/admin-dash", (req, res) => {
  res.json({ message: "Welcome to the Admin Dashboard!" });
});

// Admin
app.post("/post", (req, res) => {
  // Implement the functionality for the admin endpoint here
});

// Implement the functionality for the writer endpoint here

// Implement the functionality for the post endpoint here

// Implement the functionality for the logout endpoint here
app.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.json({ status: "Success", message: "Logged out successfully." });
});

app.listen(5000, () => {
  console.log("App running on port 5000");
});
