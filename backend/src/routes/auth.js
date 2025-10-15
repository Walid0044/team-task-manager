
import express from 'express';
import passport from '../config/passport.js';
import bcrypt from 'bcryptjs';
import db from '../db.js';

const router = express.Router();

// Test route - GET /api/auth
router.get('/', (req, res) => {
  res.json({ 
    message: 'Auth routes are working!',
    user: req.user || 'Not authenticated',
    available_endpoints: [
      'POST /api/auth/register',
      'POST /api/auth/login',
      'POST /api/auth/logout'
    ]
  });
});

// User registration
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    const existingUser = await db('users')
      .where({ email })
      .orWhere({ username })
      .first();

    if (existingUser) {
      return res.status(400).json({ 
        message: 'User already exists with this email or username' 
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const [user] = await db('users')
      .insert({
        username,
        email,
        password: hashedPassword
      })
      .returning(['id', 'username', 'email', 'created_at']);

    res.status(201).json({
      message: 'User created successfully',
      user
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ 
      message: 'Error creating user',
      error: error.message 
    });
  }
});

// User login with Passport
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(400).json({ message: info.message });
    }
    
    req.login(user, (err) => {
      if (err) {
        return next(err);
      }
      
      return res.json({
        message: 'Login successful',
        user: req.user
      });
    });
  })(req, res, next);
});

// User logout
router.post('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: 'Error during logout' });
    }
    res.json({ message: 'Logout successful' });
  });
});

// Check authentication status
router.get('/status', (req, res) => {
  res.json({ 
    authenticated: !!req.user,
    user: req.user || null
  });
});

export default router;

