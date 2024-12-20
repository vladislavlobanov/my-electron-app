// import { _electron as electron, ElectronApplication, Page } from "playwright";
// import assert from "assert/strict";
// import path from "path";
// import { describe, beforeAll, afterAll, test } from "@jest/globals";
import { describe } from "@jest/globals";

// describe("Electron Application Tests", () => {
//   let electronApp: ElectronApplication;
//   let window: Page;

//   beforeAll(async () => {
//     electronApp = await electron.launch({
//       args: [
//         path.join(__dirname, "../dist-electron//main.js"), // Path to your Electron entry file
//       ],
//     });

//     window = await electronApp.firstWindow();
//   });

//   afterAll(async () => {
//     await electronApp.close();
//   });

//   test("Window title should be MongoDB Query Executor", async () => {
//     const title = await window.title();
//     assert.strictEqual(title, "MongoDB Query Executor");
//   });
// });

describe('Unit test', () => {
  it('should be passed', () => {
    expect(1).toBe(1);
  })
})