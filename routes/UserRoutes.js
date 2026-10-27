
const express = require('express');
const router = express.Router();

const Auth = require('../middleware/Auth');
const requireAdmin = require('../middleware/requireAdmin');

const { getAllUsers, updateUser, deleteUser, getUser, updateMyProfile } = require('../controllers/UserController');

// Any logged-in user can view and update their own profile
router.get('/me', Auth, getUser);
router.put('/me', Auth, updateMyProfile);

// Admin-only user management
router.get('/', Auth, requireAdmin, getAllUsers);
router.put('/:id', Auth, requireAdmin, updateUser);
router.delete('/:id', Auth, requireAdmin, deleteUser);

module.exports = router;
