import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const options = {};

let client;
let clientPromise: Promise<MongoClient>;

if(!process.env.MONGODB_URI){
    throw new Error("Please add your Mongo URI to .env.local")
}

declare global{
    var _mongoClientPromise: Promise<MongoClient>;
}
if(process.env.NODE_ENV ==="development"){
    // Reuse global connection in dev to avoid hot-reload issues
    if(!global._mongoClientPromise){
        client = new MongoClient(uri, options);
        global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
}else{
    // Create a new connection in production
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
}

export default clientPromise;