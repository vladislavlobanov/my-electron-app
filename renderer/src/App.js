import React, { useState, useEffect } from 'react';
import './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
const { ipcRenderer } = window.require('electron');

function App() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);
  const [isAdvanced, setIsAdvanced] = useState(false);
  const [history, setHistory] = useState([]); // To store query history
  const [showSettings, setShowSettings] = useState(false);
  const [theme, setTheme] = useState('system'); // Default theme

  useEffect(() => {
    // Listen for 'open-settings' IPC message
    ipcRenderer.on('open-settings', () => {
      setShowSettings(true);
    });

    // Cleanup listener on unmount
    return () => {
      ipcRenderer.removeAllListeners('open-settings');
    };
  }, []);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  useEffect(() => {
    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = () => {
        applyTheme('system');
      };
      mediaQuery.addEventListener('change', handleChange);

      // Cleanup listener on unmount
      return () => {
        mediaQuery.removeEventListener('change', handleChange);
      };
    }
  }, [theme]);

  const applyTheme = (selectedTheme) => {
    const root = document.documentElement;
    if (selectedTheme === 'light') {
      root.classList.remove('dark-theme');
      root.classList.add('light-theme');
    } else if (selectedTheme === 'dark') {
      root.classList.remove('light-theme');
      root.classList.add('dark-theme');
    } else if (selectedTheme === 'system') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) {
        root.classList.remove('light-theme');
        root.classList.add('dark-theme');
      } else {
        root.classList.remove('dark-theme');
        root.classList.add('light-theme');
      }
    }
  };

  const handleThemeChange = (e) => {
    setTheme(e.target.value);
  };

  const handleSettingsClose = () => {
    setShowSettings(false);
  };

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
      setHistory([...history, { query, result: data }]); // Save to history
    } catch (error) {
      const errorResult = { error: 'Invalid query or server error.' };
      console.log({ error });
      setResult(errorResult);
      setHistory([...history, { query, result: errorResult }]); // Save to history
    }
  };

  const handleHistoryItemClick = (item) => {
    setQuery(item.query);
    setResult(item.result);
  };

  return (
    <div className="container mt-5">
      {/* Settings Modal */}
      {showSettings && (
        <div className="modal-overlay">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Settings</h5>
                <button type="button" className="close" onClick={handleSettingsClose}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <h5>Select Theme</h5>
                <div className="form-group">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="themeOptions"
                      id="lightTheme"
                      value="light"
                      checked={theme === 'light'}
                      onChange={handleThemeChange}
                    />
                    <label className="form-check-label" htmlFor="lightTheme">
                      Light
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="themeOptions"
                      id="darkTheme"
                      value="dark"
                      checked={theme === 'dark'}
                      onChange={handleThemeChange}
                    />
                    <label className="form-check-label" htmlFor="darkTheme">
                      Dark
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="themeOptions"
                      id="systemTheme"
                      value="system"
                      checked={theme === 'system'}
                      onChange={handleThemeChange}
                    />
                    <label className="form-check-label" htmlFor="systemTheme">
                      As in System
                    </label>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleSettingsClose}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Rest of your App.js content */}
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
            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
              Advanced view
            </label>
          </div>
        </div>
      </div>

      <h1 className="text-center mb-4">MongoDB Query Executor</h1>

      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-sm">
            <div className={`card-body ${isAdvanced ? 'sticky-top' : ''}`}>
              <h5 className="card-title">Enter MongoDB Query</h5>
              <textarea
                className={`form-control mb-3 ${theme === 'dark' ? 'dark-textarea' : ''}`}
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
            <div className={`card shadow-sm mt-4 ${isAdvanced ? 'sticky-top' : ''}`}>
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
                    className="list-group-item list-group-item-action text-truncate"
                    onClick={() => handleHistoryItemClick(item)}
                  >
                    {`Query: ${item.query} | Result: ${JSON.stringify(item.result)}`}
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