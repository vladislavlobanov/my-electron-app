const { MongoClient } = require('mongodb');

let uri = 'mongodb://localhost:27017'; // Replace with your MongoDB URI
let dbName = 'test'; // Replace with your database name
let collectionName = 'test'; // Replace with your collection name
let theme = 'default'; // Default theme

async function executeQuery(query) {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    console.log("Connected");
    const db = client.db(dbName);
    return await db.collection(collectionName).find(query).toArray();
  } catch (error) {
    console.error('Error executing query:', error);
    throw error;
  } finally {
    await client.close();
  }
}

function storeSettings(newUri, newDbName, newCollectionName, newTheme) {
  uri = newUri;
  dbName = newDbName;
  collectionName = newCollectionName;
  theme = newTheme;
}

function getSettings() {
  return {
    uri,
    dbName,
    collectionName,
    theme
  };
}

module.exports = { executeQuery, storeSettings, getSettings };