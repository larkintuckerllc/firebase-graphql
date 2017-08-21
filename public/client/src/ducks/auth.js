import { combineReducers } from 'redux';
import { createAction, handleActions } from 'redux-actions';
import { ACTION_PREFIX } from '../strings';

export const login = createAction(`${ACTION_PREFIX}LOGIN`);
export const logout = createAction(`${ACTION_PREFIX}LOGOUT`);
const authenticated = handleActions({
  [login]() { return true; },
  [logout]() { return false; },
}, false);
const authenticating = handleActions({
  [login]() { return false; },
  [logout]() { return false; },
}, true);
const name = handleActions({
  [login](state, action) { return action.payload; },
  [logout]() { return null; },
}, null);
export default combineReducers({
  authenticated,
  authenticating,
  name,
});
export const getAuthenticated = state => state.auth.authenticated;
export const getAuthenticating = state => state.auth.authenticating;
export const getName = state => state.auth.name;
