const _ = require('lodash');
const fetch = require('node-fetch');

export default {
    Query: {
        books: (root, args) => {
            return books;
        },
        allianceInfo: (root, {allId}) => {
            return fetch(`https://www.qa.ehealthmedicareplans.com/mcws/rs/alliance/call-service/v2/${allId}`, {
                headers: {strictSSL: false},
            })
                .then(res => res.json())
                .then(res => {
                    return res.allianceInfo;
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
        getReviews: () => reviews,
        settings: (root, {allid, allidConfig}) => {
            return fetch(`https://www.cm.ehealthmedicareplans.com/mcws/rs/app-setting/v2?allid=${allid}&allidConfig=${allidConfig}`, {
                headers: {strictSSL: false},
            }).then(res => res.json());
        }
    },
    User: {
        org(user) {
            return {
                name: `org-name-${user.id}`,
                id: `org-id-${user.id}`,
            };
        }
    },
    Review: {
        author(review) {
            return {__typename: "User", id: review.authorID};
        }
    },
};

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

const users = [
    {
        id: "1",
        name: "Ada Lovelace",
        birthDate: "1815-12-10",
        username: "@ada",
        email: 'b@abc.com'
    },
    {
        id: "2",
        name: "Alan Turing",
        birthDate: "1912-06-23",
        username: "@complete",
        email: 'a@abc.com'
    }
];

const usernames = [
    {id: "1", username: "@ada"},
    {id: "2", username: "@complete"}
];

const reviews = [
    {
        id: "1",
        authorID: "1",
        product: {upc: "1"},
        body: "Love it!"
    },
    {
        id: "2",
        authorID: "1",
        product: {upc: "2"},
        body: "Too expensive."
    },
    {
        id: "3",
        authorID: "2",
        product: {upc: "3"},
        body: "Could be better."
    },
    {
        id: "4",
        authorID: "2",
        product: {upc: "1"},
        body: "Prefer something else."
    }
];