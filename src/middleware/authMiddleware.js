const jwt = require("jsonwebtoken");
const config = require("../config/env");

const authMiddleware = (req, res, next) => {

  const header = req.headers["authorization"];
  const token = header && header.split(" ")[1];

  if (!token)
    return res.status(401).json({ message: "No token" });

  try {

    const decoded = jwt.verify(token, config.jwtSecret);

    req.userId = decoded.id;

    next();

  } catch {

    res.status(403).json({ message: "Invalid token" });

  }

};

module.exports = authMiddleware;