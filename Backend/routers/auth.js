const { checkEmpty, checkDuplicate } = require('../middlewares/validation');
const { authenticate } = require('../middlewares/auth');
const { createUser, changeUserPassword } = require('../controllers/user')
const express = require('express');
const jwt = require('jsonwebtoken');
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const User = require('../models/User');
const CustomAPIError = require('../errors');
const router = express.Router();
const path = require("path");
const envPath = path.join(__dirname, "../.env");

require('dotenv').config({ path: envPath });

// /auth/login

router.post('/signin', async (req, res, next) => {
  try {
    const { username, password } = req.body;

    let user = await User.findOne({ username });

    if (!user) {
      throw new CustomAPIError("This username does not exist, please signup first", 400);
    }

    if (user.password !== password) {
      return res.status(400).json({ message: "Username and password do not match!" });
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

// /auth/request-reset-password
router.post("/request-reset-password", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send("User not found");
    }

    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetTokenExpire = Date.now() + 3600000; // expire in one hour

    // save the token and expire time for this user
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = resetTokenExpire;
    await user.save();

    // configure the reset password invitation email
    const transporter = nodemailer.createTransport({
      service: "gmail", 
      auth: {
        user: "ethanyee1234@gmail.com", 
        pass: process.env.GMAIL_PASS
      }
    });
    const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;
    // send the reset password invitation email
    await transporter.sendMail({
      to: email,
      subject: 'Password Reset',
      text: `Hi ${user.username}, Please click on the following link to reset your password: ${resetUrl}`
    });

    res.send(
      "We have sent the update password link to your email " + email + ", please check that!"
    );
  } catch (error) {
    console.error(error);
    res.status(500).send("Error sending password reset email");
  }
});

// /auth/reset-password
router.post('/reset-password/:token', async (req, res) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }   // $gt means greater than now
    });

    if (!user) {
      return res.status(400).send('Password reset token is invalid or has expired');
    }

    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.send('Your password has been updated');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error resetting password');
  }
});

// /auth/signup
router.post('/signup', checkEmpty, checkDuplicate, createUser);
// /auth/resetPassword
router.put('/resetPassword', authenticate, changeUserPassword);

module.exports = router;
