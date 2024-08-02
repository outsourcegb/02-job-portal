import mongoose from 'mongoose';
import validator from 'validator';

const applicationSchema = new mongoose.Schema(
  {
    jobSeekerInfo: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        validate: [validator.isEmail, 'Please provide a valid email address'],
      },
      phone: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      resume: {
        public_id: String,
        url: String,
      },
      coverLettter: {
        type: String,
      },
      role: {
        type: String,
        enum: ['Job Seeker'],
        default: 'Job Seeker',
      },
    },
    employerInfo: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      role: {
        type: String,
        enum: ['Employer'],
        default: 'Employer',
      },
    },
    jobInfo: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
        required: true,
      },
      jobTitle: {
        type: String,
        required: true,
      },
    },
    deletedBy: {
      jobSeeker: {
        type: Boolean,
        default: false,
      },
      employer: {
        type: Boolean,
        default: false,
      },
    },
  },
  { timestamps: true }
);

export const Application = mongoose.model('Application', applicationSchema);
