const prisma = require('../prisma/client');
const ServiceError = require('../utils/ServiceError');

async function getAllAmenities() {
  return prisma.amenity.findMany({ select: { id: true, name: true } });
}

async function getAmenityById(id) {
  if (!id) throw new ServiceError('Amenity ID required', 400);
  const a = await prisma.amenity.findUnique({ where: { id } });
  if (!a) throw new ServiceError('Amenity not found', 404);
  return a;
}

async function createAmenity(data) {
  const { name } = data;
  if (!name) throw new ServiceError('Missing amenity name', 400);
  //const existing = await prisma.amenity.findFirst({ where: { name } });
  //if (existing) throw new ServiceError('Amenity already exists', 409);
  return prisma.amenity.create({ data: { name } });
}

async function updateAmenity(id, data) {
  if (!id) throw new ServiceError('Amenity ID required', 400);
  const existing = await prisma.amenity.findUnique({ where: { id } });
  if (!existing) throw new ServiceError('Amenity not found', 404);
  // if (data.name && data.name !== existing.name) {
  //   const e = await prisma.amenity.findFirst({ where: { name: data.name } });
  //   if (e) throw new ServiceError('Amenity name exists', 409);
  // }
  return prisma.amenity.update({ where: { id }, data });
}

async function deleteAmenity(id) {
  if (!id) throw new ServiceError('Amenity ID required', 400);
  const existing = await prisma.amenity.findUnique({ where: { id } });
  if (!existing) throw new ServiceError('Amenity not found', 404);
  await prisma.amenity.delete({ where: { id } });
}

module.exports = {
  getAllAmenities,
  getAmenityById,
  createAmenity,
  updateAmenity,
  deleteAmenity
};
