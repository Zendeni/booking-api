const hostService = require('../services/hostService');

const getHosts = async (req, res) => {
  try {
    const { name } = req.query;

    const filters = {
      name,
    };

    const hosts = await hostService.getAllHosts(filters);
    res.json(hosts);
  } catch (error) {
    console.error('Error in getHosts:', error);
    res.status(500).json({ error: 'Failed to fetch hosts' });
  }
};

const getHostById = async (req, res) => {
  const { id } = req.params;
  try {
    const host = await hostService.getHostById(id);
    if (!host) {
      return res.status(404).json({ error: 'Host not found' });
    }
    res.json(host);
  } catch (error) {
    console.error('Error in getHostById:', error);
    res.status(500).json({ error: 'Failed to fetch host' });
  }
};

const createHost = async (req, res) => {
  try {
    const newHost = await hostService.createHost(req.body);
    res.status(201).json(newHost);
  } catch (error) {
    console.error('Error in createHost:', error);
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getHosts,
  getHostById,
  createHost,
};
