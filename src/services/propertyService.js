// src/services/propertyService.js

const prisma       = require('../prisma/client');
const ServiceError = require('../utils/ServiceError');

async function getAllProperties(filters = {}) {
  const where = {};
  if (filters.location) where.location = { contains: filters.location };
  if (filters.pricePerNight) where.pricePerNight = Number(filters.pricePerNight);
  if (filters.amenities) {
    where.amenities = { some: { name: filters.amenities } };
  }
  return prisma.property.findMany({
    where,
    include: { amenities: true, reviews: true }
  });
}

async function getPropertyById(id) {
  if (!id) throw new ServiceError('Property ID required', 400);
  const p = await prisma.property.findUnique({
    where: { id },
    include: { amenities: true, reviews: true }
  });
  if (!p) throw new ServiceError('Property not found', 404);
  return p;
}

async function createProperty(data) {
  const {
    title, location, description,
    pricePerNight, maxGuestCount,
    bedroomCount, bathRoomCount,
    hostId, amenityIds = []
  } = data;
  if (!title || !location || !hostId) {
    throw new ServiceError('Missing property fields', 400);
  }
  return prisma.property.create({
    data: {
      title,
      location,
      description,
      pricePerNight: Number(pricePerNight),
      maxGuestCount: Number(maxGuestCount),
      bedroomCount:  Number(bedroomCount),
      bathRoomCount: Number(bathRoomCount),
      host:          { connect: { id: hostId } },
      amenities:     { connect: amenityIds.map(aid => ({ id: aid })) },
      rating:        0         // ensure schema-default satisfaction
    },
    include: { amenities: true, reviews: true }
  });
}

async function updateProperty(id, data) {
  if (!id) throw new ServiceError('Property ID required', 400);
  try {
    return await prisma.property.update({
      where: { id },
      data: {
        ...data,
        ...(data.bathRoomCount !== undefined && {
          bathRoomCount: Number(data.bathRoomCount)
        }),
        ...(data.amenityIds && {
          amenities: {
            set: (data.amenityIds || []).map(aid => ({ id: aid }))
          }
        }),
        ...(data.rating != null && { rating: Number(data.rating) })
      },
      include: { amenities: true, reviews: true }
    });
  } catch (err) {
    // convert Prisma’s “not found” to our 404
    if (err.code === 'P2025') {
      throw new ServiceError('Property not found', 404);
    }
    throw err;
  }
}

async function deleteProperty(id) {
  if (!id) throw new ServiceError('Property ID required', 400);

  try {
    await prisma.property.delete({ where: { id } });
    return true;                       // really deleted
  } catch (err) {
    if (err.code === 'P2025')          // record does not exist
      return false;

    throw err;                         // anything else → 500
  }
}

module.exports = {
  getAllProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty
};
