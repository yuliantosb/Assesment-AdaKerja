import Axios from 'axios';
import {call, put, takeEvery} from 'redux-saga/effects';

function getApi({payload}) {
  return Axios.get(`${payload.url}/commits`, {
    params: {
      per_page: payload.per_page,
      page: payload.page,
    },
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
}

function* fetchCommits(action) {
  try {
    const commits = yield call(() => getApi(action));
    yield put({
      type: 'GET_COMMITS_SUCCESS',
      commits: commits,
    });
  } catch (e) {
    yield put({type: 'GET_COMMITS_FAILED', message: e.message});
  }
}

function* commitSaga() {
  yield takeEvery('GET_COMMITS_REQUESTED', fetchCommits);
}

export default commitSaga;
