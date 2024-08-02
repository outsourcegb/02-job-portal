import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import validator from 'validator';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name'],
      minLength: [2, 'Name must be at least 2 characters'],
      maxLength: [50, 'Name must not be more than 50 characters'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, 'Please provide a valid email'],
    },
    phone: {
      type: String,
      required: [true, 'Please provide a phone number'],
    },
    address: {
      type: String,
      required: [true, 'Please provide an address'],
    },
    niches: {
      firstNiche: String,
      secondNiche: String,
      thirdNiche: String,
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minLength: [3, 'Password must be at least 3 characters'],
      select: false,
    },
    resume: {
      public_id: String,
      url: String,
    },
    coverLetter: {
      type: String,
    },
    role: {
      type: String,
      enum: ['Job Seeker', 'Employer'],
      default: 'Job Seeker',
    },
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

export const User = mongoose.model('User', userSchema);
