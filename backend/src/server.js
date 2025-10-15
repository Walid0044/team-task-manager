
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import session from 'express-session';
import db from './db.js';
import passport from './config/passport.js';
import sessionConfig from './config/session.js';
import authRoutes from './routes/auth.js';
import teamsRoutes from './routes/teams.js';
import tasksRoutes from './routes/tasks.js';
import { requireAuth } from './middleware/auth.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Add db to request context
app.use((req, res, next) => {
  req.db = db;
  next();
});

// Middleware
app.use(helmet());
app.use(cors({
  origin: 'http://localhost:5173', // Frontend URL
  credentials: true, // Important for sessions
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Session middleware (must come before passport)
app.use(session(sessionConfig));

// Passport middleware (must come after session)
app.use(passport.initialize());
app.use(passport.session());

// Public routes
app.use('/api/auth', authRoutes);

// Protected routes (require authentication)
app.use('/api/teams', requireAuth, teamsRoutes);
app.use('/api/tasks', requireAuth, tasksRoutes);

// Basic route to test server
app.get('/api/health', (req, res) => {
  res.json({ 
    message: 'Team Task Manager API is running!',
    timestamp: new Date().toISOString(),
    user: req.user || 'Not authenticated'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV}`);
  console.log(`🔐 Session authentication enabled`);
  console.log(`🌐 Health: http://localhost:${PORT}/api/health`);
  console.log(`🔐 Auth: http://localhost:${PORT}/api/auth`);
  console.log(`👥 Teams: http://localhost:${PORT}/api/teams`);
  console.log(`✅ Tasks: http://localhost:${PORT}/api/tasks`);
  console.log('');
  console.log(`📋 Available endpoints:`);
  console.log(`   POST /api/auth/register - Register user`);
  console.log(`   POST /api/auth/login - Login user`);
  console.log(`   POST /api/auth/logout - Logout user`);
  console.log(`   GET  /api/auth/status - Check auth status`);
  console.log(`   GET  /api/teams - Get user's teams`);
  console.log(`   POST /api/teams - Create team`);
  console.log(`   GET  /api/tasks - Get user's tasks`);
  console.log(`   POST /api/tasks - Create task`);
});

