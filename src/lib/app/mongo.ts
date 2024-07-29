import "server-only"
import { MongoClient, ServerApiVersion } from 'mongodb';
const uri: string | undefined = process.env.MONGODB_URI;
if (!uri) {
    throw new Error("MongoDB URI doesn't exist");
}
const mongoClient: MongoClient = new MongoClient(uri,{
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

export default mongoClient;