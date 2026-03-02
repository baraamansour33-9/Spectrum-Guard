const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "signup"
});

// Function to sanitize user inputs to prevent SQL injection
const sanitizeInput = (input) => {
    return input.replace(/['"\\]/g, '');
};
// POST route voor gebruikersregistratie
app.post('/signup', (req, res) => {
    const { Name, Email, Password } = req.body;

    // Controleer velden aanwezig zijn
    if (!Name || !Email || !Password) {
        return res.status(400).json({ message: "Missing required fields" });
    }

  
  // Sanitize de invoer om SQL-injectie te voorkomen
    const sanitizedEmail = sanitizeInput(Email);

   // Controleer of het e-mailadres al in de database bestaat
    const checkEmailQuery = "SELECT * FROM login WHERE email = ?";

    db.query(checkEmailQuery, [sanitizedEmail], (err, result) => {
        if (err) {
                // Geef een foutmelding terug als er een probleem is met de database
            return res.status(500).json({ message: "Database error" });
        }

        if (result.length > 0) {
                 // Als het e-mailadres al bestaat, stuur een foutmelding terug   
            return res.status(400).json({ message: "E-mail already in use" });
        } else {
             // Als het e-mailadres niet bestaat, voeg de gebruiker toe aan de database
            const insertUserQuery = "INSERT INTO login (`name`, `email`, `password`) VALUES (?, ?, ?)";
            db.query(insertUserQuery, [Name, sanitizedEmail, Password], (insertErr, data) => {
                if (insertErr) {
                    return res.status(500).json({ message: "Error inserting user" });
                }
                return res.status(200).json({ message: "User registered successfully" });
            });
        }
    });
});

app.post('/login', (req, res) => {
    // Input validation
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    // Sanitize inputs to prevent SQL injection
    const sanitizedEmail = sanitizeInput(req.body.email);

    const sql = "SELECT * FROM login WHERE `email` = ? AND `password` = ?";
    db.query(sql, [sanitizedEmail, req.body.password], (err, data) => {
        if (err) {
            // Handle the error appropriately, e.g., log it
            console.error(err);
            return res.status(500).json({ message: "Error during login" });
        }
        if (data.length > 0) {
            return res.json("Success");
        } else {
            return res.json("Fail");
        }
    });
});

app.listen(3002, () => {
    console.log("Listening...");
});

module.exports = { app };
