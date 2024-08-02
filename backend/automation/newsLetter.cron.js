import cron from 'node-cron';
import { Job } from '../models/job.schema.js';
import { User } from '../models/user.schema.js';
import { sendEmail } from '../utils/sendEmail.js';

export const newsLetterCron = () => {
  cron.schedule('* * * * *', async () => {
    const jobs = await Job.find({ newLetterSent: false });

    for (const job of jobs) {
      console.log(job);

      try {
        const filteredUsers = await User.find({
          $or: [
            { 'niches.firstNiche': job.jobNiche },
            { 'niches.secondNiche': job.jobNiche },
            { 'niches.thirdNiche': job.jobNiche },
          ],
        });

        for (const user of filteredUsers) {
          console.log(user);
          const subject = `New job alert: ${job.title} in ${job.jobNiche} is available`;
          const message = `Hello ${user.name},\n\n${job.title} in ${job.jobNiche} is available. Apply now!`;

          sendEmail({
            email: user.email,
            subject,
            message,
          });

          job.newLetterSent = true;
          await job.save();
        }
      } catch (error) {
        console.error(error);
      }
    }
  });
};
