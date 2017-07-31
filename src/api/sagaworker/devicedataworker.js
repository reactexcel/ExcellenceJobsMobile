import { call, put } from 'redux-saga/effects';
import * as actions from '../../action/actions';
import fireApi from '../api';

export default function* submitDeviceData(action) {
  try {
    const response = yield call(fireApi, 'POST', '', {
      action: 'deviceData',
      email_id: action.payload.email,
      device_id: action.payload.device,
      token: action.payload.token });
    if (response.data.error === 0) {
      yield put(actions.deviceDataSuccess(response));
    } else if (response.data.error === 1) {
      yield put(actions.deviceDataFailed(response));
    }
  } catch (e) {
    // handle error if any
  }
}
