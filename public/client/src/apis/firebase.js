import firebase from 'firebase';
import { FIREBASE_CONFIG } from '../strings';

firebase.initializeApp(FIREBASE_CONFIG);
const database = firebase.database();
export const foldersRef = database.ref('folders');
export const connectToFirebase = ({
  addFolderSuccess,
  login,
  logout,
  removeFolderSuccess,
  updateFolderSuccess,
}) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user !== null) {
      login(user.displayName);
      foldersRef.on('child_added', (data) => {
        addFolderSuccess({
          id: data.key,
          ...(data.val()),
        });
      });
      foldersRef.on('child_removed', (data) => {
        removeFolderSuccess({
          id: data.key,
          ...(data.val()),
        });
      });
      foldersRef.on('child_changed', (data) => {
        updateFolderSuccess({
          id: data.key,
          ...(data.val()),
        });
      });
    } else {
      logout();
      foldersRef.off('child_added');
      foldersRef.off('child_removed');
    }
  });
};
