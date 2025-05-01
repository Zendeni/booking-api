const service = require('../services/amenityService');

exports.getAllAmenities = async (req, res, next) => {
  try {
    const amenities = await service.getAllAmenities();
    res.json(amenities);
  } catch (err) {
    next(err);
  }
};

exports.getAmenityById = async (req, res, next) => {
  try {
    const amenity = await service.getAmenityById(req.params.id);
    res.json(amenity);
  } catch (err) {
    next(err);
  }
};

exports.createAmenity = async (req, res, next) => {
  try {
    const a = await service.createAmenity(req.body);
    res.status(201).json(a);
  } catch (err) {
    next(err);
  }
};

exports.updateAmenity = async (req, res, next) => {
  try {
    const u = await service.updateAmenity(req.params.id, req.body);
    res.json(u);
  } catch (err) {
    next(err);
  }
};

exports.deleteAmenity = async (req, res, next) => {
  try {
    await service.deleteAmenity(req.params.id);
    res.json({});
  } catch (err) {
    next(err);
  }
};
