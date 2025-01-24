const User = require('../models/user');

const adminMiddleware = async (req, res, next) => {
  const user = await User.findById(req.user.id);
  if (user.role !== 'admin') {
    return res.status(403).json({ message: 'Permission denied' });
  }
  next();
};

module.exports = adminMiddleware;
