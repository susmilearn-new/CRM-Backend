
const express = require("express");
const router = express.Router();

const Auth = require("../middleware/Auth");

const { getAllUsers, updateUser, deleteUser, getUser} = require("../controllers/UserController");

// User CRUD
router.get("/", Auth, getAllUsers);
router.put("/:id", Auth, updateUser);
router.delete("/:id", Auth, deleteUser);

// Logged-in user's profile
router.get("/me", Auth, getUser);

module.exports = router;
