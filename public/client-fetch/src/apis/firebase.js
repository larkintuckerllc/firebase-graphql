import firebase from 'firebase';
import { FIREBASE_CONFIG } from '../strings';

firebase.initializeApp(FIREBASE_CONFIG);
// eslint-disable-next-line
export const connectToFirebase = ({
  login,
  logout,
}) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user !== null) {
      login(user.displayName);
    } else {
      logout();
    }
  });
};
