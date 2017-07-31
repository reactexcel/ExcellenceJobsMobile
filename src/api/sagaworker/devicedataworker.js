import axios from 'axios';
import { call, put } from 'redux-saga/effects';
import * as actions from '../../action/actions';
import * as api from '../api';

export default function* submitDeviceData(action) {
  try {
    const response = yield call(api.devieDataApi, action);
    if (response.data.error === 0) {
      yield put(actions.deviceDataSuccess(response));
    } else if (response.data.error === 1) {
      yield put(actions.deviceDataFailed(response));
    }
  } catch (e) {
    console.log(e);
    // handle error if any
  }
}
