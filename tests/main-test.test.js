const { _electron: electron } = require('playwright');
const assert = require('assert').strict;
const path = require('path');

describe('Electron Application Tests', () => {
  let electronApp;
  let window;

  beforeAll(async () => {
    const appPath = path.join(__dirname, '..', 'main.js'); // Adjust the path if necessary
    electronApp = await electron.launch({
      args: [appPath],
    });

    window = await electronApp.firstWindow();
  });

  afterAll(async () => {
    await electronApp.close();
  });

  test('Window title should be "MongoDB Query Executor"', async () => {
    const title = await window.title();
    console.log(`Window title: ${title}`);
    assert.strictEqual(title, 'MongoDB Query Executor');
  });
});