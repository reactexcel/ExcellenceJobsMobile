import axios from 'axios';
import { call, put } from 'redux-saga/effects';
import * as actions from '../../action/actions';
import * as api from '../generic';

export function* createLogoutRequest(action) {
  try {
    const response = yield call(axios, api.logoutApi(action));
    if (response.data.error === 0) {
      yield put(actions.userLogoutSuccess(response));
    } else if (response.data.error === 1) {
      yield put(actions.userLogoutFailed(response));
    }
  } catch (e) {
    // handle error if any
  }
}
