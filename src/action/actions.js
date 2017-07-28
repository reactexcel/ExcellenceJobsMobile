import { createAction } from 'redux-actions';
import * as constants from './constants';

// Login Actions
export const userLoginRequest = createAction(constants.USER_LOGIN_REQUEST);
export const userLoginSuccess = createAction(constants.USER_LOGIN_SUCCESS);
export const userLoginFailed = createAction(constants.USER_LOGIN_FAILED);

// Fetching User Data Actions
export const userDataRequest = createAction(constants.USER_DATA_REQUEST);
export const userDataSuccess = createAction(constants.USER_DATA_SUCCESS);
export const userDataFailed = createAction(constants.USER_DATA_FAILED);

// Signout Actions
export const userLogoutRequest = createAction(constants.USER_LOGOUT_REQUEST);
export const userLogoutSuccess = createAction(constants.USER_LOGOUT_SUCCESS);
export const userLogoutFailed = createAction(constants.USER_LOGOUT_FAILED);
