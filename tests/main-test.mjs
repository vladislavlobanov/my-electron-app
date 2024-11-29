import { _electron as electron } from 'playwright';
import { strict as assert } from 'assert';

const appPath = './main.js'; 

(async () => {
    const electronApp = await electron.launch({
        args: [appPath],
    });

    const window = await electronApp.firstWindow();

    const title = await window.title();
    console.log(`Window title: ${title}`);
    assert.equal(title, 'MongoDB Query Executor');

    await electronApp.close();
})();
