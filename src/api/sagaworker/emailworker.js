import { call, put } from 'redux-saga/effects';
import * as actions from '../../action/actions';
import * as url from '../config';
import fireApi from '../generic';

export default function* getEmailData(action) {
  try {
    const response = yield call(fireApi, 'POST', url.email, action.payload);
    if (response.data.error === 0) {
      yield put(actions.emailDataSuccess(response));
    } else if (response.data.error === 1) {
      yield put(actions.emailDataFailed(response));
    }
  } catch (e) {
    // handle error if any
  }
}
