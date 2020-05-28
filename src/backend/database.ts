const mongoUri: string = process.env.MONGO_URI;
const dbName: string = 'tree-club';
const opts = { useUnifiedTopology: true };

export { mongoUri, dbName, opts };