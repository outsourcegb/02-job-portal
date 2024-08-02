import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const applicationSlice = createSlice({
  name: 'application',
  initialState: {
    loading: false,
    error: null,
    applications: [],
    myApplications: [],
    message: null,
  },
  reducers: {
    requestForAllApplications(state, action) {
      state.loading = true;
      state.error = null;
    },
    successForAllApplications(state, action) {
      state.loading = false;
      state.error = null;
      state.applications = action.payload.applications;
    },
    failureForAllApplications(state, action) {
      state.loading = false;
      state.error = action.payload.message;
    },
    requestForMyApplications(state, action) {
      state.loading = true;
      state.error = null;
    },
    successForMyApplications(state, action) {
      state.loading = false;
      state.error = null;
      state.applications = action.payload.applications;
    },
    failureForMyApplications(state, action) {
      state.loading = false;
      state.error = action.payload.applications;
    },
    requestForPostApplication(state, action) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    successForPostApplication(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload.message;
    },
    failureForPostApplication(state, action) {
      state.loading = false;
      state.message = null;
      state.error = action.payload;
    },
    clearAllErrors(state, action) {
      state.error = null;
      state.message = null;
      state.applications = state.applications;
      state.myApplications = state.myApplications;
    },
    resetAllApplicationSlice(state, action) {
      state.loading = false;
      state.error = null;
      state.applications = [];
      state.myApplications = [];
      state.message = null;
    },
  },
});

export default applicationSlice.reducer;

export const getJobSeekerApplications = () => async (dispatch) => {
  try {
    dispatch(applicationSlice.actions.requestForMyApplications());

    const response = await axios.get(
      'http://localhost:4001/api/v1/applications/jobseeker/getall'
    );

    dispatch(
      applicationSlice.actions.successForMyApplications(
        response.data.applications
      )
    );
  } catch (error) {
    dispatch(
      applicationSlice.actions.failureForMyApplications(error.response.data)
    );
  }
};

export const getEmployerApplications = () => async (dispatch) => {
  try {
    dispatch(applicationSlice.actions.requestForAllApplications());

    const response = await axios.get(
      'http://localhost:4001/api/v1/applications/employer/getall'
    );

    dispatch(
      applicationSlice.actions.successForAllApplications(
        response.data.applications
      )
    );
  } catch (error) {
    dispatch(
      applicationSlice.actions.failureForAllApplications(error.response.data)
    );
  }
};

export const clearAllApplicationErrors = () => async (dispatch) => {
  dispatch(applicationSlice.actions.clearAllErrors());
};

export const resetAllApplicationSlice = () => async (dispatch) => {
  dispatch(applicationSlice.actions.resetAllApplicationSlice());
};

export const postApplication = (data, jobId) => async (dispatch) => {
  try {
    dispatch(applicationSlice.actions.requestForPostApplication());

    const config = {
      withCredentials: true,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    const response = await axios.post(
      `http://localhost:4001/api/v1/applications/post/${jobId}`,
      data,
      config
    );

    dispatch(
      applicationSlice.actions.successForPostApplication(response.data.message)
    );
    dispatch(applicationSlice.actions.clearAllErrors());
  } catch (error) {
    console.log(error.response);
    dispatch(
      applicationSlice.actions.failureForPostApplication(
        error.response.data.message
      )
    );
  }
};
