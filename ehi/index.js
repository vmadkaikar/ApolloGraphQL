import 'graphql-import-node';
import {GraphQLModule} from '@graphql-modules/core';
import resolvers from './resolver';
import * as typeDefs from './schema.graphql';

const {UserModule} = require('ApolloGraphQLUserSchema');
export const Ehi = new GraphQLModule({
    resolvers,
    typeDefs,
    imports: [UserModule]
});