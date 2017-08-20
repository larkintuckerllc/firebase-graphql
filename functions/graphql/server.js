const bodyParser = require('body-parser');
const express = require('express');
const graphqlServerExpress = require('apollo-server-express');
const schema = require('./data/schema');
const schemaPrinter = require('graphql/utilities/schemaPrinter');

const setupGraphQLServer = () => {
  const graphQLServer = express();
  graphQLServer.use(
    '/graphql',
    bodyParser.json(),
    graphqlServerExpress.graphqlExpress({ schema, context: {} })
  );
  graphQLServer.use(
    '/graphiql',
    graphqlServerExpress.graphiqlExpress({ endpointURL: '/api/graphql' })
  );
  graphQLServer.use('/schema', (req, res) => {
    res.set('Content-Type', 'text/plain');
    res.send(schemaPrinter.printSchema(schema));
  });
  return graphQLServer;
};
module.exports = setupGraphQLServer;
