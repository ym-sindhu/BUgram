const express = require("express");
const jwt = require("jsonwebtoken");
const pool = require('../models/db'); 
const app = express();
const router = express.Router();
const multer = require('multer'); 
const path = require("path");
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/'); 
    },
    filename: (req, file, cb) => {
      const user_id = req.body.user_id;  
      const id = req.body.user_id;  
      cb(null,user_id + '-' + Date.now() ); 
    },
  });
  const upload = multer({ storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }});


// Update profile route and upload of profile picture
router.put('/update-profile', upload.single('profilePicture'), async (req, res) => {
    const { userId, email, bio } = req.body;
    const profilePicture = req.file ? req.file.filename : null;
    
    try {
        let query = 'UPDATE users SET ';
        const fields = [];
        const values = [];

        if (email) {
            fields.push('email = ?');
            values.push(email);
        }
        if (bio) {
            fields.push('bio = ?');
            values.push(bio);
        }
        if (profilePicture) {
            fields.push('pfp = ?');
            values.push(profilePicture);
        }

        query += fields.join(', ');
        query += ' WHERE id = ?';
        values.push(userId);

        const [result] = await pool.query(query, values);

        if (result.affectedRows > 0) {
            res.status(200).json({ success: true, message: 'Profile updated successfully' });
        } else {
            res.status(404).json({ success: false, message: 'User not found' });
        }
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});
module.exports = router;