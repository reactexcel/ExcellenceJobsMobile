import { handleActions } from 'redux-actions';
import update from 'immutability-helper';
import * as constants from '../action/constants';

export const initialState = {
  login: {
    data: [],
    error: [],
    isSuccess: false,
    isError: false,
    isLoading: true,
  },
  userData: {
    data: [],
    error: [],
    isSuccess: false,
    isError: false,
    isLoading: true,
  },
  deviceData: {
    data: [],
    error: [],
    isSuccess: false,
    isError: false,
  },
};

const userLoginSuccess = (state, action) => update(state, {
  login: {
    data: { $set: action.payload.data },
    isLoading: { $set: false },
    isSuccess: { $set: true },
    isError: { $set: false },
    errors: { $set: [] },
  },
});

const userLoginFailed = (state, action) => update(state, {
  login: {
    data: { $set: [] },
    isLoading: { $set: false },
    isSuccess: { $set: false },
    errors: { $set: action.payload.data },
    isError: { $set: true },
  },
});

const userDataSuccess = (state, action) => update(state, {
  userData: {
    data: { $set: action.payload.data },
    isLoading: { $set: false },
    isSuccess: { $set: true },
    isError: { $set: false },
    errors: { $set: [] },
  },
});

const userDataFailed = (state, action) => update(state, {
  userData: {
    data: { $set: [] },
    isLoading: { $set: false },
    isSuccess: { $set: false },
    errors: { $set: action.payload.data },
    isError: { $set: true },
  },
});

const deviceDataSuccess = (state, action) => update(state, {
  deviceData: {
    data: { $set: action.payload.data },
    isLoading: { $set: false },
    isSuccess: { $set: true },
    isError: { $set: false },
    errors: { $set: [] },
  },
});

const deviceDataFailed = (state, action) => update(state, {
  deviceData: {
    data: { $set: [] },
    isLoading: { $set: false },
    isSuccess: { $set: false },
    errors: { $set: action.payload.data },
    isError: { $set: true },
  },
});

const userLogoutSuccess = (state, action) => update(state, {
  login: {
    data: { $set: action.payload.data },
    isLoading: { $set: false },
    isSuccess: { $set: true },
    isError: { $set: false },
    errors: { $set: [] },
  },
  userData: {
    data: { $set: [] },
    isLoading: { $set: false },
    isSuccess: { $set: true },
    isError: { $set: false },
    errors: { $set: [] },
  },
});

const userLogoutFailed = (state, action) => update(state, {
  login: {
    data: { $set: [] },
    isLoading: { $set: false },
    isSuccess: { $set: false },
    errors: { $set: action.payload.data },
    isError: { $set: true },
  },
  userData: {
    data: { $set: [] },
    isLoading: { $set: false },
    isSuccess: { $set: false },
    errors: { $set: action.payload.data },
    isError: { $set: true },
  },
});


export default handleActions({
  [constants.USER_LOGIN_SUCCESS]: userLoginSuccess,
  [constants.USER_LOGIN_FAILED]: userLoginFailed,

  [constants.USER_DATA_SUCCESS]: userDataSuccess,
  [constants.USER_DATA_FAILED]: userDataFailed,

  [constants.USER_LOGOUT_SUCCESS]: userLogoutSuccess,
  [constants.USER_LOGOUT_FAILED]: userLogoutFailed,

  [constants.DEVICE_DATA_SUCCESS]: deviceDataSuccess,
  [constants.DEVICE_DATA_FAILED]: deviceDataFailed,
}, initialState);
