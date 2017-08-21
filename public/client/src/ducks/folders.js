import { combineReducers } from 'redux';
import { combineActions, createAction, handleActions } from 'redux-actions';
import { createSelector } from 'reselect';
import { ACTION_PREFIX } from '../strings';
import * as fromFolders from '../apis/folders';

// FOR PRODUCTION CODE NEED TO ADD WAITING FOR STATE
// FOR PRODUCTION CODE NEED TO ADD ERROR HANDLING
const addFolderRequest = createAction(`${ACTION_PREFIX}ADD_FOLDER_REQUEST`);
export const addFolderSuccess = createAction(`${ACTION_PREFIX}ADD_FOLDER_SUCCESS`);
export const addFolder = folder => (dispatch) => {
  dispatch(addFolderRequest(folder));
  fromFolders.addFolder(folder);
};
const removeFolderRequest = createAction(`${ACTION_PREFIX}REMOVE_FOLDER_REQUEST`);
export const removeFolderSuccess = createAction(`${ACTION_PREFIX}REMOVE_FOLDER_SUCCESS`);
export const removeFolder = folder => (dispatch) => {
  dispatch(removeFolderRequest(folder));
  fromFolders.removeFolder(folder);
};
const updateFolderRequest = createAction(`${ACTION_PREFIX}UPDATE_FOLDER_REQUEST`);
export const updateFolderSuccess = createAction(`${ACTION_PREFIX}UPDATE_FOLDER_SUCCESS`);
export const updateFolder = folder => (dispatch) => {
  dispatch(updateFolderRequest(folder));
  fromFolders.updateFolder(folder);
};
const byId = handleActions({
  [combineActions(
    addFolderSuccess,
    updateFolderSuccess,
  )](state, action) {
    const entry = {};
    entry[action.payload.id] = action.payload;
    return {
      ...state,
      ...entry,
    };
  },
  [removeFolderSuccess](state, action) {
    const newState = { ...state };
    delete newState[action.payload.id];
    return newState;
  },
}, {});
const ids = handleActions({
  [addFolderSuccess](state, action) {
    return [...state, action.payload.id];
  },
  [removeFolderSuccess](state, action) {
    const newState = [...state];
    newState.splice(state.indexOf(action.payload.id), 1);
    return newState;
  },
}, []);
export default combineReducers({
  byId,
  ids,
});
const getFoldersIds = state => state.folders.ids;
const getFoldersById = state => state.folders.byId;
export const getFolder = (state, id) => state.folders.byId[id];
export const getFolders = createSelector(
  [getFoldersIds, getFoldersById],
  (foldersIds, foldersById) => foldersIds.map(id => foldersById[id]),
);
