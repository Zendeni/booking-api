const userService = require('../services/userService');

const getUsers = async (req, res) => {
  try {
    const { username, email } = req.query;

    const filters = {
      username,
      email,
    };

    const users = await userService.getAllUsers(filters);
    res.json(users);
  } catch (error) {
    console.error('Error in getUsers:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};


const createUser = async (req, res) => {
  try {
    const newUser = await userService.createUser(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getUsers,
  createUser,
};
