import { call, put } from 'redux-saga/effects';
import * as actions from '../../action/actions';
import fireApi from '../api';

export default function* createLoginRequest(action) {
  try {
    const response = yield call(fireApi, 'POST', '', { action: 'login', email_id: action.payload.email });
    if (response.data.error === 0) {
      yield put(actions.userLoginSuccess(response));
    } else if (response.data.error === 1) {
      yield put(actions.userLoginFailed(response));
    }
  } catch (e) {
    // handle error if any
  }
}
