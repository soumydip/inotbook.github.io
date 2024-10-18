const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fatchuser');
const JWT_SECRET = "soumyadip";  // Use a secure key

// ROUTER 1: Create a new user using POST "/api/auth/newuser", no login required
router.post(
  '/newuser',
  [
    // Validation using express-validator
    body('name', 'Name should be at least 3 characters long').isLength({ min: 3 }),
    body('email', 'Invalid email').isEmail(),
    body('password', 'Password should be at least 6 characters long').isLength({ min: 6 })
  ],
  async (req, res) => {
    let success = false;

    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }

    try {
      // Check if email already exists
      const existingUser = await User.findOne({ email: req.body.email });
      if (existingUser) {
        return res.status(400).json({ success, error: "Email already exists" });
      }

      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      // Create a new user
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
      });

      await user.save();

      // Create JWT Token
      const data = {
        user: {
          id: user.id
        }
      };
      const authToken = jwt.sign(data, JWT_SECRET);  //sign a new auth token 

      success = true;
      res.status(201).json({ success, authToken });
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ success, error: "Internal server error" });
    }
  }
);

// ROUTER 2: Login user using POST "/api/auth/login"
router.post(
  '/login',
  [
    body('email', 'Invalid email').isEmail(),
    body('password', 'Password cannot be blank').exists()
  ],
  async (req, res) => {
    let success = false;

    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // Find user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ success, error: "Invalid credentials" });
      }

      // Compare password
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
        return res.status(400).json({ success, error: "Invalid credentials" });
      }

      // If password matches, create JWT Token
      const data = {
        user: {
          id: user.id
        }
      };
      const authToken = jwt.sign(data, JWT_SECRET);

      success = true;
      res.status(200).json({ success, authToken });
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({ success, error: "Internal server error" });
    }
  }
);

// ROUTER 3: Get logged-in user details using POST "/api/auth/getuser" - Login required
router.post('/getuser', fetchuser, async (req, res) => {
  let success = false;
  
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    success = true;
    res.status(200).json({ success, user });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ success, error: "Internal server error" });
  }
});

module.exports = router;
