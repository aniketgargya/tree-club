const { ApolloServer, gql, ApolloError, AuthenticationError } = require('apollo-server-express');
const { getPosts, createPost } = require('./resolvers/post');
const { v4 } = require('uuid');

const typeDefs = gql`

type Post {
    _id: String!
    markdown: String!
    created: String!
}

type Query {
    getPosts: [Post!]!
}

type Mutation {
    createPost(markdown: String!): Post!
}

`;

const resolvers = {
    Query: {
        getPosts
    },
    Mutation: {
        createPost
    }
};

const formatError = error => {
    if (!(error.originalError instanceof ApolloError || error.originalError instanceof AuthenticationError)) {
        const errorCode = v4();
        console.log(errorCode);
        console.log(error);
        return new ApolloError(`An error occurred within the server: Error ${errorCode}`);
    } else {
        return error;
    }
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
    formatError,
    debug: true
});

module.exports = server;