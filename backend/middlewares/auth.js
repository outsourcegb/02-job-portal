import jwt from 'jsonwebtoken';
import { catchAsyncErrors } from './catchAsyncErrors.js';
import { User } from '../models/user.schema.js';
import ErrorHandler from './error.js';

export const isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler(401, 'Login first to access this resource'));
  }

  const decoded = await jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(decoded.id);

  req.user = user;

  next();
});

export const isAuthorized = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          403,
          `Role ${req.user.role} is not allowed to access this resource`
        )
      );
    }
    next();
  };
};
