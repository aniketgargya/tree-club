import { MongoClient, ObjectID } from 'mongodb';
import crypto from 'crypto';
import { v1 } from 'uuid';
import axios from 'axios';
import { ApolloError, AuthenticationError } from 'apollo-server-micro';
import jwt, { decode } from 'jsonwebtoken';
import { mongoUri, dbName, opts } from '../database';
import { DecodedToken } from '../../runtypes';

const hashPassword = (salt, password) => crypto.createHmac('sha1', salt).update(password).digest('hex');
const hashEmail = (email) => crypto.createHash('md5').update(email).digest("hex");

const getAuthorImage = async (email: string): Promise<string> => {
    try {
        const { data: { entry: [{ thumbnailUrl }] } } = await axios(`https://www.gravatar.com/${hashEmail(email)}.json`);
        return thumbnailUrl;
    } catch {
        return "empty string";
    }
};

const imageURL = async ({ email }) => {
    return getAuthorImage(email);
};

const signUp = async (_, { email, name, password }) => {
    const client = await MongoClient.connect(mongoUri, opts);
    try {
        const db = client.db(dbName);

        const userWithEmail = await db.collection('user').findOne({ email });

        if (userWithEmail) {
            throw new ApolloError('Email is already taken');
        } else {
            const salt = v1();
            const hashedPassword = hashPassword(salt, password);
            const user = await db.collection('user').insertOne({
                email,
                name,
                hashedPassword,
                salt
            });

            const { _id } = user.ops[0];

            const token = jwt.sign(
                { data: { _id, email, name } },
                process.env.JWT_SECRET,
                { expiresIn: '24h' }
            );

            return {
                token,
                user: {
                    email,
                    name
                }
            };
        }
    } finally {
        client.close();
    }
};

const author = async ({ authorId }) => {
    const client = await MongoClient.connect(mongoUri, opts);
    try {
        const db = client.db(dbName);
        const author = await db.collection('user').findOne({ _id: authorId });
        return author;
    } finally {
        client.close();
    }
}

const logIn = async (_, { email, password }) => {
    const client = await MongoClient.connect(mongoUri, opts);
    try {
        const db = client.db(dbName);

        const userWithEmail = await db.collection('user').findOne({ email });

        if (userWithEmail) {
            const { _id, email, name, salt, hashedPassword } = userWithEmail;

            if (hashPassword(salt, password) == hashedPassword) {

                const token = jwt.sign(
                    { data: { _id, email, name } },
                    process.env.JWT_SECRET,
                    { expiresIn: '24h' }
                );

                return {
                    token,
                    user: {
                        email,
                        name
                    }
                };

            } else {
                throw new AuthenticationError('Incorrect password');
            }
        } else {
            throw new AuthenticationError('No user with that email exists');
        }
    } finally {
        client.close();
    }
};

const verify = async (token) => {
    const client = await MongoClient.connect(mongoUri, opts);

    try {
        const { data: { _id } } = DecodedToken.check(jwt.verify(token, process.env.JWT_SECRET)); /* Add runtypes */

        const db = client.db(dbName);

        const user = await db.collection('user').findOne({ _id: new ObjectID(_id) });

        return user;
    } catch (err) {
        throw new AuthenticationError('You need to sign in');
    } finally {
        client.close();
    }
};

export { signUp, logIn, verify, imageURL, author };