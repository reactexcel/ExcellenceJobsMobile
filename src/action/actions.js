import { createAction } from 'redux-actions';
import * as constants from './constants';

// Login Actions
export const userLoginRequest = createAction(constants.USER_LOGIN_REQUEST);
export const userLoginSuccess = createAction(constants.USER_LOGIN_SUCCESS);
export const userLoginFailed = createAction(constants.USER_LOGIN_FAILED);

// Saving Device Data
export const deviceDataRequest = createAction(constants.DEVICE_DATA_REQUEST);
export const deviceDataSuccess = createAction(constants.DEVICE_DATA_SUCCESS);
export const deviceDataFailed = createAction(constants.DEVICE_DATA_FAILED);

// Signout Actions
export const userLogoutRequest = createAction(constants.USER_LOGOUT_REQUEST);
export const userLogoutSuccess = createAction(constants.USER_LOGOUT_SUCCESS);
export const userLogoutFailed = createAction(constants.USER_LOGOUT_FAILED);

// Mobile number update action
export const mobileNumberUpdateRequest = createAction(constants.MOBILE_UPDATE_REQUEST);
export const mobileNumberUpdateSuccess = createAction(constants.MOBILE_UPDATE_SUCCESS);
export const mobileNumberUpdateFailed = createAction(constants.MOBILE_UPDATE_FAILED);
