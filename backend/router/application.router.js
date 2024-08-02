import express from 'express';

import { isAuthenticatedUser, isAuthorized } from '../middlewares/auth.js';
import { postApplication } from '../controllers/applications/postApplication.action.js';
import { employerGetApplication } from '../controllers/applications/employerGetApplication.action.js';
import { jobSeekerGetApplication } from '../controllers/applications/jobSeekerGetApplication.action.js';
import { deleteApplication } from '../controllers/applications/deleteApplication.action.js';

const router = express.Router();

router.post(
  '/post/:id',
  isAuthenticatedUser,
  isAuthorized('Job Seeker'),
  postApplication
);

router.get(
  '/employer/getall',
  isAuthenticatedUser,
  isAuthorized('Employer'),
  employerGetApplication
);

router.get(
  '/jobseeker/getall',
  isAuthenticatedUser,
  isAuthorized('Job Seeker'),
  jobSeekerGetApplication
);

router.delete('/delete/:id', isAuthenticatedUser, deleteApplication);

export default router;
