import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import apolloClient from '../apis/apolloClient';
import auth from '../ducks/auth';
import folderOpen from '../ducks/folderOpen';

export default combineReducers({
  apollo: apolloClient.reducer(),
  auth,
  form: formReducer,
  folderOpen,
});
