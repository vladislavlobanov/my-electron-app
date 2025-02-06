import React, { useState, useEffect, ChangeEvent } from "react";

enum ThemeEnum {
  Light = "light",
  Dark = "dark",
  System = "system",
}
interface Settings {
  theme: ThemeEnum;
  advancedSettings: boolean;
  uri: string;
  dbName: string;
  collectionName: string;
}

function App() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<object | string>();
  const [isAdvanced, setIsAdvanced] = useState<boolean>(false);
  const [history, setHistory] = useState([]);
  const [settings, setSettings] = useState<Settings | null>(null);
  const [showSettings, setShowSettings] = useState(false);

  const [theme, setTheme] = useState<ThemeEnum>();
  const [advancedSettings, setAdvancedSettings] = useState<boolean>();
  const [uri, setUri] = useState<string>();
  const [dbName, setDbName] = useState<string>();
  const [collectionName, setCollectionName] = useState<string>();
  const [systemTheme, setSystemTheme] = useState<string>("light");
  const [isExecutingQuery, setIsExecutingQuery] = useState<boolean>();

  const [newVersion, setNewVersion] = useState(true);

  useEffect(() => {
    const checkNewVersion = async () => {
      const response = await fetch("http://localhost:5001/api/check-version");
      const data = await response.json();
      setNewVersion(data.isLatestVersion);
    };

    fetchSettings();
    fetchHistory();
    checkNewVersion();
  }, []);

  window.ipcRenderer.on("open-settings", () => {
    setShowSettings(true);
  });

  window.ipcRenderer.on("isDarkMode-onInitialOpen", (_channel, prefersDark) => {
    setSystemTheme(prefersDark ? "dark" : "light");
  });

  window.ipcRenderer.on("set-dark-theme", (_channel, prefersDark) => {
    setSystemTheme(prefersDark ? "dark" : "light");
  });

  useEffect(() => {
    if (!systemTheme || !theme) return;

    if (theme !== "system") {
      applyTheme(theme);
    } else {
      const root = document.documentElement;
      const prefersDark = systemTheme === "dark";
      if (prefersDark) {
        root.classList.remove("light-theme");
        root.classList.add("dark-theme");
      } else {
        root.classList.remove("dark-theme");
        root.classList.add("light-theme");
      }
    }
  }, [theme, systemTheme]);

  useEffect(() => {
    setTheme(settings?.theme);
    setAdvancedSettings(settings?.advancedSettings);

    if (settings?.advancedSettings) setIsAdvanced(true);

    setUri(settings?.uri);
    setDbName(settings?.dbName);
    setCollectionName(settings?.collectionName);
  }, [settings]);

  const fetchSettings = async () => {
    try {
      const response = await fetch("http://localhost:5001/api/settings");
      const data = await response.json();

      if (response.ok && data) {
        setSettings(data);
      } else {
        console.error(data.error || "Failed to fetch settings.");
      }
    } catch (error) {
      console.error("Error fetching settings:", error);
    }
  };

  const applyTheme = (selectedTheme: ThemeEnum) => {
    const root = document.documentElement;
    if (selectedTheme === "light") {
      root.classList.remove("dark-theme");
      root.classList.add("light-theme");
    } else if (selectedTheme === "dark") {
      root.classList.remove("light-theme");
      root.classList.add("dark-theme");
    }
  };

  const handleThemeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTheme(e.target.value as ThemeEnum);
  };

  const handleSettingsClose = () => {
    setTheme(settings?.theme);
    setAdvancedSettings(settings?.advancedSettings);
    setUri(settings?.uri);
    setDbName(settings?.dbName);
    setCollectionName(settings?.collectionName);
    setShowSettings(false);
  };

  async function updateSettings(settingsData: Settings) {
    try {
      const response = await fetch("http://localhost:5001/api/settings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...settingsData,
          advancedSettings: advancedSettings ? 1 : 0,
        }),
      });

      setSettings(settingsData);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      setShowSettings(false);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Request failed:", error.message);
      } else {
        console.error("Unknown error occurred", error);
      }
    }
  }

  const handleQuerySubmit = async () => {
    setIsExecutingQuery(true);
    try {
      const parsedQuery = JSON.parse(query); // Parse the query from the text input
      // Make a POST request to the backend
      const response = await fetch("http://localhost:5001/query", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: parsedQuery }),
      });

      if (!response.ok) {
        throw new Error("Query execution failed");
      }

      const data = await response.json(); // Parse the response data
      setResult(data); // Set the result to the state for display
      await addQueryToHistory(parsedQuery, data);
    } catch (error) {
      const errorResult = { error: "Invalid query or server error." };
      console.log({ error });
      setResult(errorResult);
      await addQueryToHistory(query, "Invalid query or server error.");
    }
    setIsExecutingQuery(false);
  };

  const handleHistoryItemClick = (item: { query: string; output: string }) => {
    setQuery(item.query);
    setResult(JSON.parse(item.output));
  };

  const addQueryToHistory = async (parsedQuery: string, result: string) => {
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

  if (!settings) return null;

  return (
    <div className="app-content">
      {showSettings && (
        <div className="modal-overlay">
          <div className="modal-dialog" data-testid={"settingsModal"}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Settings</h5>
                <button
                  type="button"
                  className="close"
                  onClick={handleSettingsClose}
                >
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="app-settings">
                  <div>
                    <h5>Select Theme</h5>
                    <div className="form-group">
                      <div className="form-check">
                        <input
                          data-testid={"lightThemeSelector"}
                          className="form-check-input"
                          type="radio"
                          name="themeOptions"
                          id="lightTheme"
                          value="light"
                          defaultChecked={settings.theme === "light"}
                          onChange={handleThemeChange}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="lightTheme"
                        >
                          Light
                        </label>
                      </div>
                    </div>

                    <div className="form-check">
                      <input
                        data-testid={"darkThemeSelector"}
                        className="form-check-input"
                        type="radio"
                        name="themeOptions"
                        id="darkTheme"
                        value="dark"
                        defaultChecked={settings.theme === "dark"}
                        onChange={handleThemeChange}
                      />
                      <label className="form-check-label" htmlFor="darkTheme">
                        Dark
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        data-testid={"systemThemeSelector"}
                        className="form-check-input"
                        type="radio"
                        name="themeOptions"
                        id="systemTheme"
                        value="system"
                        defaultChecked={settings.theme === "system"}
                        onChange={handleThemeChange}
                      />
                      <label className="form-check-label" htmlFor="systemTheme">
                        As in System
                      </label>
                    </div>
                  </div>
                  <div>
                    <h5>Advanced View</h5>
                    <div className="form-check">
                      <input
                        data-testid={"advancedViewOnStartCheckbox"}
                        className="form-check-input"
                        type="checkbox"
                        name="themeOptions"
                        id="advancedViewOnStartCheckbox"
                        value=""
                        checked={advancedSettings}
                        onChange={() => setAdvancedSettings(!advancedSettings)}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="advancedViewOnStartCheckbox"
                      >
                        On app start
                      </label>
                    </div>
                  </div>
                </div>
                <h5>Database Settings</h5>
                <div className="form-group">
                  <label htmlFor="uriInput">URI</label>
                  <input
                    data-testid={"URI"}
                    type="text"
                    id="uriInput"
                    className="form-control mb-2"
                    value={uri}
                    onChange={(e) => setUri(e.target.value)}
                  />
                  <label htmlFor="dbNameInput">Database Name</label>
                  <input
                    data-testid={"databaseName"}
                    type="text"
                    id="dbNameInput"
                    className="form-control mb-2"
                    value={dbName}
                    onChange={(e) => setDbName(e.target.value)}
                  />
                  <label htmlFor="collectionNameInput">Collection Name</label>
                  <input
                    data-testid={"collectionName"}
                    type="text"
                    id="collectionNameInput"
                    className="form-control mb-2"
                    value={collectionName}
                    onChange={(e) => setCollectionName(e.target.value)}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-testid={"cancelSeetingsModalButton"}
                  onClick={handleSettingsClose}
                >
                  Cancel
                </button>
                <div className="ml-2 mr-2" style={{ width: "20px" }}></div>
                <button
                  data-testid={"applySeetingsModalButton"}
                  type="button"
                  className="btn btn-primary"
                  onClick={() =>
                    updateSettings({
                      theme,
                      advancedSettings,
                      uri,
                      dbName,
                      collectionName,
                    } as Settings)
                  }
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="bar titlebar">MongoDB Query Executor</div>

      {!newVersion && (
        <div className="bar version" data-testid={"versionBanner"}>
          New version is available!
        </div>
      )}

      <div className="app-body">
        <div className="app-top">
          <div className="col-md-8">
            <div className="form-check form-switch">
              <input
                data-testid={"advancedViewToggle"}
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

        <div className="app-bottom">
          <div className="app-action">
            <div className={`card shadow-sm ${isAdvanced ? "sticky-top" : ""}`}>
              <div className="card-body">
                <h5 className="card-title">Enter MongoDB Query</h5>
                <textarea
                  data-testid={"query"}
                  className={`form-control mb-3 ${
                    theme === "dark" ? "dark-textarea" : ""
                  }`}
                  rows={6}
                  placeholder="Enter MongoDB query (e.g., { age: { $gt: 25 } })"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <button
                  data-testid={"runQueryButton"}
                  className="btn btn-primary btn-block"
                  onClick={handleQuerySubmit}
                  disabled={isExecutingQuery}
                >
                  Run Query
                </button>
              </div>
            </div>
          </div>
          <div
            className={`app-res-his-wrapper ${
              isAdvanced ? "flex-row" : "flex-column"
            }`}
          >
            {result && (
              <div
                className={`app-results ${
                  !isAdvanced ? "overflow-visible" : ""
                }`}
              >
                <div className={`card shadow-sm`}>
                  <div className="card-body">
                    <h5>Query Result</h5>
                    <pre data-testid={"queryResult"}>
                      {JSON.stringify(result, null, 2)}
                    </pre>
                  </div>
                </div>
              </div>
            )}
            <div className="app-history">
              {isAdvanced && (
                <div className={`card shadow-sm`}>
                  <div className="card-body">
                    <h5>Query History</h5>
                    <div className="list-group" data-testid={"queryHistory"}>
                      {history.map(
                        (item: { query: string; output: string }, index) => (
                          <div
                            data-testid={"queryHistorySingleElement"}
                            key={index}
                            className={`list-group-item list-group-item-action text-truncate ${
                              theme === "dark" ||
                              (theme === "system" && systemTheme === "dark")
                                ? "dark-list-group-item"
                                : ""
                            }`}
                            onClick={() => handleHistoryItemClick(item)}
                          >
                            {`Query: ${item.query} | Result: ${item.output}`}
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
