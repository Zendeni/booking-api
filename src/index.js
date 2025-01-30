import express from 'express';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import * as Sentry from '@sentry/node';
import * as Tracing from '@sentry/tracing';
import winston from 'winston';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();
const app = express();
app.use(express.json());

// Winston logging setup
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
  ],
});

// Sentry initialization
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Tracing.Integrations.Express({ app }),
  ],
  tracesSampleRate: 1.0,
});

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

// Logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    logger.info(`${req.method} ${req.url} - ${duration}ms`);
  });
  next();
});

// Authentication middleware
const authenticate = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).send('Access denied. No token provided.');

  try {
    const decoded = jwt.verify(token, process.env.AUTH_SECRET_KEY);
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send('Invalid token.');
  }
};

// Login endpoint
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await prisma.user.findUnique({ where: { username } });

  if (!user || user.password !== password) {
    return res.status(401).send('Invalid credentials.');
  }

  const token = jwt.sign({ id: user.id }, process.env.AUTH_SECRET_KEY, { expiresIn: '1h' });
  res.send({ token });
});

// Users endpoints
app.get('/users', authenticate, async (req, res) => {
  const { username, email } = req.query;
  const users = await prisma.user.findMany({
    where: {
      username: username ? { equals: username } : undefined,
      email: email ? { equals: email } : undefined,
    },
    select: { id: true, username: true, name: true, email: true, phoneNumber: true, profilePicture: true }
  });
  res.send(users);
});

app.post('/users', async (req, res) => {
  const user = await prisma.user.create({ data: req.body });
  res.status(201).send(user);
});

app.get('/users/:id', authenticate, async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.params.id },
    select: { id: true, username: true, name: true, email: true, phoneNumber: true, profilePicture: true }
  });
  if (!user) return res.status(404).send('User not found.');
  res.send(user);
});

app.put('/users/:id', authenticate, async (req, res) => {
  const user = await prisma.user.update({
    where: { id: req.params.id },
    data: req.body
  });
  res.send(user);
});

app.delete('/users/:id', authenticate, async (req, res) => {
  await prisma.user.delete({ where: { id: req.params.id } });
  res.status(204).send();
});

// Hosts endpoints
app.get('/hosts', authenticate, async (req, res) => {
  const { name } = req.query;
  const hosts = await prisma.host.findMany({
    where: {
      name: name ? { contains: name } : undefined,
    }
  });
  res.send(hosts);
});

app.post('/hosts', authenticate, async (req, res) => {
  const host = await prisma.host.create({ data: req.body });
  res.status(201).send(host);
});

app.get('/hosts/:id', authenticate, async (req, res) => {
  const host = await prisma.host.findUnique({ where: { id: req.params.id } });
  if (!host) return res.status(404).send('Host not found.');
  res.send(host);
});

app.put('/hosts/:id', authenticate, async (req, res) => {
  const host = await prisma.host.update({
    where: { id: req.params.id },
    data: req.body
  });
  res.send(host);
});

app.delete('/hosts/:id', authenticate, async (req, res) => {
  await prisma.host.delete({ where: { id: req.params.id } });
  res.status(204).send();
});

// Properties endpoints
app.get('/properties', authenticate, async (req, res) => {
  const { location, pricePerNight, amenities } = req.query;
  const properties = await prisma.property.findMany({
    where: {
      location: location ? { contains: location } : undefined,
      pricePerNight: pricePerNight ? { equals: parseFloat(pricePerNight) } : undefined,
      amenities: amenities ? { some: { name: { equals: amenities } } } : undefined,
    }
  });
  res.send(properties);
});

app.post('/properties', authenticate, async (req, res) => {
  const property = await prisma.property.create({ data: req.body });
  res.status(201).send(property);
});

app.get('/properties/:id', authenticate, async (req, res) => {
  const property = await prisma.property.findUnique({ where: { id: req.params.id } });
  if (!property) return res.status(404).send('Property not found.');
  res.send(property);
});

app.put('/properties/:id', authenticate, async (req, res) => {
  const property = await prisma.property.update({
    where: { id: req.params.id },
    data: req.body
  });
  res.send(property);
});

app.delete('/properties/:id', authenticate, async (req, res) => {
  await prisma.property.delete({ where: { id: req.params.id } });
  res.status(204).send();
});

// Bookings endpoints
app.get('/bookings', authenticate, async (req, res) => {
  const { userId } = req.query;
  const bookings = await prisma.booking.findMany({
    where: {
      userId: userId ? { equals: userId } : undefined,
    }
  });
  res.send(bookings);
});

app.post('/bookings', authenticate, async (req, res) => {
  const booking = await prisma.booking.create({ data: req.body });
  res.status(201).send(booking);
});

app.get('/bookings/:id', authenticate, async (req, res) => {
  const booking = await prisma.booking.findUnique({ where: { id: req.params.id } });
  if (!booking) return res.status(404).send('Booking not found.');
  res.send(booking);
});

app.put('/bookings/:id', authenticate, async (req, res) => {
  const booking = await prisma.booking.update({
    where: { id: req.params.id },
    data: req.body
  });
  res.send(booking);
});

app.delete('/bookings/:id', authenticate, async (req, res) => {
  await prisma.booking.delete({ where: { id: req.params.id } });
  res.status(204).send();
});

// Reviews endpoints
app.get('/reviews', authenticate, async (req, res) => {
  const reviews = await prisma.review.findMany();
  res.send(reviews);
});

app.post('/reviews', authenticate, async (req, res) => {
  const review = await prisma.review.create({ data: req.body });
  res.status(201).send(review);
});

app.get('/reviews/:id', authenticate, async (req, res) => {
  const review = await prisma.review.findUnique({ where: { id: req.params.id } });
  if (!review) return res.status(404).send('Review not found.');
  res.send(review);
});

app.put('/reviews/:id', authenticate, async (req, res) => {
  const review = await prisma.review.update({
    where: { id: req.params.id },
    data: req.body
  });
  res.send(review);
});

app.delete('/reviews/:id', authenticate, async (req, res) => {
  await prisma.review.delete({ where: { id: req.params.id } });
  res.status(204).send();
});

// Amenities endpoints
app.get('/amenities', authenticate, async (req, res) => {
  const amenities = await prisma.amenity.findMany();
  res.send(amenities);
});

app.post('/amenities', authenticate, async (req, res) => {
  const amenity = await prisma.amenity.create({ data: req.body });
  res.status(201).send(amenity);
});

app.get('/amenities/:id', authenticate, async (req, res) => {
  const amenity = await prisma.amenity.findUnique({ where: { id: req.params.id } });
  if (!amenity) return res.status(404).send('Amenity not found.');
  res.send(amenity);
});

app.put('/amenities/:id', authenticate, async (req, res) => {
  const amenity = await prisma.amenity.update({
    where: { id: req.params.id },
    data: req.body
  });
  res.send(amenity);
});

app.delete('/amenities/:id', authenticate, async (req, res) => {
  await prisma.amenity.delete({ where: { id: req.params.id } });
  res.status(204).send();
});

// Error handling middleware
app.use(Sentry.Handlers.errorHandler());
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).send({ error: 'An error occurred on the server, please double-check your request!' });
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});