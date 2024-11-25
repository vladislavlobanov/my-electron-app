const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017'; // Replace with your MongoDB URI
const client = new MongoClient(uri);

async function executeQuery(query) {
  try {
    await client.connect();
    console.log("Connected")
    const db = client.db('test'); // Replace with your database name
    return await db.collection('test').find(query).toArray(); // Replace with your collection name
  } catch (error) {
    console.error('Error executing query:', error);
    throw error;
  } finally {
    await client.close();
  }
}

module.exports = { executeQuery };
