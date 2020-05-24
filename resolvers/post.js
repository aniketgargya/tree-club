const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');

dotenv.config();

const dbName = 'tree-club';
const opts = { useUnifiedTopology: true };

const getPosts = async () => {
    const client = await MongoClient.connect(process.env.MONGO_URI, opts);
    const db = client.db(dbName);
    const posts = await db.collection('post').find({}).sort({ created: -1 }).toArray();

    client.close();

    return posts;
};

const createPost = async (parent, { markdown }) => {
    const client = await MongoClient.connect(process.env.MONGO_URI, opts);
    const db = client.db(dbName);

    const res = await db.collection('post').insertOne({
        markdown,
        created: Date.now()
    });

    const [post] = res.ops;
    return post;
};

module.exports = { getPosts, createPost };