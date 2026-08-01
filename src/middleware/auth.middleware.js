const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];  // Bearer token
    if (!token) {
      return res.status(401).json({ success: false, message: "Authentication required" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ success: false, message: "User not found" });
    }

    req.user = user; // attach user to request
    next();

  } catch (error) {
    return res.status(401).json({ success: false, message: "Authentication failed" });
  }
};

module.exports = isAuthenticated;
