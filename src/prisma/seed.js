// src/prisma/seed.js
const { PrismaClient } = require('@prisma/client')
const fs = require('fs')
const path = require('path')
const jwt = require('jsonwebtoken')

const prisma = new PrismaClient()

function readJSON(filename) {
  return JSON.parse(
    fs.readFileSync(path.join(__dirname, '..', 'data', filename), 'utf-8')
  )
}

async function main() {
  // 1) USERS
  const { users } = readJSON('users.json')
  for (const u of users) {
    await prisma.user.upsert({
      where: { id: u.id },
      update: {
        username:      u.username,
        password:      u.password,
        name:          u.name || u.username,
        email:         u.email,
        phoneNumber:   u.phoneNumber,
        profilePicture:u.profilePicture,
      },
      create: {
        id:            u.id,
        username:      u.username,
        password:      u.password,
        name:          u.name || u.username,
        email:         u.email,
        phoneNumber:   u.phoneNumber,
        profilePicture:u.profilePicture,
      }
    })
  }
  console.log('✅ Seeded users')

  // 2) HOSTS (and their user account)
  const { hosts } = readJSON('hosts.json')
  for (const h of hosts) {
    // ensure a User record exists for this host
    const hostUser = await prisma.user.upsert({
      where: { username: h.username },
      update: {
        password:      h.password,
        name:          h.name,
        email:         h.email,
        phoneNumber:   h.phoneNumber,
        profilePicture:h.profilePicture,
      },
      create: {
        username:      h.username,
        password:      h.password,
        name:          h.name,
        email:         h.email,
        phoneNumber:   h.phoneNumber,
        profilePicture:h.profilePicture,
      }
    })
    // upsert Host linked to that user
    await prisma.host.upsert({
      where: { id: h.id },
      update: {
        userId:        hostUser.id,
        username:      h.username,
        password:      h.password,
        name:          h.name,
        email:         h.email,
        phoneNumber:   h.phoneNumber,
        profilePicture:h.profilePicture,
        aboutMe:       h.aboutMe,
      },
      create: {
        id:            h.id,
        userId:        hostUser.id,
        username:      h.username,
        password:      h.password,
        name:          h.name,
        email:         h.email,
        phoneNumber:   h.phoneNumber,
        profilePicture:h.profilePicture,
        aboutMe:       h.aboutMe,
      }
    })
  }
  console.log('✅ Seeded hosts')

  // 3) PROPERTIES
  const { properties } = readJSON('properties.json')
  for (const p of properties) {
    await prisma.property.upsert({
      where: { id: p.id },
      update: {
        title:         p.title,
        description:   p.description,
        location:      p.location,
        pricePerNight: p.pricePerNight,
        bedroomCount:  p.bedroomCount,
        bathRoomCount: p.bathRoomCount,
        maxGuestCount: p.maxGuestCount,
        rating:        p.rating,
        hostId:        p.hostId,
      },
      create: {
        id:            p.id,
        title:         p.title,
        description:   p.description,
        location:      p.location,
        pricePerNight: p.pricePerNight,
        bedroomCount:  p.bedroomCount,
        bathRoomCount: p.bathRoomCount,
        maxGuestCount: p.maxGuestCount,
        rating:        p.rating,
        hostId:        p.hostId,
      }
    })
  }
  console.log('✅ Seeded properties')

  // 4) AMENITIES
  const { amenities } = readJSON('amenities.json')
  for (const a of amenities) {
    await prisma.amenity.upsert({
      where: { id: a.id },
      update: { name: a.name },
      create: { id: a.id, name: a.name }
    })
  }
  console.log('✅ Seeded amenities')

  // 5) BOOKINGS
  const { bookings } = readJSON('bookings.json')
  for (const b of bookings) {
    await prisma.booking.upsert({
      where: { id: b.id },
      update: {
        userId:        b.userId,
        propertyId:    b.propertyId,
        checkinDate:   new Date(b.checkinDate),
        checkoutDate:  new Date(b.checkoutDate),
        numberOfGuests:b.numberOfGuests,
        totalPrice:    b.totalPrice,
        bookingStatus: b.bookingStatus,
      },
      create: {
        id:            b.id,
        userId:        b.userId,
        propertyId:    b.propertyId,
        checkinDate:   new Date(b.checkinDate),
        checkoutDate:  new Date(b.checkoutDate),
        numberOfGuests:b.numberOfGuests,
        totalPrice:    b.totalPrice,
        bookingStatus: b.bookingStatus,
      }
    })
  }
  console.log('✅ Seeded bookings')

  // 6) REVIEWS
  const { reviews } = readJSON('reviews.json')
  for (const r of reviews) {
    await prisma.review.upsert({
      where: { id: r.id },
      update: {
        userId:     r.userId,
        propertyId: r.propertyId,
        rating:     r.rating,
        comment:    r.comment,
      },
      create: {
        id:         r.id,
        userId:     r.userId,
        propertyId: r.propertyId,
        rating:     r.rating,
        comment:    r.comment,
      }
    })
  }
  console.log('✅ Seeded reviews')
}

// generate a test JWT for Postman after seeding
;(async () => {
  await main()
  const testUser = await prisma.user.findUnique({ where: { username: 'jdoe' } })
  if (testUser) {
    const token = jwt.sign(
      { id: testUser.id, username: testUser.username },
      process.env.AUTH_SECRET_KEY,
      { expiresIn: '1h' }
    )
    console.log('\n🧪 TEST TOKEN for Postman:\n', token, '\n')
  }
  prisma.$disconnect()
})().catch(e => {
  console.error(e)
  process.exit(1)
})
