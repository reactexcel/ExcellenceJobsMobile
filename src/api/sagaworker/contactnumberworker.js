import { call, put } from 'redux-saga/effects';
import * as actions from '../../action/actions';
import * as url from '../config';
import fireApi from '../generic';

export default function* getContactNumber(action) {
  try {
    const response = yield call(fireApi, 'POST', url.phoneNumber, action.payload);
    if (response.data.error === 0) {
      yield put(actions.phoneDataSuccess(response));
    } else if (response.data.error === 1) {
      yield put(actions.phoneDataFailed(response));
    }
  } catch (e) {
    // handle error if any
  }
}
