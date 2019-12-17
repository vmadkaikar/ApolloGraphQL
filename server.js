require('graphql-import-node');
const express = require('express');
const {ApolloServer} = require('apollo-server-express');
const {appModule} = require('./app');
const {buildFederatedSchema} = require('@apollo/federation');

const {schema, context, typeDefs, resolvers} = appModule;

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
    schema,
    context,
    typeDefs,
    resolvers,
    introspection: true,
    trace: true
});

const app = express();
server.applyMiddleware({app});
// The `listen` method launches a web server.
app.listen({port: 4000}, () => {
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
});