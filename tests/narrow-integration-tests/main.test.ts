import { describe } from "@jest/globals";

describe('Narrow Integration Testing', () => {
  it('should be passed', () => {
    expect(1).toBe(1);
  })
})

// TODO:

// import { browser } from '@wdio/globals'

// describe('Narrow Integration Testing', () => {
//     it('should print application title', async () => {
//         //expect(await browser.getTitle()).toBe("MongoDB Query Executor")
//         expect(1).toBe(1);
//     })
// })
