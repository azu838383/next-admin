
// BEGIN OF NEW REDUCER

import { combineReducers } from 'redux';
import general from './generalReducer';
import user from './userReducer';
import historyTab from './historyTab'

const appReducer = combineReducers({
  general,
  user,
  historyTab
});

export type RootState = ReturnType<typeof appReducer>;

const rootReducer = (state: RootState | undefined, action: any): RootState => {
  if (action.type === 'RESET_STORE') {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;