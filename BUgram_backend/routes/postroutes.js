const express = require("express");
const jwt = require("jsonwebtoken");
const path = require("path");
const pool = require('../models/db'); 
const router = express.Router();
const multer = require('multer');
 
// multer is used to handle images data
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname.replace(/\s+/g, "-")}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }}); // this sets a limit of 5 MBs for uploading imgs by user

// route for creating a new post which may or may not containg images
router.post('/posts', upload.single('image_url'), async (req, res) => {
  const { user_id, content } = req.body;
  const image_url = req.file ? req.file.path : null;
  console.log(image_url);

    if (!user_id || !content) {
        return res.status(400).json({ error: 'user_id and content are required.' });
      }

    try {
      const result = await pool.query(
        "INSERT INTO Posts (user_id, content, image_url) VALUES (?, ?, ?)",
        [user_id, content, image_url]
      );
      res.status(201).json({ message: 'Post created!', postId: result.insertId });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Could not create post.' });
    }
  });


// Route to fetch posts dynamically, 10 at a time, so the server dosnt get overwhelmed
router.get("/posts", async (req, res) => {
    const limit = parseInt(req.query.limit) || 10; 
    const page = parseInt(req.query.page) || 1;
    const offset = (page - 1) * limit;

    try {
      const [posts] = await pool.query(
       ` SELECT 
         p.id AS post_id, 
         p.content, 
         p.image_url, 
         p.created_at, 
         u.username 
       FROM Posts p
       JOIN Users u ON p.user_id = u.id
       ORDER BY p.created_at DESC
       LIMIT ? OFFSET ?`,
       [limit,offset]
      );

      res.status(200).json(posts);
    } catch (error) {
      console.error("Error fetching posts:", error);
      res.status(500).json({ message: "Failed to fetch posts" });
    }
  });

module.exports = router;