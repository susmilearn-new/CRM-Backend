
const User = require("../models/UserModel");
const bcrypt = require("bcryptjs");

//  Fetch all users
const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("-password");

    res.status(200).json({
      count: users.length,
      users
    });
  } catch (error) {
    next(error);
  }
};

//  Update user
const updateUser = async (req, res, next) => {
  try {
    const { name, email } = req.body;
    const updates = {};

    if (name !== undefined) {
      if (typeof name !== "string" || !name.trim()) {
        return res.status(400).json({
          message: "Name cannot be empty"
        });
      }
      updates.name = name.trim();
    }

    if (email !== undefined) {
      if (
        typeof email !== "string" ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
      ) {
        return res.status(400).json({
          message: "Valid email is required"
        });
      }
      updates.email = email.trim().toLowerCase();
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        message: "Provide name or email to update"
      });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.status(200).json({
      message: "User updated successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        message: "Email already exists"
      });
    }
    next(error);
  }
};

// Delete user
const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.status(200).json({
      message: "User deleted successfully"
    });
  } catch (error) {
    next(error);
  }
};

// Fetch logged-in user's profile
const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
};

// update own profile

const updateMyProfile = async (req, res) => {
  try {
    const { name, email } = req.body;
    const updates = {};

    // Update name only if provided
    if (name !== undefined) {
      if (!name.trim()) {
        return res.status(400).json({
          message: 'Name cannot be empty.',
        });
      }
      updates.name = name.trim();
    }

    // Update email only if provided
    if (email !== undefined) {
      if (!email.trim()) {
        return res.status(400).json({
          message: 'Email cannot be empty.',
        });
      }
      updates.email = email.trim();
    }

    // Check that at least one field is provided
    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        message: 'Please provide a field to update.',
      });
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      updates,
      {
        new: true,
        runValidators: true,
      }
    ).select('-password');

    if (!user) {
      return res.status(404).json({
        message: 'User not found.',
      });
    }

    res.status(200).json({
      message: 'Profile updated successfully.',
      user,
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({
        message: 'This email is already in use.',
      });
    }

    res.status(500).json({
      message: 'Unable to update profile.',
    });
  }
};


module.exports = {
  getAllUsers,
  updateUser,
  deleteUser,
  getUser,
  updateMyProfile
};
