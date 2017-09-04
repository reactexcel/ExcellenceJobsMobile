import { combineReducers } from 'redux';
import user from './user';
import nav from './navigation';

const rootReducer = combineReducers({
  user,
  nav,
});

export default rootReducer;
