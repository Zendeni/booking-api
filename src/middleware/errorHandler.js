// src/middleware/errorHandler.js
const Sentry = require('@sentry/node');

// init Sentry (no DSN = disabled)
Sentry.init({
  dsn: process.env.SENTRY_DSN || '',
  tracesSampleRate: 1.0,
});

const sentryRequestHandler = Sentry.Handlers.requestHandler();
const sentryErrorHandler   = Sentry.Handlers.errorHandler();

// JSON API error handler
function errorHandler(err, req, res, next) {
  console.error('💥 Global Error:', err.stack || err);

  // send to Sentry
  Sentry.captureException(err);

  if (res.headersSent) {
    return next(err);
  }

  // prefer err.status, then err.code, else 500
  const status = err.status || err.code || 500;
  const message = err.message || 'An error occurred on the server, please double-check your request!';

  res.status(status).json({
    error: {
      message,
      code: status,
    },
  });
}

module.exports = {
  sentryRequestHandler,
  sentryErrorHandler,
  errorHandler,
};
