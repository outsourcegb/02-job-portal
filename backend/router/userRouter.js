import express from 'express';
import {
  register,
  login,
  logout,
  getUserProfile,
  updateProfile,
  updatePassword,
} from '../controllers/userController.js';
import { isAuthenticatedUser } from '../middlewares/auth.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/logout', isAuthenticatedUser, logout);
router.get('/me', isAuthenticatedUser, getUserProfile);
router.put('/update/profile', isAuthenticatedUser, updateProfile);
router.put('/update/password', isAuthenticatedUser, updatePassword);

export default router;
