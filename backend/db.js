import { MongoClient } from "mongodb";

export async function executeQuery(query, uri, dbName, collectionName) {
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
