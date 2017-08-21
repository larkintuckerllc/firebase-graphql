import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import auth from '../ducks/auth';
import folders from '../ducks/folders';
import folderOpen from '../ducks/folderOpen';

export default combineReducers({
  auth,
  folders,
  form: formReducer,
  folderOpen,
});
