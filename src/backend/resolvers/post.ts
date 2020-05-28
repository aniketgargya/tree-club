import { MongoClient } from 'mongodb';
import { mongoUri, dbName, opts } from '../database';
import { verify } from './auth';

const getPosts = async () => {
    const client = await MongoClient.connect(mongoUri, opts);
    try {
        const db = client.db(dbName);
        const posts = await db.collection('post').find({}).sort({ created: -1 }).toArray();
        return posts;
    } finally {
        client.close();
    }
};

const createPost = async (_, { markdown }, { token }) => {
    const user = await verify(token);

    const client = await MongoClient.connect(mongoUri, opts);
    try {
        const db = client.db(dbName);

        const res = await db.collection('post').insertOne({
            authorId: user._id,
            markdown,
            created: Date.now()
        });

        const [post] = res.ops;

        return post;
    } finally {
        client.close();
    }
};

export { getPosts, createPost };