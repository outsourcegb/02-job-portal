import { configureStore } from '@reduxjs/toolkit';
import jobReducer from '../slices/jobSlice.js';
import userReducer from '../slices/user.slice.js';
import applicationReducer from '../slices/application.slice.js';

const store = configureStore({
  reducer: {
    job: jobReducer,
    user: userReducer,
    application: applicationReducer,
  },
});

export default store;
