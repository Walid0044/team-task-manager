
// Require authentication for protected routes
const requireAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ 
    message: 'Authentication required' 
  });
};

// Optional: Get user if authenticated
const optionalAuth = (req, res, next) => {
  res.locals.user = req.user || null;
  next();
};

export { requireAuth, optionalAuth };


