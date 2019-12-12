const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const cors = require('cors');
const _ = require('lodash');
const fetch = require('node-fetch');

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    title: String
    author: String
  }
  
  type Query {
    books: [Book]
    allianceInfo(allId: String): AllianceInfo
    locations(zip: Int): [Location]
    header: [Header]
    users: [User]
    user(id: Int): User
  }
  
  type AllianceInfo {
    allianceId: String
    serviceHours: String
    throttle: String
    channel: String
    alliancePhone: String
    allianceName: String
    allianceCompanyUrl: String
    productLines: [String]
    subCategory: String
    hasPreferredPharmacyFilter: Boolean
    enableOutOfNetworkPopup: Boolean
    turnOnPreferredPharmacyFilter: Boolean
  }
  
  type Location {
    zip: String
    ssacd: String
    stateAbbr: String
    countyName: String
    fipsCode: String
    cityName: String
    savingsAmount: String
    savingsLevel: String
    stateName: String
  }
  
  type Header {
    ID: Int
    enable_ehmp: String
    menu_item_parent: String
    menu_order: Int
    nav_label: String
    product_line: String
    title: String
    url: String  
  }
  
  type User {
    id: Int
    fName: String  
    lName: String  
    dob: String  
  }
  
  type ResponsePayload {
    success: Boolean
  }
  
  input UserInput {
    id: Int
    fName: String  
    lName: String  
    dob: String  
  }
`;

const books = [
  {
    title: 'Harry Potter and the Chamber of Secrets',
    author: 'J.K. Rowling',
  },
  {
    title: 'Jurassic Park',
    author: 'Michael Crichton',
  },
];

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    books: () => books,
    allianceInfo: (root, {allId}) => {
      return fetch(`https://www.qa.ehealthmedicareplans.com/mcws/rs/alliance/call-service/v2/${allId}`, {
        headers: {strictSSL: false},
      })
        .then(res => res.json())
        .then(res => {
          return Object.assign({}, res.allianceInfo, {
            serviceHours: res.serviceHours,
            throttle: res.throttle,
            alliancePhone: res.allianceInfo.alliancePhone.phoneNumber,
          });
        });
    },
    locations: (root, {zip}) => {
      return fetch(`https://www.qa.ehealthmedicareplans.com/mcws/rs/locations/v2?zip=${zip}`)
        .then(res => res.json())
        .then(res => res.locationList);
    },
    header: () => {
      return fetch('https://www.qa.ehealthmedicare.com/wp-json/ehm/v1/menu/header/', {
        headers: {strictSSL: false},
      }).then(res => res.json());
    },
    users: () => fakeDB.users,
    user: ({id}) => _.find(fakeDB.users, {id}),
  },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
server.applyMiddleware({ app });

// The `listen` method launches a web server.
app.listen({ port: 4000 }, () => {
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
});