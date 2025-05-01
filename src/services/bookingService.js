const prisma = require('../prisma/client');
const ServiceError = require('../utils/ServiceError');

async function getAllBookings(filters = {}) {
  return prisma.booking.findMany({
    where:   filters,
    select: {
      id:             true,
      userId:         true,
      propertyId:     true,
      checkinDate:    true,
      checkoutDate:   true,
      numberOfGuests: true,
      totalPrice:     true,
      bookingStatus:  true
    }
  });
}

async function getBookingById(id) {
  if (!id) throw new ServiceError('Booking ID required', 400);
  const b = await prisma.booking.findUnique({ where: { id } });
  if (!b) throw new ServiceError('Booking not found', 404);
  return b;
}

async function createBooking(data) {
  const { userId, propertyId, checkinDate, checkoutDate, totalPrice } = data;
  if (!userId || !propertyId || !checkinDate || !checkoutDate || totalPrice == null) {
    throw new ServiceError('Missing booking fields', 400);
  }
  return prisma.booking.create({
    data: {
      user:            { connect: { id: userId } },
      property:        { connect: { id: propertyId } },
      checkinDate:     new Date(checkinDate),
      checkoutDate:    new Date(checkoutDate),
      totalPrice:      parseFloat(totalPrice)
      // numberOfGuests & bookingStatus default to 1/"pending"
    }
  });
}

async function updateBooking(id, data) {
  if (!id) throw new ServiceError('Booking ID required', 400);
  const existing = await prisma.booking.findUnique({ where: { id } });
  if (!existing) throw new ServiceError('Booking not found', 404);
  const upd = {};
  if (data.startDate)   upd.startDate = new Date(data.startDate);
  if (data.endDate)     upd.endDate   = new Date(data.endDate);
  if (data.totalPrice != null) upd.totalPrice = parseFloat(data.totalPrice);
  return prisma.booking.update({ where: { id }, data: upd });
}

async function deleteBooking(id) {
  if (!id) throw new ServiceError('Booking ID required', 400);
  const existing = await prisma.booking.findUnique({ where: { id } });
  if (!existing) throw new ServiceError('Booking not found', 404);
  await prisma.booking.delete({ where: { id } });
}

module.exports = {
  getAllBookings,
  getBookingById,
  createBooking,
  updateBooking,
  deleteBooking
};
