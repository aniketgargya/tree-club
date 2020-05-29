import { gql, ApolloServer, ApolloError, AuthenticationError } from 'apollo-server-micro';
import { v4 } from 'uuid';
import { getPosts, createPost } from '../../backend/resolvers/post';
import { author, imageURL, signUp, signIn } from '../../backend/resolvers/auth';
import chalk from 'chalk';

const typeDefs = gql`

type User {
    email: String!
    name: String!
    imageURL: String!
}

type Post {
    _id: String!
    markdown: String!
    created: String!
    author: User!
}

type JWT {
    token: String!
    user: User!
}

type Query {
    getPosts: [Post!]!
    signIn(email: String!, password: String!): JWT!
}

type Mutation {
    createPost(markdown: String!): Post!
    signUp(email: String!, password: String!, name: String!): JWT!
}

`;

const resolvers = {
    User: {
        imageURL
    },
    Post: {
        author
    },
    Query: {
        getPosts,
        signIn
    },
    Mutation: {
        createPost,
        signUp,
    }
};

const context = ({ req, res }) => {
    try {
        if (req.headers.authorization) {
            const token = req.headers.authorization.split(" ")[1];
            return { token };
        }
    } catch {
        return { token: null };
    }
};

const formatError = error => {
    if (!(error.originalError instanceof ApolloError || error.originalError instanceof AuthenticationError)) {
        const errorCode = v4();
        console.log(chalk.red(errorCode));
        console.log(chalk.red(error));
        return new ApolloError(`An error occurred within the server: Error ${errorCode}`);
    } else {
        return error;
    }
};

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context,
    formatError,
    debug: false
});

const handler = apolloServer.createHandler({ path: "/api/graphql" });

export const config = {
    api: {
        bodyParser: false
    }
};

export default handler;