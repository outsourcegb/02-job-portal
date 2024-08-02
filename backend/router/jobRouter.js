import express from 'express';

import { isAuthenticatedUser, isAuthorized } from '../middlewares/auth.js';
import {
  postJob,
  getAllJobs,
  getJobDetails,
  getMyJobs,
  deleteJob,
  searchJobs,
} from '../controllers/jobController.js';

const router = express.Router();

router.post(
  '/post-job',
  isAuthenticatedUser,
  isAuthorized('Employer'),
  postJob
);

router.get('/getall', getAllJobs);

router.get('/search', searchJobs);

router.get('/myjobs', isAuthenticatedUser, isAuthorized('Employer'), getMyJobs);

router.get('/:id', getJobDetails);

router.delete(
  '/delete/:id',
  isAuthenticatedUser,
  isAuthorized('Employer'),
  deleteJob
);

export default router;
