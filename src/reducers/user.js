import { handleActions } from 'redux-actions';
import update from 'immutability-helper';
import * as constants from '../action/constants';
import './update';

export const initialState = {
  userLogin: {
    data: [],
    error: [],
    isSuccess: false,
    isError: false,
  },
  deviceData: {
    data: [],
    error: [],
    isSuccess: false,
    isError: false,
  },
  userLogout: {
    data: [],
    error: [],
    isSuccess: false,
    isError: false,
  },
  phoneContact: {
    data: [],
    error: [],
    isSuccess: false,
    isError: false,
  },
};

const userLoginSuccess = (state, action) => update(state, {
  userLogin: { $setRequestSuccess: action.payload },
  userLogout: { $setRequestFailed: [] },
});

const userLoginFailed = (state, action) => update(state, {
  userLogin: { $setRequestFailed: action.payload },
});

const deviceDataSuccess = (state, action) => update(state, {
  deviceData: { $setRequestSuccess: action.payload },
});

const deviceDataFailed = (state, action) => update(state, {
  deviceData: { $setRequestFailed: action.payload },
});

const userLogoutSuccess = (state, action) => update(state, {
  userLogout: { $setRequestSuccess: action.payload },
});

const userLogoutFailed = (state, action) => update(state, {
  userLogout: { $setRequestFailed: action.payload },
});


export default handleActions({
  [constants.USER_LOGIN_SUCCESS]: userLoginSuccess,
  [constants.USER_LOGIN_FAILED]: userLoginFailed,

  [constants.USER_LOGOUT_SUCCESS]: userLogoutSuccess,
  [constants.USER_LOGOUT_FAILED]: userLogoutFailed,

  [constants.DEVICE_DATA_SUCCESS]: deviceDataSuccess,
  [constants.DEVICE_DATA_FAILED]: deviceDataFailed,
}, initialState);
