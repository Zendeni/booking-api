const prisma = require('../prisma/client');
const ServiceError = require('../utils/ServiceError');

async function getAllReviews() {
  return prisma.review.findMany();
}

async function getReviewById(id) {
  if (!id) throw new ServiceError('Review ID required', 400);
  const r = await prisma.review.findUnique({ where: { id } });
  if (!r) throw new ServiceError('Review not found', 404);
  return r;
}

async function createReview(data) {
  const { userId, propertyId, rating, comment } = data;
  if (!userId || !propertyId || rating == null) {
    throw new ServiceError('Missing review fields', 400);
  }
  return prisma.review.create({
    data: {
      user:     { connect: { id: userId } },
      property: { connect: { id: propertyId } },
      rating:   parseInt(rating, 10),
      comment
    }
  });
}

async function updateReview(id, data) {
  if (!id) throw new ServiceError('Review ID required', 400);
  const existing = await prisma.review.findUnique({ where: { id } });
  if (!existing) throw new ServiceError('Review not found', 404);
  const upd = {};
  if (data.rating != null) upd.rating  = parseInt(data.rating, 10);
  if (data.comment)        upd.comment = data.comment;
  return prisma.review.update({ where: { id }, data: upd });
}

async function deleteReview(id) {
  if (!id) throw new ServiceError('Review ID required', 400);
  const existing = await prisma.review.findUnique({ where: { id } });
  if (!existing) throw new ServiceError('Review not found', 404);
  await prisma.review.delete({ where: { id } });
}

module.exports = {
  getAllReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview
};
