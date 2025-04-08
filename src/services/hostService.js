const prisma = require('../prisma/client');

const getAllHosts = async (filters = {}) => {
  const { name } = filters;

  const where = {};

  if (name) {
    where.user = {
      name: {
        contains: name,
        //mode: 'insensitive',
      },
    };
  }

  return await prisma.host.findMany({
    where,
    include: {
      user: true,
      properties: true,
    },
  });
};


const getHostById = async (id) => {
  return await prisma.host.findUnique({
    where: { id },
    include: {
      user: true,
      properties: true,
    },
  });
};


const createHost = async (data) => {
  return await prisma.host.create({
    data,
    include: {
      user: true,
    },
  });
};

module.exports = {
  getAllHosts,
  createHost,
};
