const jwt = require('jsonwebtoken');
const JWT_SECRET = "soumyadip";  //jwt serect token

const fetchuser = (req, res, next) => {
  // Get the user from the JWT token and add it to req object
  const token = req.header('auth-token'); 
  if (!token) {
    return res.status(401).json({ error: "Please authenticate using a valid token" });
  }

  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;  // Extract user data from token
    next();  // Proceed to the next middleware/route handler
  } catch (error) {
    return res.status(401).json({ error: "Please authenticate using a valid token" });
  }
};

module.exports = fetchuser;
