import firebase from 'firebase';

export default () => firebase.auth().signInWithRedirect(
  (new firebase.auth.FacebookAuthProvider()),
);
