import axios from 'axios';
import { call, put } from 'redux-saga/effects';
import * as actions from '../../action/actions';
import * as api from '../api';

export function* createLoginRequest(action) {
  try {
    const response = yield call(api.loginApi, action);
    if (response.data.error === 0) {
      yield put(actions.userLoginSuccess(response));
    } else if (response.data.error === 1) {
      yield put(actions.userLoginFailed(response));
    }
  } catch (e) {
    // handle error if any
  }
}
