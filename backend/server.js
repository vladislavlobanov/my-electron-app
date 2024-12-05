const express = require("express");
const { executeQuery, setDatabaseConfig, getDatabaseConfig } = require("./db");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const Database = require("better-sqlite3");

const app = express();
app.use(cors()); // Enable CORS for all routes
app.use(express.json());

app.post("/query", async (req, res) => {
  const { query } = req.body;
  console.log("Received query:", query); // Log the received query

  try {
    const result = await executeQuery(query);
    console.log("Query executed successfully:", result); // Log the result on success
    res.json(result);
  } catch {
    res.status(500).send({ error: "Query execution failed." });
  }
});

// Define the path to the localstorage folder
const localStorageFolder = path.join(__dirname, "../localStorage");
if (!fs.existsSync(localStorageFolder)) {
  // Create the localstorage folder if it doesn't exist
  fs.mkdirSync(localStorageFolder);
  console.log("localStorage folder created");
}
// Create DB
const dbPath = path.join(__dirname, "../localStorage/app.db");
const db = new Database(dbPath);

db.exec(`
  CREATE TABLE IF NOT EXISTS queries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    query TEXT NOT NULL,
    output TEXT NOT NULL
  );
`);

// GET all saved queries
app.get("/api/queries", (req, res) => {
  try {
    const stmt = db.prepare("SELECT * FROM queries");
    const queries = stmt.all();
    res.status(200).json({ success: true, queries });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST a single query
app.post("/api/queries", (req, res) => {
  const { query, output } = req.body;

  try {
    const stmt = db.prepare(
      "INSERT INTO queries (query, output) VALUES (?, ?)"
    );
    const result = stmt.run(JSON.stringify(query), JSON.stringify(output)); // Serialize before insertion
    res.status(201).json({ success: true, id: result.lastInsertRowid });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post("/setDatabaseConfig", (req, res) => {
  const { uri, dbName, collectionName } = req.body;
  setDatabaseConfig(uri, dbName, collectionName);
  res.send({ message: "Database configuration updated." });
  console.log("setDatabaseConfig:", uri, dbName, collectionName);
});

app.get("/getDatabaseConfig", (req, res) => {
  const config = getDatabaseConfig();
  res.json(config);
  console.log("getDatabaseConfig:", config);
});

app.listen(5001, () => console.log("Server running on port 5001"));