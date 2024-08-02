import { catchAsyncErrors } from '../middlewares/catchAsyncErrors.js';
import ErrorHandler from '../middlewares/error.js';
import { User } from '../models/user.schema.js';
import { sendToken } from '../utils/jwtToken.js';
import cloudinary from 'cloudinary';

async function uploadResume(resume, user, next) {
  if (!resume) return;

  const oldResume = user.resume;
  if (oldResume) {
    await cloudinary.uploader.destroy(oldResume.public_id);
  }

  try {
    const cloudinaryResponse = await cloudinary.uploader.upload(
      resume.tempFilePath,
      {
        folder: 'job_seeker_resumes',
        resource_type: 'auto',
      }
    );

    if (!cloudinaryResponse || cloudinaryResponse.error) {
      return next(new ErrorHandler(500, 'Error uploading resume'));
    }

    return {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    };
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler(500, 'Error uploading resume'));
  }
}

export const register = catchAsyncErrors(async (req, res, next) => {
  const {
    email,
    password,
    name,
    phone,
    address,
    firstNiche,
    secondNiche,
    thirdNiche,
    coverLetter,
    role,
  } = req.body;

  if (!email || !password || !name || !phone || !address || !role) {
    return next(new ErrorHandler(400, 'Please fill all fields'));
  }

  if (role === 'Job Seeker' && (!firstNiche || !secondNiche || !thirdNiche)) {
    return next(new ErrorHandler(400, 'Please provide all three niches'));
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    return next(new ErrorHandler(400, 'User already exists'));
  }

  const userData = {
    email,
    password,
    name,
    phone,
    address,
    niches: { firstNiche, secondNiche, thirdNiche },
    coverLetter,
    role,
  };

  if (req.files && req.files.resume) {
    const { resume } = req.files;
    userData.resume = await uploadResume(resume, {}, next);
  }

  const user = await User.create(userData);
  sendToken(user, 201, res, 'User registered successfully');
});

export const login = catchAsyncErrors(async (req, res, next) => {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    return next(new ErrorHandler(400, 'Please fill all fields'));
  }

  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    return next(new ErrorHandler(401, 'Invalid email or password'));
  }

  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler(401, 'Invalid email or password'));
  }

  if (user.role !== role) {
    return next(new ErrorHandler(401, 'Invalid role'));
  }

  sendToken(user, 200, res, 'User logged in successfully');
});

export const logout = catchAsyncErrors(async (req, res, next) => {
  res
    .status(200)
    .cookie('token', null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .json({
      success: true,
      message: 'Logged out successfully',
    });
});

export const getUserProfile = catchAsyncErrors(async (req, res, next) => {
  const { user } = req;
  res.status(200).json({
    success: true,
    user,
  });
});

export const updateProfile = catchAsyncErrors(async (req, res, next) => {
  const { user } = req;

  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    address: req.body.address,
    coverLetter: req.body.coverLetter,
    role: req.body.role,
    niches: {
      firstNiche: req.body.firstNiche,
      secondNiche: req.body.secondNiche,
      thirdNiche: req.body.thirdNiche,
    },
  };

  const { firstNiche, secondNiche, thirdNiche } = newUserData.niches;
  if (
    newUserData.role === 'Job Seeker' &&
    (!firstNiche || !secondNiche || !thirdNiche)
  ) {
    return next(new ErrorHandler(400, 'Please provide all three niches'));
  }

  if (req.files && req.files.resume) {
    const { resume } = req.files;
    newUserData.resume = await uploadResume(resume, user, next);
  }

  const newUser = await User.findByIdAndUpdate(user._id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    user: newUser,
    message: 'Profile updated successfully',
  });
});

export const updatePassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user._id).select('+password');
  const { oldPassword, newPassword } = req.body;

  console.log(oldPassword, newPassword);

  const isPasswordMatched = await user.comparePassword(oldPassword);

  if (!isPasswordMatched) {
    return next(new ErrorHandler(400, 'Invalid password'));
  }

  if (newPassword === oldPassword) {
    return next(new ErrorHandler(400, 'Password cannot be the same'));
  }

  user.password = newPassword;
  await user.save();

  sendToken(user, 200, res, 'Password updated successfully');
});
