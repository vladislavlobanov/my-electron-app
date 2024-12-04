const express = require("express");
const { executeQuery, setDatabaseConfig, getDatabaseConfig } = require("./db");
const cors = require("cors");

const app = express();
app.use(cors()); // Enable CORS for all routes
app.use(express.json());

app.post("/query", async (req, res) => {
  const { query } = req.body;
  try {
    const result = await executeQuery(query);
    res.json(result);
  } catch {
    res.status(500).send({ error: "Query execution failed." });
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