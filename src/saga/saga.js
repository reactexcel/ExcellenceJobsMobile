import { takeLatest } from 'redux-saga/effects';
import * as constants from '../action/constants';
import createLoginRequest from '../api/sagaworker/loginworker';
import submitDeviceData from '../api/sagaworker/devicedataworker';
import createLogoutRequest from '../api/sagaworker/logoutworker';
import getContactNumber from '../api/sagaworker/contactnumberworker';
import getEmailData from '../api/sagaworker/emailworker';

export function* watcherSaga() {
  yield takeLatest(constants.USER_LOGIN_REQUEST, createLoginRequest);
  yield takeLatest(constants.DEVICE_DATA_REQUEST, submitDeviceData);
  yield takeLatest(constants.USER_LOGOUT_REQUEST, createLogoutRequest);
  yield takeLatest(constants.PHONE_DATA_REQUEST, getContactNumber);
  yield takeLatest(constants.EMAIL_DATA_REQUEST, getEmailData);
}

export default function* rootSaga() {
  yield [
    watcherSaga(),
  ];
}
