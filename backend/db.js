import { MongoClient } from "mongodb";

let uri = "mongodb://localhost:27017"; // Replace with your MongoDB URI
let dbName = "test"; // Replace with your database name
let collectionName = "test"; // Replace with your collection name

export async function executeQuery(query) {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    console.log("Connected");
    const db = client.db(dbName);
    return await db.collection(collectionName).find(query).toArray();
  } catch (error) {
    console.error("Error executing query:", error);
    throw error;
  } finally {
    await client.close();
  }
}

export function setDatabaseConfig(newUri, newDbName, newCollectionName) {
  uri = newUri;
  dbName = newDbName;
  collectionName = newCollectionName;
}

export function getDatabaseConfig() {
  return {
    uri,
    dbName,
    collectionName,
  };
}
