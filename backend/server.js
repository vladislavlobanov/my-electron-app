const express = require("express");
const { executeQuery, setDatabaseConfig, getDatabaseConfig } = require("./db");
const cors = require("cors");

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
  } catch (error) {
    console.error("Query execution failed:", error); // Log the error on failure
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