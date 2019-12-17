import 'graphql-import-node';
import GraphQLJSON from 'graphql-type-json'
import {GraphQLModule} from '@graphql-modules/core';
import resolvers from './resolver';
import * as typeDefs from './schema.graphql';
import {UserModule} from 'ApolloGraphQLUserSchema';

export const Ehi = new GraphQLModule({
    resolvers,
    typeDefs,
    imports: [UserModule]
});