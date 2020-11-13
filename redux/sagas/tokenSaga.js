import Axios from 'axios';
import {call, put, takeEvery} from 'redux-saga/effects';

const tokenUrl = 'https://github.com/login/oauth/access_token';
const userUrl = 'https://api.github.com/user';

function getToken({payload}) {
  return Axios.post(
    tokenUrl,
    {
      client_id: '756ad06360d0419a6ad5',
      client_secret: '0f3e7dd8e213123c7abd416d58316ffbd5970e16',
      code: payload.code,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    },
  )
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
}

function getUser({access_token}) {
  return Axios.get(userUrl, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `token ${access_token}`,
    },
  })
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
}

function* fetchToken(action) {
  try {
    const accessToken = yield call(() => getToken(action));
    try {
      const user = yield call(() => getUser(accessToken));
      yield put({type: 'GET_USER_SUCCESS', user: user});
    } catch (e) {
      yield put({type: 'GET_USER_FAILED', message: e.message});
    }
  } catch (e) {
    yield put({type: 'GET_TOKEN_FAILED', message: e.message});
  }
}

function* tokenSaga() {
  yield takeEvery('GET_TOKEN_REQUESTED', fetchToken);
}

export default tokenSaga;
