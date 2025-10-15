
import session from 'express-session';
import pgSession from 'connect-pg-simple';
import { sessionPool } from './database.js';

const PostgresSessionStore = pgSession(session);

const sessionConfig = {
  store: new PostgresSessionStore({
    pool: sessionPool,
    tableName: 'session',
    createTableIfMissing: true
  }),
  secret: process.env.SESSION_SECRET || 'fallback-secret-change-in-production',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    maxAge: 1000 * 60 * 60 * 24, // 24 hours
    httpOnly: true,
    sameSite: 'lax'
  }
};

export default sessionConfig;

