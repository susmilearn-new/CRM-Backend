
const User = require('../models/UserModel');

const requireAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(401).json({
        message: 'User not found. Please log in again.'
      });
    }

    if (user.role !== 'admin') {
      return res.status(403).json({
        message: 'Access denied. Admin only.'
      });
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = requireAdmin;
