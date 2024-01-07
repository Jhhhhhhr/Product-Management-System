const User = require('../models/User');

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

const getOneUser = async (req, res) => {
  try {
    const user = await User.findById(req.params?.id);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const createUser = async (req, res) => {
  try {
    const user = new User(req.body);

    await user.save();
    console.log("User created!");
    res.status(201).json({ message: "User created!" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

const changeUserPassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const user = await User.findById(req.user.id);

    if (oldPassword !== user.password) {
      res.status(401).json({ message: "Old password doesn't match!" });
      return;
    }
    user.password = newPassword;
    const result = await user.save();
    console.log(`Change password: ${result}`);
    res.status(201).json({ message: "Password changed!" });
    return;
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: 'Server Error' });
  }

};
const updateUser = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params?.id, req.body);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params?.id);
    res.status(200).json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  getAllUsers,
  getOneUser,
  createUser,
  updateUser,
  deleteUser,
  changeUserPassword
};
