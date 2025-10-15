
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcryptjs';
import db from '../db.js';

// Local strategy for username/password
passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, async (email, password, done) => {
  try {
    // Find user by email
    const user = await db('users').where({ email }).first();
    
    if (!user) {
      return done(null, false, { message: 'Invalid email or password' });
    }

    // Check password
    const validPassword = await bcrypt.compare(password, user.password);
    
    if (!validPassword) {
      return done(null, false, { message: 'Invalid email or password' });
    }

    // Return user without password
    const { password: _, ...userWithoutPassword } = user;
    return done(null, userWithoutPassword);
  } catch (error) {
    return done(error);
  }
}));

// Serialize user to session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await db('users')
      .where({ id })
      .first()
      .select('id', 'username', 'email', 'created_at');
    
    done(null, user);
  } catch (error) {
    done(error);
  }
});

export default passport;

