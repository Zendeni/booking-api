const prisma = require('../prisma/client');

const getAllProperties = async (filters = {}) => {
  const { location, pricePerNight, amenities } = filters;

  const where = {};

  if (location) {
    where.location = {
      contains: location,
    };
  }

  if (pricePerNight) {
    where.pricePerNight = {
      lte: parseFloat(pricePerNight),
    };
  }

  if (amenities && Array.isArray(amenities)) {
    where.amenities = {
      some: {
        id: {
          in: amenities,
        },
      },
    };
  }

  return await prisma.property.findMany({
    where,
    include: {
      amenities: true,
      host: {
        include: {
          user: true,
        },
      },
      bookings: true,
      reviews: true,
    },
  });
};

const getPropertyById = async (id) => {
  return await prisma.property.findUnique({
    where: { id },
    include: {
      amenities: true,
      host: {
        include: {
          user: true,
        },
      },
      bookings: true,
      reviews: true,
    },
  });
};

const createProperty = async (data) => {
  return await prisma.property.create({ data });
};

const assignAmenitiesToProperty = async (propertyId, amenityIds) => {
  return await prisma.property.update({
    where: { id: propertyId },
    data: {
      amenities: {
        set: [],
        connect: amenityIds.map((id) => ({ id })),
      },
    },
    include: {
      amenities: true,
    },
  });
};

module.exports = {
  getAllProperties,
  getPropertyById,
  createProperty,
  assignAmenitiesToProperty,
};
