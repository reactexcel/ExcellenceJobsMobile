import { call, put } from 'redux-saga/effects';
import * as actions from '../../action/actions';
import * as url from '../config';
import fireApi from '../generic';

export default function* mobileUpdateRequest(action) {
  try {
    const response = yield call(fireApi, 'PUT', url.mobileUpdate, action.payload);
    if (response.data.error === 0) {
      yield put(actions.mobileNumberUpdateSuccess(response));
    } else if (response.data.error === 1) {
      yield put(actions.mobileNumberUpdateFailed(response));
    }
  } catch (e) {
    // handle error if any
  }
}
