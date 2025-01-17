import express from "express";
import cors from "cors";
import path from "path";
import fs from "fs";
import sqlite3 from "sqlite3";

import { executeQuery } from "./db.js";
import { isCurrentVersionHigher } from "./utils.js";
import { fileURLToPath } from "url";

// Determine __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// eslint-disable-next-line no-undef
const isDev = process.env.DEV != undefined;

const app = express();
app.use(cors()); // Enable CORS for all routes
app.use(express.json());

//Fetch settings from SQLite
async function getSettings() {
  return new Promise((resolve, reject) => {
    db.get("SELECT * FROM settings WHERE id = 1", (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
}

app.post("/query", async (req, res) => {
  const { query } = req.body; // The query is sent in the request body
  console.log("Received query:", query); // Log the received query

  try {
    // Step 1: Get the settings from the SQLite database
    const settings = await getSettings();
    if (!settings) {
      return res.status(500).send({ error: "Settings not found." });
    }

    // Step 2: Extract URI, dbName, and collectionName from the settings
    const { uri, dbName, collectionName } = settings;
    console.log("Using settings:", uri, dbName, collectionName);

    // Step 3: Execute the query using the settings
    const result = await executeQuery(query, uri, dbName, collectionName);
    console.log("Query executed successfully:", result); // Log the result on success

    // Step 4: Send back the result as the response
    res.json(result);
  } catch (error) {
    console.error("Query execution failed:", error);
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
  -- Create the first table 'queries' if it does not exist
  CREATE TABLE IF NOT EXISTS queries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    query TEXT NOT NULL,
    output TEXT NOT NULL
  );

  -- Create the second table 'settings' if it does not exist
  CREATE TABLE IF NOT EXISTS settings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    theme TEXT CHECK(theme IN ('light', 'dark', 'system')) NOT NULL,
    uri TEXT NOT NULL,
    dbName TEXT NOT NULL,
    collectionName TEXT NOT NULL
  );

  -- Insert the single row into 'settings' if it doesn't already exist
  INSERT OR IGNORE INTO settings (id, theme, uri, dbName, collectionName)
  VALUES (1, 'system', 'mongodb://localhost:27017', 'test', 'test');
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

// GET /api/settings - Get settings
app.get("/api/settings", (req, res) => {
  db.get("SELECT * FROM settings WHERE id = 1", (err, row) => {
    if (err) {
      console.error("Error fetching settings:", err);
      return res.status(500).json({ error: "Failed to fetch settings" });
    }
    if (!row) {
      return res.status(404).json({ error: "Settings not found" });
    }
    res.json(row);
  });
});

// POST /api/settings - Update or rewrite settings
app.post("/api/settings", (req, res) => {
  const { theme, uri, dbName, collectionName } = req.body;

  db.run(
    `INSERT INTO settings (id, theme, uri, dbName, collectionName)
     VALUES (1, ?, ?, ?, ?)
     ON CONFLICT(id) DO UPDATE SET
       theme = excluded.theme,
       uri = excluded.uri,
       dbName = excluded.dbName,
       collectionName = excluded.collectionName`,
    [theme, uri, dbName, collectionName],
    function (err) {
      if (err) {
        console.error("Error updating settings:", err);
        return res.status(500).json({ error: "Failed to update settings" });
      }
      res.json({ message: "Settings updated successfully" });
    }
  );
});

// GET /api/check-version - Check version
app.get("/api/check-version", async (req, res) => {
  const request = await fetch(process.env.VITE_VERSION_API);
  const response = await request.json();
  res.status(200).json({
    success: true,
    isLatestVersion: isCurrentVersionHigher(response?.tag_name, process.env.npm_package_version),
  });
});

app.listen(5001, () => {
  console.log("ready");
  console.log("Server running on port 5001");
});
