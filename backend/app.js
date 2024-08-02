import express, { urlencoded } from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dbConn from './db/dbConn.js';
import { errorMiddleware } from './middlewares/error.js';
import fileupload from 'express-fileupload';

import userRouter from './router/userRouter.js';
import jobRouter from './router/jobRouter.js';
import appplicationRouter from './router/application.router.js';
import { newsLetterCron } from './automation/newsLetter.cron.js';

const app = express();

config({ path: './config/config.env' });

app.use(
  cors({
    origin: [process.env.FRONTEND_URI],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(urlencoded({ extended: true }));

app.use(
  fileupload({
    useTempFiles: true,
    tempFileDir: '/tmp/',
  })
);

app.use('/api/v1/users', userRouter);
app.use('/api/v1/jobs', jobRouter);
app.use('/api/v1/applications', appplicationRouter);

newsLetterCron();

dbConn();

app.use(errorMiddleware);

export default app;
