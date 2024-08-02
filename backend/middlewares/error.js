class ErrorHandler extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}

const createError = (statusCode, message) =>
  new ErrorHandler(statusCode, message);

export const errorMiddleware = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message; // Explicitly set the message
  error.statusCode = err.statusCode; // Explicitly set the code

  error.statusCode = error.statusCode || 500;
  error.message = error.message || 'Internal Server Error';

  if (err.name === 'CastError') {
    error = createError(404, `Resource not found. Invalid: ${err.path}`);
  }

  if (err.statusCode === 11000) {
    error = createError(400, 'Duplicate field value entered');
  }

  if (err.name === 'JsonWebTokenError') {
    error = createError(401, 'Invalid token. Please login again');
  }

  if (err.name === 'TokenExpiredError') {
    error = createError(401, 'Token expired. Please login again');
  }

  return res.status(error.statusCode).json({
    success: false,
    message: error.message,
  });
};

export default ErrorHandler;
