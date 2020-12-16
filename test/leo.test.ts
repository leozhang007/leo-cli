import leo, { list } from '../src'

test('<test-title>', async () => {
  expect(typeof leo).toBe('function')
  expect(typeof list).toBe('function')
})
