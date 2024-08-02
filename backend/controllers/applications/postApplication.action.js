import ErrorHandler from '../../middlewares/error.js';
import { catchAsyncErrors } from '../../middlewares/catchAsyncErrors.js';
import { Application } from '../../models/application.schema.js';
import { Job } from '../../models/job.schema.js';
import { v2 as cloudinary } from 'cloudinary';

export const postApplication = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const { name, email, phone, address, coverLetter } = req.body;

  if (!name || !email || !phone || !address || !coverLetter) {
    return next(new ErrorHandler(400, 'Please fill all fields'));
  }

  const isAlreadyApplied = await Application.findOne({
    'jobSeekerInfo.id': req.user._id,
    'jobInfo.id': id,
  });

  if (isAlreadyApplied) {
    return next(new ErrorHandler(400, 'You have already applied to this job'));
  }

  const jobSeekerInfo = {
    id: req.user._id,
    name,
    email,
    phone,
    address,
    coverLetter,
    role: 'Job Seeker',
  };

  const jobDetails = await Job.findById(id);

  console.log('job title', jobDetails.title);

  if (!jobDetails) {
    return next(new ErrorHandler(404, 'Job not found'));
  }

  if (req.files && req.files.resume) {
    const { resume } = req.files;

    try {
      const cloudinaryResponse = await cloudinary.uploader.upload(
        resume.tempFilePath,
        {
          folder: 'job_seeker_resumes',
        }
      );

      if (!cloudinaryResponse || cloudinaryResponse.error) {
        return next(new ErrorHandler(500, 'Error uploading resume'));
      }

      jobSeekerInfo.resume = {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.secure_url,
      };
    } catch (error) {
      return next(new ErrorHandler(500, 'Error uploading resume'));
    }
  } else {
    if (req.user && !req.user.resume.url) {
      return next(new ErrorHandler(400, 'Please upload resume'));
    }

    jobSeekerInfo.resume = req.user.resume;
  }

  const employerInfo = {
    id: jobDetails.postedBy,
    role: 'Employer',
  };

  const jobInfo = {
    id: jobDetails._id,
    jobTitle: jobDetails.title,
  };

  const application = await Application.create({
    jobSeekerInfo,
    employerInfo,
    jobInfo,
  });

  if (!application) {
    return next(new ErrorHandler(500, 'Error applying to job'));
  }

  res.status(200).json({
    success: true,
    message: 'Application submitted successfully',
    application,
  });
});
