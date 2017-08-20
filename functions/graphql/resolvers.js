const admin = require('firebase-admin');
const functions = require('firebase-functions');

admin.initializeApp(functions.config().firebase);
const foldersRef = admin.database().ref('folders');
module.exports = {
  Query: {
    folders() {
      return foldersRef.once('value')
        .then(snapshot => {
          const folders = snapshot.val();
          if (folders === null) return [];
          return Object.keys(folders).map(o => Object.assign({ id: o }, folders[o]));
        });
    },
  },
  Mutation: {
    createFolder(_, { input }) {
      return (
        new Promise((resolve) => {
          const folder = foldersRef.push(input, () => {
            resolve(Object.assign({ id: folder.key }, input)
            );
          });
        })
      );
    },
    updateFolder(_, { input }) {
      const folder = foldersRef.child(input.id);
      return folder.once('value')
        .then(snapshot => {
          if (snapshot.val() === null) throw new Error('404');
          return null;
        })
        .then(() => {
          const update = Object.assign({}, input);
          delete update.id;
          return foldersRef.child(input.id).set(update);
        })
        .then(() => (input));
    },
    deleteFolder(_, { input }) {
      const folder = foldersRef.child(input.id);
      return folder.once('value')
        .then(snapshot => {
          if (snapshot.val() === null) throw new Error('404');
          return null;
        })
        .then(() => folder.remove())
        .then(() => (input));
    }
  }
};
