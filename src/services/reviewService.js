const prisma = require('../prisma/client');

const createReview = async (data) => {
  return await prisma.review.create({
    data,
    include: {
      user: true,
      property: true,
    },
  });
};

module.exports = {
  createReview,
};
