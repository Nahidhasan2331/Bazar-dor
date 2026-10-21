import { MongoClient, type Db } from "mongodb";
import dns from "node:dns";

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || "bazardor";

if (!uri) {
  throw new Error("MONGODB_URI is missing");
}

const globalForMongo = globalThis as typeof globalThis & {
  _mongoClient?: MongoClient;
};

export const client = globalForMongo._mongoClient ?? new MongoClient(uri);

if (process.env.NODE_ENV !== "production") {
  globalForMongo._mongoClient = client;
}

export const db: Db = client.db(dbName);
