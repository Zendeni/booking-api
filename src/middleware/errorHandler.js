const Sentry = require('@sentry/node');

// Initialize Sentry
Sentry.init({
  dsn: process.env.SENTRY_DSN || 'https://examplePublicKey@o0.ingest.sentry.io/0', // ← REPLACE with your real DSN
  tracesSampleRate: 1.0,
});

// Global error handler middleware
const errorHandler = (err, req, res, next) => {
  console.error('Global Error:', err);

  // Report to Sentry
  Sentry.captureException(err);

  // Respond to client
  res.status(err.status || 500).json({
    error: err.message || 'Something went wrong!',
  });
};

module.exports = {
  Sentry,
  errorHandler,
};
