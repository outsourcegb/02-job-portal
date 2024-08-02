import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    loading: false,
    isAuthenticated: false,
    user: {},
    error: null,
    message: null,
  },
  reducers: {
    registerRequest: (state, action) => {
      state.loading = true;
      state.isAuthenticated = false;
      state.user = {};
      state.error = null;
      state.message = null;
    },
    registerSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.error = null;
      state.message = action.payload.message;
    },
    registerFailed: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
      state.error = action.payload;
      state.message = null;
    },
    loginRequest: (state, action) => {
      state.loading = true;
      state.isAuthenticated = false;
      state.user = {};
      state.error = null;
      state.message = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.error = null;
      state.message = action.payload.message;
    },
    loginFailed: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
      state.error = action.payload;
    },
    fetchUserRequest: (state, action) => {
      state.loading = true;
      state.isAuthenticated = false;
      state.user = {};
      state.error = null;
    },
    fetchUserSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.error = null;
    },
    fetchUserFailed: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
      state.error = action.payload;
    },
    logoutSuccess: (state, action) => {
      state.isAuthenticated = false;
      state.user = {};
      state.error = null;
    },
    logoutFailed: (state, action) => {
      state.isAuthenticated = state.isAuthenticated;
      state.user = state.user;
      state.error = action.payload;
    },
    clearAllErrors: (state, action) => {
      state.error = null;
      state.user = state.user;
    },
  },
});

export const register = (date) => async (dispatch) => {
  dispatch(userSlice.actions.registerRequest());

  try {
    let link = `http://localhost:4001/api/v1/users/register`;

    const config = {
      withCredentials: true,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    const response = await axios.post(link, date, config);

    dispatch(userSlice.actions.registerSuccess(response.data));
    dispatch(userSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(userSlice.actions.registerFailed(error.response.data.message));
  }
};

export const login = (date) => async (dispatch) => {
  dispatch(userSlice.actions.registerRequest());

  try {
    let link = `http://localhost:4001/api/v1/users/login`;

    const config = {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await axios.post(link, date, config);

    dispatch(userSlice.actions.loginSuccess(response.data));
    dispatch(userSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(userSlice.actions.loginFailed(error.response.data.message));
  }
};

export const getUser = () => async (dispatch) => {
  dispatch(userSlice.actions.fetchUserRequest());

  try {
    let link = `http://localhost:4001/api/v1/users/me`;

    const config = {
      withCredentials: true,
    };

    const response = await axios.get(link, config);

    dispatch(userSlice.actions.fetchUserSuccess(response.data));
    dispatch(userSlice.actions.clearAllErrors());
  } catch (error) {
    console.log(error.response);
    dispatch(userSlice.actions.fetchUserFailed(error.response.data.message));
  }
};

export const logout = () => async (dispatch) => {
  try {
    let link = `http://localhost:4001/api/v1/users/logout`;

    const config = {
      withCredentials: true,
    };

    await axios.get(link, config);

    dispatch(userSlice.actions.logoutSuccess());
    dispatch(userSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(userSlice.actions.logoutFailed(error.response.data.message));
  }
};

export const clearAllUserErrors = () => async (dispatch) => {
  dispatch(userSlice.actions.clearAllErrors());
};

export default userSlice.reducer;
