const fs = require('fs');
const path = require('path');
const prisma = require('./client');

const readJSON = (filename) => {
  const filePath = path.join(__dirname, '../data', filename);
  const rawData = fs.readFileSync(filePath);
  return JSON.parse(rawData);
};

async function main() {
  const { users } = readJSON('users.json');
  const { hosts } = readJSON('hosts.json');
  const { properties } = readJSON('properties.json');
  const { amenities } = readJSON('amenities.json');
  const { reviews } = readJSON('reviews.json');
  const { bookings } = readJSON('bookings.json');

  // USERS + HOSTS (from hosts.json)
  for (const host of hosts) {
    const userExists = await prisma.user.findUnique({ where: { email: host.email } });

    if (!userExists) {
      const newUser = await prisma.user.create({
        data: {
          id: host.id,
          username: host.username,
          name: host.name,
          email: host.email,
          password: host.password,
          phoneNumber: host.phoneNumber,
          profilePicture: host.profilePicture,
        },
      });

      await prisma.host.create({
        data: {
          id: host.id,
          userId: newUser.id,
          username: host.username,
          password: host.password,
          phoneNumber: host.phoneNumber,
          profilePicture: host.profilePicture,
          aboutMe: host.aboutMe,
        },
      });
    } else {
      console.warn(`⚠️ User already exists: ${host.email}`);
    }
  }

  // AMENITIES
  for (const amenity of amenities) {
    const exists = await prisma.amenity.findUnique({ where: { id: amenity.id } });

    if (!exists) {
      await prisma.amenity.create({
        data: {
          id: amenity.id,
          name: amenity.name,
        },
      });
    } else {
      console.warn(`⚠️ Amenity already exists: ${amenity.name}`);
    }
  }

  // PROPERTIES
  for (const property of properties) {
    const host = await prisma.host.findUnique({ where: { id: property.hostId } });
    const exists = await prisma.property.findUnique({ where: { id: property.id } });

    if (host && !exists) {
      await prisma.property.create({
        data: {
          id: property.id,
          title: property.title,
          description: property.description,
          location: property.location,
          pricePerNight: property.pricePerNight,
          bedroomCount: property.bedroomCount,
          bathRoomCount: property.bathRoomCount,
          maxGuestCount: property.maxGuestCount,
          rating: property.rating,
          hostId: property.hostId,
        },
      });
    } else if (!host) {
      console.warn(`⚠️ Skipping property — host not found: ${property.hostId}`);
    } else {
      console.warn(`⚠️ Property already exists: ${property.id}`);
    }
  }

  // REVIEWS
  for (const review of reviews) {
    const exists = await prisma.review.findUnique({ where: { id: review.id } });

    if (!exists) {
      const user = await prisma.user.findUnique({ where: { id: review.userId } });
      const property = await prisma.property.findUnique({ where: { id: review.propertyId } });

      if (user && property) {
        await prisma.review.create({
          data: {
            id: review.id,
            userId: review.userId,
            propertyId: review.propertyId,
            rating: review.rating,
            comment: review.comment,
          },
        });
      } else {
        console.warn(`⚠️ Skipping review ${review.id} — missing user or property`);
      }
    } else {
      console.warn(`⚠️ Review already exists: ${review.id}`);
    }
  }

  // BOOKINGS
  for (const booking of bookings) {
    const exists = await prisma.booking.findUnique({ where: { id: booking.id } });

    if (!exists) {
      const user = await prisma.user.findUnique({ where: { id: booking.userId } });
      const property = await prisma.property.findUnique({ where: { id: booking.propertyId } });

      if (user && property) {
        await prisma.booking.create({
          data: {
            id: booking.id,
            userId: booking.userId,
            propertyId: booking.propertyId,
            checkinDate: new Date(booking.checkinDate),
            checkoutDate: new Date(booking.checkoutDate),
            numberOfGuests: booking.numberOfGuests,
            totalPrice: booking.totalPrice,
            bookingStatus: booking.bookingStatus,
          },
        });
      } else {
        console.warn(`⚠️ Skipping booking ${booking.id} — missing user or property`);
      }
    } else {
      console.warn(`⚠️ Booking already exists: ${booking.id}`);
    }
  }

  console.log('✅ All data successfully seeded!');
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
