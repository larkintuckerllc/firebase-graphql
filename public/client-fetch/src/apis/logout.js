import firebase from 'firebase';

export default () => firebase.auth().signOut();
