const amenityService = require('../services/amenityService');

const getAmenities = async (req, res) => {
  try {
    const amenities = await amenityService.getAllAmenities();
    res.json(amenities);
  } catch (error) {
    console.error('Error in getAmenities:', error);
    res.status(500).json({ error: 'Failed to fetch amenities' });
  }
};

const createAmenity = async (req, res) => {
  try {
    const amenity = await amenityService.createAmenity(req.body);
    res.status(201).json(amenity);
  } catch (error) {
    console.error('Error in createAmenity:', error);
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getAmenities,
  createAmenity,
};
