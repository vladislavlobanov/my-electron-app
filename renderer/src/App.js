import React, { useState } from 'react';
import './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);

  const handleQuerySubmit = async () => {
    try {
      const parsedQuery = JSON.parse(query); // Parse the query from the text input
      
      // Make a POST request to the backend
      const response = await fetch('http://localhost:5001/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: parsedQuery }), // Send the parsed query
      });

      if (!response.ok) {
        throw new Error('Query execution failed');
      }

      const data = await response.json(); // Parse the response data
      setResult(data); // Set the result to the state for display
    } catch (error) {
      setResult({ error: 'Invalid query or server error.' }); // Display error if any
    }
  };


  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">MongoDB Query Executor</h1>
      
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-sm">
            <div className="card-body">
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
            <div className="mt-4">
              <h5>Query Result</h5>
              <div className="card p-3">
                <pre>{JSON.stringify(result, null, 2)}</pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
