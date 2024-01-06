const { checkEmpty, checkDuplicate } = require('../middlewares/validation');
const { authenticate } = require('../middlewares/auth');
const { createUser, changeUserPassword } = require('../controllers/user')
const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const CustomAPIError = require('../errors');
const router = express.Router();

// /auth/login

router.post('/signin', async (req, res, next) => {
  try {
    const { username, password } = req.body;

    let user = await User.findOne({ username });

    if (!user) {
      throw new CustomAPIError('Invalid Credentials', 400);
    }

    if (user.password !== password) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }

    const payload = {
      user: {
        id: user._id
      }
    };

    const token = await jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '30d'
    });

    console.log(`User:${user} login`);
    res.json({ token, isAdmin: user.isAdmin });
  } catch (err) {
    next(err);
  }
});

// /auth/signup
router.post('/signup', checkEmpty, checkDuplicate, createUser);
// /auth/resetPassword
router.put('/resetPassword', authenticate, changeUserPassword);

module.exports = router;
