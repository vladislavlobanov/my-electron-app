const fs = require("fs");
const path = require("path");

const testDir = path.join(__dirname, "tests");

// Read all .mjs files in the tests directory
fs.readdir(testDir, (err, files) => {
  if (err) {
    console.error("Error reading test directory:", err);
    process.exit(1);
  }

  const testFiles = files.filter(file => file.endsWith(".mjs"));

  if (testFiles.length === 0) {
    console.log("No test files found.");
    return;
  }

  // Execute each test file sequentially
  (async () => {
    for (const file of testFiles) {
      const filePath = path.join(testDir, file);
      console.log(`Running ${filePath}...`);
      try {
        await import(filePath);
        console.log(`${file} passed.`);
      } catch (error) {
        console.error(`${file} failed:`, error);
        process.exit(1); // Exit with error on test failure
      }
    }
    console.log("All tests passed.");
  })();
});