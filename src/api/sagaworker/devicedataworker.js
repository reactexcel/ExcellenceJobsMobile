import { call, put } from 'redux-saga/effects';
import * as actions from '../../action/actions';
import * as url from '../config';
import fireApi from '../generic';

export default function* submitDeviceData(action) {
  try {
    const response = yield call(fireApi, 'POST', url.deviceData, {
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
