const prisma      = require('../prisma/client');
const ServiceError = require('../utils/ServiceError');

async function getAllUsers(filters = {}) {
  return prisma.user.findMany({
    where: filters,
    select: {
      id:           true,
      username:     true,
      name:         true,
      email:        true,
      phoneNumber:  true,
      profilePicture: true
    }
  });
}

async function getUserById(id) {
  if (!id) throw new ServiceError('User ID required', 400);
  const u = await prisma.user.findUnique({
    where: { id },
    select: {
      id:           true,
      username:     true,
      name:         true,
      email:        true,
      phoneNumber:  true,
      profilePicture: true
    }
  });
  if (!u) throw new ServiceError('User not found', 404);
  return u;
}

async function createUser(data) {
  const { username, email, password, name, phoneNumber, profilePicture } = data;
  if (!username || !email || !password) {
    throw new ServiceError('Missing user fields', 400);
  }
  
  const conflict = await prisma.user.findFirst({
          where: { username }
        });
  if (conflict) {
    throw new ServiceError('Email or username already exists', 409);
  }
  return prisma.user.create({
    data: { username, email, password, name, phoneNumber, profilePicture }
  });
}

async function updateUser(id, data) {
    if (!id) throw new ServiceError('User ID required', 400);
    // 1) check existence
    const existing = await prisma.user.findUnique({ where: { id } });
    if (!existing) throw new ServiceError('User not found', 404);

  return prisma.user.update({
    where: { id },
    data
  });
}


async function deleteUser(id) {
    if (!id) throw new ServiceError('User ID required', 400);
    // 1) check existence
    const existing = await prisma.user.findUnique({ where: { id } });
    if (!existing) throw new ServiceError('User not found', 404);
    // cascade & delete
    return prisma.user.delete({ where: { id } });
}


module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};
