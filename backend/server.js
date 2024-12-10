import express from "express";
import cors from "cors";
import path from "path";
import fs from "fs";
import sqlite3 from "sqlite3";
import { executeQuery, setDatabaseConfig, getDatabaseConfig } from "./db.js";
import { fileURLToPath } from "url";

// Determine __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// eslint-disable-next-line no-undef
const isDev = process.env.DEV != undefined;

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
const localStorageFolder = !isDev
  ? path.join(__dirname, "localStorage")
  : path.join(__dirname, "../src/localStorage");

if (!fs.existsSync(localStorageFolder)) {
  // Create the localstorage folder if it doesn't exist
  fs.mkdirSync(localStorageFolder);
  console.log("localStorage folder created");
}

// Create DB
const db = new sqlite3.Database(path.join(localStorageFolder, "app.db"));

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
    // Use db.all() with a callback for async execution
    db.all("SELECT * FROM queries", [], (err, rows) => {
      if (err) {
        console.error("Error retrieving queries:", err);
        return res.status(500).json({ success: false, error: err.message });
      }

      // Send the result as a JSON response
      res.status(200).json({ success: true, queries: rows });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST a single query
app.post("/api/queries", (req, res) => {
  const { query, output } = req.body;

  try {
    db.run(
      "INSERT INTO queries (query, output) VALUES (?, ?)",
      [JSON.stringify(query), JSON.stringify(output)],
      function (err) {
        if (err) {
          console.error("Error inserting data:", err);
          return res.status(500).json({ success: false, error: err.message });
        }
        res.status(201).json({ success: true, id: this.lastInsertRowid });
      }
    );
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

app.listen(5001, () => {
  console.log("ready");
  console.log("Server running on port 5001");
});
