// Middleware function to check if the user is authenticated
const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
      // If the user is authenticated, continue to the next middleware
      return next();
    }
  
    // If the user is not authenticated, redirect them to the login page or send an error response
    res.status(401).json({ message: 'Unauthorized' });
  };

  module.exports = isAuthenticated;