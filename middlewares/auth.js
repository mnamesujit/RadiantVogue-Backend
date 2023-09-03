require('dotenv').config();
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_TOKEN

const checkAuthToken = (req, res, next) => {
  if (!req.header("Authorization")) return res.status(401).json({ message: "Unauthorized" });

  const token = req.header("Authorization").split(" ")[1];
  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: "Forbidden" });
    req.user = user;
    next();
  });
};

module.exports = checkAuthToken