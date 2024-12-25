const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const path = require("path");
const pool = require("../models/db"); 

const router = express.Router();

// Signup Route
router.post("/signup", async (req, res) => {
  try {
    const { username, age, gender, department, email, password } = req.body;

    // Check if the email already exists
    const [existingUser] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
    if (existingUser.length > 0) {
      return res.status(400).json({ message: "Email is already registered!" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Insert the new user into the database
    await pool.query(
      "INSERT INTO users (username, age, gender, department, email, password) VALUES (?, ?, ?, ?, ?, ?)",
      [username, age, gender, department, email, hashedPassword]
    );

    res.status(201).json({ message: "User registered successfully! Please Login to Continue", redirectTo: "/login/login.html" });

  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ message: "An error occurred during signup. Please try again later." });
  }
});

// User Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    // Check if user exists
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);

    if (rows.length === 0) return res.status(404).json({ error: "User not found" });

    const user = rows[0];
    
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) return res.status(401).json({ error: "Invalid credentials" });

    const id = user.id;
    const userName = user.username;
    const bio = user.bio;
    const userEmail = user.email;
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ message: "Login successful!", token , id, userName, bio, userEmail, redirectTo: "/feed/feed.html"});
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = router;