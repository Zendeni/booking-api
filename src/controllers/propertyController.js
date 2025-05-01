// src/controllers/propertyController.js
const ServiceError      = require('../utils/ServiceError');
const propertyService   = require('../services/propertyService');

exports.getAllProperties = async (req, res, next) => {
  try {
    const list = await propertyService.getAllProperties(req.query);
    res.json(list);                                  // 200 by default
  } catch (err) { next(err); }
};

exports.getPropertyById = async (req, res, next) => {
  try {
    const p = await propertyService.getPropertyById(req.params.id);

    if (!p)                    // service returns null when not found
      return res.status(404).json({ message: 'Property not found' });

    res.json(p);                                   // 200
  } catch (err) { next(err); }
};

exports.createProperty = async (req, res, next) => {
  try {
    const p = await propertyService.createProperty(req.body);
    res.status(201).json(p);                        // 201 Created
  } catch (err) { next(err); }
};

exports.updateProperty = async (req, res, next) => {
  try {
    const p = await propertyService.updateProperty(req.params.id, req.body);

    if (!p)                    // null ⇒ nothing updated
      return res.status(404).json({ message: 'Property not found' });

    res.json(p);                                   // 200
  } catch (err) { next(err); }
};

exports.deleteProperty = async (req, res, next) => {
  try {
    const deleted = await propertyService.deleteProperty(req.params.id);

    if (!deleted)              // false ⇒ nothing deleted
      return res.status(404).json({ message: 'Property not found' });

    res.sendStatus(200);                            // 200 OK (empty body)
  } catch (err) { next(err); }
};
