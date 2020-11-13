import Axios from 'axios';
import {all, call, put, takeEvery} from 'redux-saga/effects';

const apiUrl = 'https://api.github.com/search/repositories';

function getApi({payload}) {
  return Axios.get(apiUrl, {
    params: {
      q: payload.q,
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

function* fetchRepositories(action) {
  try {
    const repositories = yield call(() => getApi(action));

    yield put({
      type: 'GET_REPOSITORIES_SUCCESS',
      repositories: repositories.items,
      total: repositories.total,
    });
  } catch (e) {
    yield put({type: 'GET_REPOSITORIES_FAILED', message: e.message});
  }
}

function* repositorySaga() {
  yield takeEvery('GET_REPOSITORIES_REQUESTED', fetchRepositories);
}

export default repositorySaga;
