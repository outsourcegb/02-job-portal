import { catchAsyncErrors } from '../../middlewares/catchAsyncErrors.js';
import ErrorHandler from '../../middlewares/error.js';
import { Application } from '../../models/application.schema.js';

export const deleteApplication = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  const application = await Application.findById(id);

  if (!application) {
    return next(new ErrorHandler(404, 'Application not found'));
  }

  const { role } = req.user;

  switch (role) {
    case 'Job Seeker':
      application.deletedBy.jobSeeker = true;
      break;
    case 'Employer':
      application.deletedBy.employer = true;
      break;
    default:
      return next(new ErrorHandler(400, 'Invalid role'));
  }

  await application.save();

  if (application.deletedBy.jobSeeker && application.deletedBy.employer) {
    await application.deleteOne();
  }

  res.status(200).json({
    success: true,
    message: 'Application deleted successfully',
  });
});
