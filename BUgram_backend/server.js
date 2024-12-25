require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const pool = require('./models/db'); 
const cors = require("cors");
const http = require('http');
const { Server } = require('socket.io');
const multer = require('multer'); 
const path = require("path");

const authRoutes = require("./routes/authroutes");
const postRoutes = require("./routes/postroutes");
const userRoutes = require("./routes/userRoutes");

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } }); 

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/auth", authRoutes); // Authentication routes
app.use("/posts", postRoutes); // Posts routes
app.use("/users", userRoutes); // User routes


let users = {};

// The connecion is made for chat server
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Retrieve username from DB using user ID passed during connection
  socket.on('set user', async (userId) => {
      try {
        const [rows] = await pool.query('SELECT username FROM users WHERE id = ?', [userId]);
        if (rows.length > 0) {
            const username = rows[0].username; 
            users[socket.id] = username;  
            console.log(`User ${username} connected with ID ${socket.id}`);
            io.emit('user connected', `${username} has joined the chat.`);
        } else {
            console.log(`No user found for ID: ${userId}`);
            socket.emit('error', 'User not found.');
        }
      } catch (error) {
          console.error('Error fetching username:', error);
      }
  });

  // This is for chat messages
  socket.on('chat message', (msg) => {
      const username = users[socket.id] || "Anonymous";
      const time = new Date().toLocaleTimeString();
      console.log(`Message from ${username}: ${msg}`);
      io.emit('chat message', { username, message: msg, time });
  });

  // This will handle user disconnection
  socket.on('disconnect', () => {
      const username = users[socket.id];
      console.log(`User ${username || "Unknown"} disconnected.`);
      delete users[socket.id];
      io.emit('user disconnected', `${username || "A user"} has left the chat.`);
  });
});

//Backend Node App is running on port 5000
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
//Chat server is running on port 3001
server.listen(3001, () => {
  console.log(`Chat Server running on http://localhost:3001`);
});
//Database is running on port 3306, which is default mySQL port