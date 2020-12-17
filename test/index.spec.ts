import * as lcz from '../src'

test('unit', async () => {
  expect(typeof lcz.inject).toBe('function')
  expect(typeof lcz.file).toBe('object')
  expect(typeof lcz.http).toBe('object')
  expect(typeof lcz.config).toBe('object')
  expect(typeof lcz.Ware).toBe('function')
  expect(typeof lcz.list).toBe('function')
  expect(typeof lcz.default).toBe('function')
})
