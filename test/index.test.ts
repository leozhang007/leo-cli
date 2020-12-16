import * as leo from '../src'

test('unit', async () => {
  expect(typeof leo.file).toBe('object')
  expect(typeof leo.http).toBe('object')
  expect(typeof leo.config).toBe('object')
  expect(typeof leo.Ware).toBe('function')
  expect(typeof leo.list).toBe('function')
  expect(typeof leo.default).toBe('function')
})
