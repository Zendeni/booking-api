const hostService = require('../services/hostService');

exports.getAllHosts = async (req, res, next) => {
  try {
    const filters = {};
    if (req.query.username) filters.username = req.query.username;
    if (req.query.name)     filters.name     = req.query.name;
    const list = await hostService.getAllHosts(filters);
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};

exports.getHostById = async (req, res, next) => {
  try {
    const h = await hostService.getHostById(req.params.id);
    res.status(200).json(h);
  } catch (err) {
    next(err);
  }
};

exports.createHost = async (req, res, next) => {
  try {
    // assume `req.user.id` has your authenticated user's ID
    const h = await hostService.createHost(req.body, req.user.id);
    res.status(201).json(h);
  } catch (err) {
    next(err);
  }
};

exports.updateHost = async (req, res, next) => {
  try {
    const h = await hostService.updateHost(req.params.id, req.body);
    res.status(200).json(h);
  } catch (err) {
    next(err);
  }
};

exports.deleteHost = async (req, res, next) => {
  try {
        const ok = await hostService.deleteHost(req.params.id);
        if (!ok) return res.status(404).json({ message: 'Host not found' });
        res.sendStatus(200);          // empty body, success
  } catch (err) {
    next(err);
  }
};
