import {all} from 'redux-saga/effects';
import repositorySaga from './repositorySaga';
import commitSaga from './commitSaga';
import tokenSaga from './tokenSaga';

export default function* rootSaga() {
  yield all([repositorySaga(), commitSaga(), tokenSaga()]);
}
