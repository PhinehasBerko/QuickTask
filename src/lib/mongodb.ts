import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI!;
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

/*
(alias) class MongoClient
import MongoClient
@public
The MongoClient class is a class that allows for making Connections to MongoDB.

NOTE: The programmatically provided options take precedence over the URI options.

@remarks
A MongoClient is the entry point to connecting to a MongoDB server.

It handles a multitude of features on your application's behalf:

Server Host Connection Configuration: A MongoClient is responsible for reading TLS cert, ca, and crl files if provided.
SRV Record Polling: A "mongodb+srv" style connection string is used to have the MongoClient resolve DNS SRV records of all server hostnames which the driver periodically monitors for changes and adjusts its current view of hosts correspondingly.
Server Monitoring: The MongoClient automatically keeps monitoring the health of server nodes in your cluster to reach out to the correct and lowest latency one available.
Connection Pooling: To avoid paying the cost of rebuilding a connection to the server on every operation the MongoClient keeps idle connections preserved for reuse.
Session Pooling: The MongoClient creates logical sessions that enable retryable writes, causal consistency, and transactions. It handles pooling these sessions for reuse in subsequent operations.
Cursor Operations: A MongoClient's cursors use the health monitoring system to send the request for more documents to the same server the query began on.
Mongocryptd process: When using auto encryption, a MongoClient will launch a mongocryptd instance for handling encryption if the mongocrypt shared library isn't in use.
There are many more features of a MongoClient that are not listed above.

In order to enable these features, a number of asynchronous Node.js resources are established by the driver: Timers, FS Requests, Sockets, etc. For details on cleanup, please refer to the MongoClient close() documentation.

@example

import { MongoClient } from 'mongodb';
// Enable command monitoring for debugging
const client = new MongoClient('mongodb://localhost:27017?appName=mflix', { monitorCommands: true });

*/