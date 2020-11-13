import {combineReducers} from 'redux';
import repositories from './repositories';
import commits from './commits';
import token from './token';

const rootReducer = combineReducers({
  repositories,
  commits,
  token,
});

export default rootReducer;
