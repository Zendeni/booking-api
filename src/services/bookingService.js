const prisma = require('../prisma/client');

const getAllBookings = async (filters = {}) => {
  const { userId } = filters;

  const where = {};

  if (userId) {
    where.userId = userId;
  }

  return await prisma.booking.findMany({
    where,
    include: {
      user: true,
      property: true,
    },
  });
};


const createBooking = async (data) => {
  return await prisma.booking.create({
    data,
    include: {
      user: true,
      property: true,
    },
  });
};

module.exports = {
  getAllBookings,
  createBooking,
};
