import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a job title'],
      minLength: [2, 'Job title must be at least 2 characters'],
      maxLength: [100, 'Job title must not be more than 100 characters'],
      trim: true,
    },
    jobType: {
      type: String,
      required: [true, 'Please provide a job type'],
      enum: ['Full-time', 'Part-time', 'Contract', 'Temporary', 'Internship'],
    },
    location: {
      type: String,
      required: [true, 'Please provide a job location'],
      minLength: [2, 'Job location must be at least 2 characters'],
      maxLength: [100, 'Job location must not be more than 100 characters'],
    },
    companyName: {
      type: String,
      required: [true, 'Please provide a company name'],
      minLength: [2, 'Company name must be at least 2 characters'],
      maxLength: [100, 'Company name must not be more than 100 characters'],
    },
    introduction: {
      type: String,
      required: [true, 'Please provide an introduction'],
      minLength: [2, 'Introduction must be at least 10 characters'], //TODO: Change to 10
      maxLength: [500, 'Introduction must not be more than 500 characters'],
    },
    responsibilities: {
      type: String,
      required: [true, 'Please provide responsibilities'],
    },
    qualifications: {
      type: String,
      required: [true, 'Please provide qualifications'],
    },
    offers: {
      type: String,
    },
    salary: {
      type: Number,
      required: [true, 'Please provide a salary'],
    },
    hiringMultipleCandidates: {
      type: Boolean,
      default: false,
    },
    personalWebsite: {
      title: String,
      url: String,
    },
    jobNiche: {
      type: String,
      required: [true, 'Please provide a jobe niche'],
    },
    newLetterSent: {
      type: Boolean,
      default: false,
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

export const Job = mongoose.model('Job', jobSchema);
