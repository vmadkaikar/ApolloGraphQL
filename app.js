const {GraphQLModule} = require('@graphql-modules/core');
const {Ehi} = require('./ehi');
export const appModule = new GraphQLModule({
    imports: [
        Ehi,
    ],
});
