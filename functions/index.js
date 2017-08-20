const functions = require('firebase-functions');
const admin = require('firebase-admin');
// HAVE TO INITIALIZE EARLY
admin.initializeApp(functions.config().firebase);
const setupGraphQLServer = require('./graphql/server.js');

const graphQLServer = setupGraphQLServer();
exports.api = functions.https.onRequest(graphQLServer);
