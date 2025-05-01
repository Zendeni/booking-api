require('dotenv').config();
const express = require('express');
const app = express();

const authRoutes    = require('./routes/authRoutes');
const userRoutes    = require('./routes/userRoutes');
const hostRoutes    = require('./routes/hostRoutes');
const propRoutes    = require('./routes/propertyRoutes');
const amenityRoutes = require('./routes/amenityRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const reviewRoutes  = require('./routes/reviewRoutes');
const ServiceError  = require('./utils/ServiceError');

app.use(express.json());

// --- routes ---
app.use('/login',    authRoutes);
app.use('/users',    userRoutes);
app.use('/hosts',    hostRoutes);
app.use('/properties', propRoutes);
app.use('/amenities', amenityRoutes);
app.use('/bookings',  bookingRoutes);
app.use('/reviews',   reviewRoutes);

// global error handler
app.use((err, req, res, next) => {
  if (err instanceof ServiceError) {
    return res.status(err.status).json({ message: err.message, code: err.status });
  }
  console.error(err);
  res.status(500).json({
    message: 'An error occurred on the server, please double-check your request!',
    code: 500
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
