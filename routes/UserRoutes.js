
const express = require('express');
const router = express.Router();

const Auth = require('../middleware/Auth');
const requireAdmin = require('../middleware/requireAdmin');

const {
  getAllUsers,
  updateUser,
  deleteUser,
  getUser
} = require('../controllers/UserController');

// Any logged-in user can view their own profile
router.get('/me', Auth, getUser);

// Admin-only user management
router.get('/', Auth, requireAdmin, getAllUsers);
router.put('/:id', Auth, requireAdmin, updateUser);
router.delete('/:id', Auth, requireAdmin, deleteUser);

module.exports = router;
