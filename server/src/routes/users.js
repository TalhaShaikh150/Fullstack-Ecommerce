const express = require('express');
const router = express.Router();
const { User } = require('../model/userSchema');
const { AuthMiddleWare, AdminMiddleWare } = require('../middleware/auth');

// 1. GET ALL USERS (Admin Only)
router.get('/', AuthMiddleWare, AdminMiddleWare, async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// 2. DELETE USER (Admin Only)
router.delete('/:id', AuthMiddleWare, AdminMiddleWare, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      if (user.role === 'admin') {
        return res.status(400).json({ message: 'Cannot delete admin user' });
      }
      await user.deleteOne();
      res.json({ message: 'User removed' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;