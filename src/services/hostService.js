// src/services/hostService.js
const prisma       = require('../prisma/client');
const ServiceError = require('../utils/ServiceError');

/**
 * GET /hosts
 * A thin wrapper around prisma.findMany that accepts arbitrary filters.
 */
async function getAllHosts(filters = {}) {
  return prisma.host.findMany({
    where: filters,
    select: {
      id:             true,
      name:           true,
      username:       true,
      email:          true,
      phoneNumber:    true,
      profilePicture: true,
      aboutMe:        true,
      userId:         true,
      properties:     true          // the listings stay even after host delete
    }
  });
}

/**
 * GET /hosts/:id
 */
async function getHostById(id) {
  if (!id) throw new ServiceError('Host ID required', 400);

  const host = await prisma.host.findUnique({
    where: { id },
    select: {
      id:             true,
      name:           true,
      username:       true,
      email:          true,
      phoneNumber:    true,
      profilePicture: true,
      aboutMe:        true,
      userId:         true,
      properties:     true
    }
  });

  if (!host) throw new ServiceError('Host not found', 404);
  return host;
}

/**
 * POST /hosts
 * `userId` is injected by the controller (taken from the JWT).
 */
async function createHost(data, userId) {
  const { username, email, name, password,
          phoneNumber, profilePicture, aboutMe } = data;

  if (!username || !email)
    throw new ServiceError('Missing host fields', 400);
  const duplicateUsername = await prisma.host.findFirst({ where: { username } });
   if (duplicateUsername)
     throw new ServiceError('Username already exists', 409);


  return prisma.host.create({
    data: {
      name,
      username,
      email,
      password,          // assuming it is already hashed upstream
      phoneNumber,
      profilePicture,
      aboutMe,
      user: { connect: { id: userId } }
    }
  });
}

/**
 * PUT /hosts/:id
 */
async function updateHost(id, data) {
  if (!id) throw new ServiceError('Host ID required', 400);

  try {
    return await prisma.host.update({
      where: { id },
      data
    });
  } catch (err) {
    if (err.code === 'P2025')                // record not found
      throw new ServiceError('Host not found', 404);
    throw err;                               // bubble up → 500
  }
}

/**
 * DELETE /hosts/:id
 * Only the host row is deleted – Prisma sets `hostId = NULL`
 * on every related Property because the relation now has
 * `onDelete: SetNull`.
 */
async function deleteHost(id) {
  if (!id) throw new ServiceError('Host ID required', 400);

  try {
    await prisma.host.delete({ where: { id } });
    return true;                              // successfully deleted
  } catch (err) {
    if (err.code === 'P2025')
      return false;                           // didn’t exist
    throw err;
  }
}

module.exports = {
  getAllHosts,
  getHostById,
  createHost,
  updateHost,
  deleteHost
};
