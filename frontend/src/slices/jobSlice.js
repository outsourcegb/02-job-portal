import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const jobSlice = createSlice({
  name: 'job',
  initialState: {
    jobs: [],
    loading: false,
    error: null,
    message: '',
    singleJob: {},
    myJobs: [],
  },
  reducers: {
    requestForAllJobs(state, action) {
      state.loading = true;
      state.error = null;
    },
    successForAllJobs(state, action) {
      state.loading = false;
      state.jobs = action.payload;
      state.error = null;
    },
    failureForAllJobs(state, action) {
      state.jobs = state.jobs;
      state.loading = false;
      state.error = action.payload;
    },
    requestForSingleJob(state, action) {
      state.loading = true;
      state.error = null;
    },
    successForSingleJob(state, action) {
      state.loading = false;
      state.singleJob = action.payload;
      state.error = null;
    },
    failureForSingleJob(state, action) {
      state.singleJob = state.singleJob;
      state.loading = false;
      state.error = action.payload;
    },
    clearAllErrors(state, action) {
      state.error = null;
      state.jobs = state.jobs;
    },
    resetJobSlice(state, action) {
      state.jobs = state.jobs;
      state.loading = false;
      state.error = null;
      state.message = '';
      state.singleJob = {};
      state.myJobs = state.myJobs;
    },
  },
});

// export const fetchJobs =
//   (keyword = '', location, jobType, jobNiche) =>
//   async (dispatch) => {
//     try {
//       dispatch(jobSlice.actions.requestForAllJobs());
//       let link = `http://localhost:4001/api/v1/jobs/getall?`;
//       let queryParams = [];

//       if (keyword) {
//         queryParams.push(`keyword=${keyword}`);
//       }
//       if (location) {
//         queryParams.push(`location=${location}`);
//       }
//       if (jobType) {
//         queryParams.push(`jobType=${jobType}`);
//       }
//       if (jobNiche) {
//         queryParams.push(`jobNiche=${jobNiche}`);
//       }

//       if (queryParams.length) {
//         link += queryParams.join('&');
//       }

//       const response = await axios.get(link, { withCredentials: true });
//       dispatch(jobSlice.actions.successForAllJobs(response.data.jobs));
//       dispatch(clearAllJobErrors());
//     } catch (error) {
//       dispatch(jobSlice.actions.failureForAllJobs(error.response.data.message));
//     }
//   };

export const fetchJobs =
  (city, niche, searchKeyword = '') =>
  async (dispatch) => {
    try {
      dispatch(jobSlice.actions.requestForAllJobs());
      let link = `http://localhost:4001/api/v1/jobs/getall?`;
      let queryParams = [];
      if (searchKeyword) {
        queryParams.push(`searchKeyword=${searchKeyword}`);
      }
      if (city) {
        queryParams.push(`city=${city}`);
      }
      if (niche) {
        queryParams.push(`niche=${niche}`);
      }

      link += queryParams.join('&');
      const response = await axios.get(link, { withCredentials: true });
      dispatch(jobSlice.actions.successForAllJobs(response.data.jobs));
      dispatch(jobSlice.actions.clearAllErrors());
    } catch (error) {
      dispatch(jobSlice.actions.failureForAllJobs(error.response.data.message));
    }
  };

export const fetchSingleJob = (jobId) => async (dispatch) => {
  dispatch(jobSlice.actions.requestForSingleJob());

  try {
    const response = await axios.get(
      `http://localhost:4001/api/v1/jobs/${jobId}`,
      { withCredentials: true }
    );
    dispatch(jobSlice.actions.successForSingleJob(response.data.job));
    dispatch(jobSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(jobSlice.actions.failureForSingleJob(error.response.data.message));
  }
};

export const clearAllJobErrors = () => (dispatch) => {
  dispatch(jobSlice.actions.clearAllErrors());
};

export const resetJobSlice = () => (dispatch) => {
  dispatch(jobSlice.actions.resetJobSlice());
};

export default jobSlice.reducer;
