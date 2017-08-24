import { combineReducers } from 'redux';
import { combineActions, createAction, handleActions } from 'redux-actions';
import { createSelector } from 'reselect';
import { ACTION_PREFIX } from '../strings';
import * as fromFolders from '../apis/folders';

// FOR PRODUCTION CODE NEED TO ADD WAITING FOR STATE
// FOR PRODUCTION CODE NEED TO ADD ERROR HANDLING
const fetchFoldersRequest = createAction(`${ACTION_PREFIX}FETCH_FOLDER_REQUEST`);
const fetchFoldersSuccess = createAction(`${ACTION_PREFIX}FETCH_FOLDER_SUCCESS`);
export const fetchFolders = () => (dispatch) => {
  dispatch(fetchFoldersRequest());
  fromFolders.fetchFolders()
    .then(folders => dispatch(fetchFoldersSuccess(folders)));
};
const addFolderRequest = createAction(`${ACTION_PREFIX}ADD_FOLDER_REQUEST`);
const addFolderSuccess = createAction(`${ACTION_PREFIX}ADD_FOLDER_SUCCESS`);
export const addFolder = folder => (dispatch) => {
  dispatch(addFolderRequest(folder));
  // NEED TO IMPLMENT SUCCESS
};
const removeFolderRequest = createAction(`${ACTION_PREFIX}REMOVE_FOLDER_REQUEST`);
const removeFolderSuccess = createAction(`${ACTION_PREFIX}REMOVE_FOLDER_SUCCESS`);
export const removeFolder = folder => (dispatch) => {
  dispatch(removeFolderRequest(folder));
  // NEED TO IMPLMENT SUCCESS
};
const updateFolderRequest = createAction(`${ACTION_PREFIX}UPDATE_FOLDER_REQUEST`);
const updateFolderSuccess = createAction(`${ACTION_PREFIX}UPDATE_FOLDER_SUCCESS`);
export const updateFolder = folder => (dispatch) => {
  dispatch(updateFolderRequest(folder));
  // NEED TO IMPLMENT SUCCESS
};
const byId = handleActions({
  [fetchFoldersSuccess](state, action) {
    const entry = {};
    const folders = action.payload;
    for (let i = 0; i < folders.length; i += 1) {
      const folder = folders[i];
      entry[folder.id] = folder;
    }
    return {
      ...state,
      ...entry,
    };
  },
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
  [fetchFoldersSuccess](state, action) {
    return [...state, ...action.payload.map(o => o.id)];
  },
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
