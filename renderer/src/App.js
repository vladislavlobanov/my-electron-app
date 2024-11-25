import React, { useState } from 'react';
import './styles.css';

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
    <div className="App">
      <h1>MongoDB Query Executor</h1>
      <textarea
        placeholder="Enter MongoDB query (e.g., { age: { $gt: 25 } })"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleQuerySubmit}>Run Query</button>
      <div className="result">
        <pre>{JSON.stringify(result, null, 2)}</pre>
      </div>
    </div>
  );
}

export default App;
