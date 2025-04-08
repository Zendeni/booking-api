const prisma = require('../prisma/client');

const getAllUsers = async (filters = {}) => {
  const { username, email } = filters;

  const where = {};

  if (username) {
    where.username = username;
  }

  if (email) {
    where.email = email;
  }

  return await prisma.user.findMany({
    where,
  });
};


const createUser = async (data) => {
  return await prisma.user.create({ data });
};

module.exports = {
  getAllUsers,
  createUser,
};
