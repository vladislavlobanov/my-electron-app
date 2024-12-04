import React, { useState, useEffect } from "react";
import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [isAdvanced, setIsAdvanced] = useState(false);
  const [history, setHistory] = useState([]); // To store query history

  const handleQuerySubmit = async () => {
    try {
      const parsedQuery = JSON.parse(query); // Parse the query from the text input
      // Make a POST request to the backend
      const response = await fetch("http://localhost:5001/query", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: parsedQuery }), // Send the parsed query
      });

      if (!response.ok) {
        throw new Error("Query execution failed");
      }

      const data = await response.json(); // Parse the response data
      setResult(data); // Set the result to the state for display
      addQueryToHistory(parsedQuery, data);
    } catch (error) {
      const errorResult = { error: "Invalid query or server error." };
      console.log({ error });
      setResult(errorResult);
      addQueryToHistory(query, "Invalid query or server error.");
    }
  };

  const handleHistoryItemClick = (item) => {
    setQuery(item.query);
    setResult(item.result);
  };

  const addQueryToHistory = async (parsedQuery, result) => {
    try {
      await fetch("http://localhost:5001/api/queries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: parsedQuery,
          output: result,
        }),
      });
      fetchHistory();
    } catch (error) {
      console.log({ error });
    }
  };

  const fetchHistory = async () => {
    const response = await fetch("http://localhost:5001/api/queries");
    const data = await response.json();
    if (data.success) {
      setHistory(data.queries);
    } else {
      console.error(data.error);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <div className="container mt-5">
      <div className="row justify-content-center mb-4">
        <div className="col-md-8">
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              role="switch"
              id="flexSwitchCheckDefault"
              checked={isAdvanced}
              onChange={() => setIsAdvanced(!isAdvanced)}
            />
            <label
              className="form-check-label"
              htmlFor="flexSwitchCheckDefault"
            >
              Advanced view
            </label>
          </div>
        </div>
      </div>

      <h1 className="text-center mb-4">MongoDB Query Executor</h1>

      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-sm">
            <div className={`card-body ${isAdvanced ? "sticky-top" : ""}`}>
              <h5 className="card-title">Enter MongoDB Query</h5>
              <textarea
                className="form-control mb-3"
                rows="6"
                placeholder="Enter MongoDB query (e.g., { age: { $gt: 25 } })"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button
                className="btn btn-primary btn-block"
                onClick={handleQuerySubmit}
              >
                Run Query
              </button>
            </div>
          </div>

          {result && (
            <div
              className={`card shadow-sm mt-4 ${
                isAdvanced ? "sticky-top" : ""
              }`}
            >
              <div className="card-body">
                <h5>Query Result</h5>
                <pre>{JSON.stringify(result, null, 2)}</pre>
              </div>
            </div>
          )}

          {isAdvanced && (
            <div className="mt-4">
              <h5>Query History</h5>
              <div className="list-group">
                {history.map((item, index) => (
                  <button
                    key={index}
                    className="list-group-item list-group-item-action text-truncate" // Truncates long text
                    onClick={() => handleHistoryItemClick(item)}
                  >
                    {`Query: ${item.query} | Result: ${item.output}`}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
