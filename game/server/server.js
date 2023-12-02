import express from "express";
import mysql from "mysql";
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from "body-parser";
import { fileURLToPath } from "url";
import { dirname } from "path";
import dotenv from 'dotenv';
// Determine the directory name
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();

// Middleware
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.static("public"));

app.get("/video", (req, res) => {
  res.sendFile(__dirname + "/public/video.mp4");
});

// Database connection setup
const con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});

con.connect(err => {
    if (err) {
        console.error("Error in SQL connection:", err);
    } else {
        console.log("SQL server Connected");
    }
});

// Routes
app.post('/signup', (req, res) => {
    const sql = "INSERT INTO login (`name`,`username`,`email`,`password`) VALUES (?)";
    const values = [
        req.body.name,
        req.body.username,
        req.body.email,
        req.body.password
    ];
    con.query(sql, [values], (err, data) => {
        if (err) {
            console.error("Database insert error:", err);
            return res.status(500).json({ status: 'Error', message: 'Error in database insertion' });
        }
        return res.json({ status: 'Success', data });
    });
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const query = 'SELECT * FROM login WHERE email = ? AND password = ?';

    con.query(query, [email, password], (err, results) => {
        if (err) {
            console.error("Database query error:", err);
            return res.status(500).json({ status: 'Error', message: 'Error querying database' });
        }
        
        if (results.length === 1) {
            const userId = results[0].id; 
            console.log('Logged in as a User. user ID:', userId);
            return res.status(200).json({ status: 'Success', userId  });
        }

        res.status(401).json({ status: 'Failure', message: 'Invalid credentials' });
    });
});


app.get('/users/:userId', (req, res) => {
    const userId = req.params.userId;
    const sql = 'SELECT * FROM login WHERE id = ?';
  
    con.query(sql, [userId], (error, results) => {
      if (error) {
        console.error('Error fetching user details from the database:', error);
        res.status(500).json({ error: 'Database error' });
      } else if (results.length === 0) {
        res.status(404).json({ error: 'User not found' });
      } else {
        const user = results[0];
        res.json(user);
      }
    });
  });


  // app.post('/storeGameData', (req, res) => {
  //   const { difficulty, score, time, userId } = req.body;
  //   const insertquery = 'INSERT INTO Game1 (game1_difficulty, game1_score, game1_time, userId) VALUES (?, ?, ?, ?)';
  //   const values = [difficulty, score, time, userId];
  //   con.query(insertquery, values, (error, results) => {
  //     if (error) {
  //       console.error('Error storing game data:', error);
  //       res.status(500).send('Error storing game data');
  //     } else {
  //       console.log('Game data stored successfully');
  //       res.status(200).send('Game data stored successfully');
  //     }
  //   });
  // });
  // const sql = "INSERT INTO Game1 (`game1_difficulty`, `game1_score`, `game1_time`, `userId`) VALUES (?, ?, ?, ?)";

app.post('/storeGameData', (req, res) => {
    const sql = "INSERT INTO Game1 (`game1_difficulty`, `game1_score`, `game1_time`, `userId`) VALUES (?, ?, ?, ?)";
    const values = [
        req.body.difficulty, // Corrected key
        req.body.score, // Corrected key
        req.body.time, // Corrected key
        req.body.userId
    ];
    
    con.query(sql, values, (err, data) => {
        if (err) {
            console.error("Database insert error:", err);
            return res.status(500).json({ status: 'Error', message: 'Error in database insertion' });
        }
        return res.json({ status: 'Success', data });
    });
});


app.get('/game1', (req, res) => {
  const userId = req.query.userId;
  if (!userId) {
    return res.status(400).json({ error: 'User ID is required.' });
  }
  const query = 'SELECT game1_difficulty, game1_time, game1_score FROM game1 WHERE userId = 6';
  // , [userId]
  con.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching game statistics:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.json(results);
  });
});


app.post('/submitFeedback', (req, res) => {
  const {  rating, comments } = req.body;
  const insertQuery = 'INSERT INTO feedback ( rating, comments) VALUES (?, ?)';
  const values = [ rating, comments];
  con.query(insertQuery, values, (error, results) => {
      if (error) {
          console.error('Error inserting feedback into the database:', error);
          return res.status(500).json({ error: 'Error inserting feedback' });
      }
      console.log('Feedback submitted successfully');
      res.status(200).json({ message: 'Feedback submitted successfully' });
  });
});


// Start the server
app.listen(process.env.SERVER_PORT, () => {
  console.log("Running");
});

