import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
// eslint-disable-next-line import/no-cycle
import anonymizerReducer from './features/anonymizer/anonymizerSlice';
// eslint-disable-next-line import/no-cycle
import authReducer from './features/login/authSlice';
// eslint-disable-next-line import/no-cycle
import statsReducer from './features/stats/statsSlice';

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    anonymizer: anonymizerReducer,
    auth: authReducer,
    stats: statsReducer,
  });
}
