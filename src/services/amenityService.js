const prisma = require('../prisma/client');

const getAllAmenities = async () => {
  return await prisma.amenity.findMany();
};

const createAmenity = async (data) => {
  return await prisma.amenity.create({ data });
};

module.exports = {
  getAllAmenities,
  createAmenity,
};
