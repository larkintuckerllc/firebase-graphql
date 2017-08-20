const express = require('express');
const functions = require('firebase-functions');
const apolloServerExpress = require('apollo-server-express');
const schemaPrinter = require('graphql/utilities/schemaPrinter');
const schema = require('./graphql/schema');

const app = express();
// BODYPARSER IS ALREADY IMPLEMENTED BY FIREBASE
app.use(
  '/graphql',
  apolloServerExpress.graphqlExpress({ schema })
);
app.use(
  '/graphiql',
  apolloServerExpress.graphiqlExpress({ endpointURL: '/api/graphql' })
);
app.use('/schema', (req, res) => {
  res.set('Content-Type', 'text/plain');
  res.send(schemaPrinter.printSchema(schema));
});
exports.api = functions.https.onRequest(app);
