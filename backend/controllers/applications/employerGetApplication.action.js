import { catchAsyncErrors } from '../../middlewares/catchAsyncErrors.js';
import { Application } from '../../models/application.schema.js';

export const employerGetApplication = catchAsyncErrors(
  async (req, res, next) => {
    const { user } = req;
    const { id } = user;

    const applications = await Application.find({
      'employerInfo.id': id,
      'deletedBy.employer': false,
    });

    res.status(200).json({
      success: true,
      applications,
    });
  }
);
