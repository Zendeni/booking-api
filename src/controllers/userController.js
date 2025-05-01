const userService = require('../services/userService');

exports.getAllUsers = async (req, res, next) => {
  try {
    const filters = {};
    if (req.query.username) filters.username = req.query.username;
    if (req.query.email)    filters.email    = req.query.email;
    const list = await userService.getAllUsers(filters);
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};

exports.getUserById = async (req, res, next) => {
  try {
    const u = await userService.getUserById(req.params.id);
    res.status(200).json(u);
  } catch (err) {
    next(err);
  }
};

exports.createUser = async (req, res, next) => {
  try {
    const u = await userService.createUser(req.body);
    res.status(201).json(u);
  } catch (err) {
    next(err);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const u = await userService.updateUser(req.params.id, req.body);
    res.status(200).json(u);
  } catch (err) {
    next(err);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    await userService.deleteUser(req.params.id);
    res.status(200).json({});
  } catch (err) {
    next(err);
  }
};
