import { browser } from '@wdio/globals'

describe('Electron Testing', () => {
    it('should print application title', async () => {
        expect(await browser.getTitle()).toBe("MongoDB Query Executor")
    })
})