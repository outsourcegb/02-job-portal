import { catchAsyncErrors } from '../middlewares/catchAsyncErrors.js';
import ErrorHandler from '../middlewares/error.js';
import { User } from '../models/user.schema.js';
import { Job } from '../models/job.schema.js';
import cloudinary from 'cloudinary';
import mongoose from 'mongoose';

export const postJob = catchAsyncErrors(async (req, res, next) => {
  const {
    title,
    jobType,
    location,
    companyName,
    introduction,
    responsibilities,
    qualifications,
    offers,
    salary,
    hiringMultipleCandidates,
    personalWebsiteTitle,
    personalWebsiteUrl,
    jobNiche,
    newLetterSent,
  } = req.body;

  if (
    !title ||
    !jobType ||
    !location ||
    !companyName ||
    !introduction ||
    !responsibilities ||
    !qualifications ||
    !salary ||
    !jobNiche
  ) {
    return next(new ErrorHandler(400, 'Please fill all required fields'));
  }

  if (
    (personalWebsiteTitle && !personalWebsiteUrl) ||
    (!personalWebsiteTitle && personalWebsiteUrl)
  ) {
    return next(
      new ErrorHandler(
        400,
        'Please provide both personal website title and url'
      )
    );
  }

  const postedBy = req.user._id;

  const job = await Job.create({
    title,
    jobType,
    location,
    companyName,
    introduction,
    responsibilities,
    qualifications,
    offers,
    salary,
    hiringMultipleCandidates,
    personalWebsite: {
      title: personalWebsiteTitle,
      url: personalWebsiteUrl,
    },
    jobNiche,
    newLetterSent,
    postedBy,
  });

  res.status(201).json({
    success: true,
    job,
    message: 'Job posted successfully',
  });
});

export const getAllJobs = catchAsyncErrors(async (req, res, next) => {
  const jobs = await Job.find();

  res.status(200).json({
    success: true,
    jobs,
  });
});

export const searchJobs = catchAsyncErrors(async (req, res, next) => {
  const { keyword, location, jobType, jobNiche } = req.query;

  const query = {};

  if (location) {
    query.location = location;
  }

  if (jobType) {
    query.jobType = jobType;
  }

  if (jobNiche) {
    query.jobNiche = jobNiche;
  }

  if (keyword) {
    query.$or = [
      { title: { $regex: keyword, $options: 'i' } },
      { companyName: { $regex: keyword, $options: 'i' } },
      { introduction: { $regex: keyword, $options: 'i' } },
    ];
  }

  const jobs = await Job.find(query);

  res.status(200).json({
    success: true,
    jobs,
    count: jobs.length,
  });
});

export const getJobDetails = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  const job = await Job.findById(id);
  if (!job) {
    return next(new ErrorHandler(404, 'Job not found'));
  }

  res.status(200).json({
    success: true,
    job,
  });
});

export const getMyJobs = catchAsyncErrors(async (req, res, next) => {
  const jobs = await Job.find({ postedBy: req.user._id });

  res.status(200).json({
    success: true,
    jobs,
    count: jobs.length,
  });
});

export const deleteJob = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return next(new ErrorHandler(400, 'Invalid job ID'));
  }

  const job = await Job.findById(id);

  if (!job) {
    return next(new ErrorHandler(404, 'Job not found'));
  }

  if (job.postedBy.toString() !== req.user._id.toString()) {
    return next(
      new ErrorHandler(403, 'You are not authorized to delete this job')
    );
  }

  await job.deleteOne();

  res.status(200).json({
    success: true,
    message: 'Job deleted successfully',
  });
});
