import { call, put } from 'redux-saga/effects';
import * as actions from '../../action/actions';
import * as url from '../config';
import fireApi from '../generic';

export default function* createLogoutRequest(action) {
  try {
    const response = yield call(fireApi, 'PUT', url.logout, action.payload);
    if (response.data.error === 0) {
      yield put(actions.userLogoutSuccess(response));
    } else if (response.data.error === 1) {
      yield put(actions.userLogoutFailed(response));
    }
  } catch (e) {
    // handle error if any
  }
}
