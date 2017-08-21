import { createAction, handleActions } from 'redux-actions';
import { ACTION_PREFIX } from '../strings';

export const openFolder = createAction(`${ACTION_PREFIX}OPEN_FOLDER`);
export const closeFolder = createAction(`${ACTION_PREFIX}CLOSE_FOLDER`);
export default handleActions({
  [openFolder](state, action) { return action.payload.id; },
  [closeFolder]() { return null; },
}, null);
export const getFolderOpen = state => state.folderOpen;
export const getIsFolderOpen = state => state.folderOpen !== null;
