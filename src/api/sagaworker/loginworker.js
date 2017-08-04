import { call, put } from 'redux-saga/effects';
import * as actions from '../../action/actions';
import * as url from '../config';
import fireApi from '../generic';

export default function* createLoginRequest(action) {
  try {
    const response = yield call(fireApi, 'POST', url.login, { email_id: action.payload.email, registration_id: action.payload.registrationid });
    if (response.data.error === 0) {
      yield put(actions.userLoginSuccess(response));
    } else if (response.data.error === 1) {
      yield put(actions.userLoginFailed(response));
    }
  } catch (e) {
    // handle error if any
  }
}
