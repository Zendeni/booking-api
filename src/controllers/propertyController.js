const propertyService = require('../services/propertyService');

const getProperties = async (req, res) => {
  try {
    const { location, pricePerNight, amenities } = req.query;

    const filters = {
      location,
      pricePerNight,
      amenities: amenities ? amenities.split(',') : undefined,
    };

    console.log('Filters:', filters);

    const properties = await propertyService.getAllProperties(filters);
    res.json(properties);
  } catch (error) {
    console.error('Error in getProperties:', error);
    res.status(500).json({ error: 'Failed to fetch properties' });
  }
};

const getPropertyById = async (req, res) => {
  try {
    const property = await propertyService.getPropertyById(req.params.id);
    if (!property) {
      return res.status(404).json({ error: 'Property not found' });
    }
    res.json(property);
  } catch (error) {
    console.error('Error in getPropertyById:', error);
    res.status(500).json({ error: 'Failed to fetch property' });
  }
};

const createProperty = async (req, res) => {
  try {
    const property = await propertyService.createProperty(req.body);
    res.status(201).json(property);
  } catch (error) {
    console.error('Error in createProperty:', error);
    res.status(400).json({ error: error.message });
  }
};

const assignAmenitiesToProperty = async (req, res) => {
  const { id: propertyId } = req.params;
  const { amenityIds } = req.body;

  try {
    const updated = await propertyService.assignAmenitiesToProperty(propertyId, amenityIds);
    res.json(updated);
  } catch (error) {
    console.error('Error in assignAmenitiesToProperty:', error);
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getProperties,
  getPropertyById,
  createProperty,
  assignAmenitiesToProperty,
};
