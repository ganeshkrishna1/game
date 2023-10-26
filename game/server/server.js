import express from "express";
import mysql from "mysql";
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from "body-parser";

const app = express();

// Middleware
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json());

// Database connection setup
const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "game",
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
            return res.status(200).json({ status: 'Success' });
        }

        res.status(401).json({ status: 'Failure', message: 'Invalid credentials' });
    });
});

// Start the server
app.listen(8081, () => {
    console.log("Server running on port 8081");
});
