require('dotenv').config()
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_TOKEN;
const db = require('../../config/dbConnection')

const register = async (req, res) => {
    try {
      const { username, email, password } = req.body;
      
      console.log(req.body)
      // Hashing the user's password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Check if the username already exists in the database
      const query = 'SELECT * FROM users WHERE email = ?';
      const values = [email]
      db.query(query, values, (err, results) => {
        if (err) {
          console.error('Error executing SQL query:', err);
          return res.status(500).json({ message: 'Internal server error' });
        }
        console.log("hey user exists")
        if (results.length > 0) {
          return res.status(400).json({ message: 'Accout already exists' });
        }
  
        // Insert the new user into the database
        const insertQuery = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
        const values = [username, email, hashedPassword]
        db.query(insertQuery, values, (err) => {
          if (err) {
            console.error('Error executing SQL query:', err);
            return res.status(500).json({ message: 'Internal server error' });
          }
          console.log("user Created successfylly--------------------")
          res.status(201).json({ message: 'User registered successfully' });
        });
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Registration failed' });
    }
  }



const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user in the database
    const query = 'SELECT * FROM users WHERE email = ?';
    const values = [email]
    db.query(query, values, async (err, results) => {
      if (err) {
        console.error('Error executing SQL query:', err);
        return res.status(500).json({ message: 'Internal server error' });
      }

      if (results.length === 0) {
        return res.status(401).json({ message: 'Authentication failed' });
      }
      const user = results[0]; // Extracting the User from results

      // Compare the provided password with the hashed password from the database
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ message: 'Authentication failed' });
      }
      // Generate a JWT upon successful login
      const token = jwt.sign({ user_id: user.user_id, email: email, user_type: user.user_type }, SECRET_KEY, {
        expiresIn: '1h',
      });

      res.status(200).json({ message: 'Login successful', token });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Login failed' });
  }
}


const profile = (req, res) => {
  res.json({ message: "Authenticated route", user: req.user });
};


module.exports = {
  login,
  register,
  profile
}