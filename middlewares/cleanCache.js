const { clearHash } = require('../services/cache');

// Middleware for Redis cache
module.exports = async (req, res, next) => {
  await next();
  clearHash(req.user.id);
};
