import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const prisma = new PrismaClient();

// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  // Load JSON files
  const users = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../src/data/users.json'), 'utf-8')).users;
  const amenities = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../src/data/amenities.json'), 'utf-8')).amenities;
  const bookings = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../src/data/bookings.json'), 'utf-8')).bookings;
  const hosts = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../src/data/hosts.json'), 'utf-8')).hosts;
  const properties = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../src/data/properties.json'), 'utf-8')).properties;
  const reviews = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../src/data/reviews.json'), 'utf-8')).reviews;

  // Seed Users
  for (const user of users) {
    await prisma.user.upsert({
      where: { id: user.id },
      update: {},
      create: {
        id: user.id,
        username: user.username,
        password: user.password,
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        profilePicture: user.profilePicture,
      },
    });
  }

  // Seed Amenities
  for (const amenity of amenities) {
    await prisma.amenity.upsert({
      where: { id: amenity.id },
      update: {},
      create: {
        id: amenity.id,
        name: amenity.name,
      },
    });
  }

  // Seed Hosts
  for (const host of hosts) {
    await prisma.host.upsert({
      where: { id: host.id },
      update: {},
      create: {
        id: host.id,
        username: host.username,
        password: host.password,
        name: host.name,
        email: host.email,
        phoneNumber: host.phoneNumber,
        profilePicture: host.profilePicture,
        aboutMe: host.aboutMe,
      },
    });
  }

  // Seed Properties
  for (const property of properties) {
    await prisma.property.upsert({
      where: { id: property.id },
      update: {},
      create: {
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
  }

  // Seed Bookings
  for (const booking of bookings) {
    await prisma.booking.upsert({
      where: { id: booking.id },
      update: {},
      create: {
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
  }

  // Seed Reviews
  for (const review of reviews) {
    await prisma.review.upsert({
      where: { id: review.id },
      update: {},
      create: {
        id: review.id,
        userId: review.userId,
        propertyId: review.propertyId,
        rating: review.rating,
        comment: review.comment,
      },
    });
  }

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
