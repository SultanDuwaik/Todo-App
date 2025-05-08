module.exports = (req, res, next) => {
    const userId = req.user?.id; // Assume `req.user` is set by your authentication middleware
  
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  
    req.userId = userId; // Attach the userId to the request object for use in routes
    next();
  };
  