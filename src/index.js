const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const userRoutes = require('./routes/userRoutes');
const hostRoutes = require('./routes/hostRoutes');
const propertyRoutes = require('./routes/propertyRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const amenityRoutes = require('./routes/amenityRoutes');
const authRoutes = require('./routes/authRoutes');
const { Sentry, errorHandler } = require('./middleware/errorHandler');


app.use(express.json());

app.use('/users', userRoutes);
app.use('/hosts', hostRoutes);
app.use('/properties', propertyRoutes);
app.use('/bookings', bookingRoutes);
app.use('/reviews', reviewRoutes);
app.use('/amenities', amenityRoutes);
app.use(authRoutes);
app.use(Sentry.Handlers.requestHandler());

app.get('/', (req, res) => {
  res.send('Booking API is running!');
});

app.use(errorHandler);
app.use(Sentry.Handlers.errorHandler());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
