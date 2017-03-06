const utils = require('.')

test('confidenceScore', () => {
  expect(utils.confidenceScore([-78, 43, -75, 45])).toBe(1)
  expect(utils.confidenceScore([-75.001, 45.001, -75, 45])).toBe(10)
  expect(utils.confidenceScore(undefined)).toBe(0)
})

test('validateLngLat', () => {
  expect(() => utils.validateLngLat([-120, 220])).toThrow()
  expect(() => utils.validateLngLat([120, 220])).toThrow()
  expect(() => utils.validateLngLat([-220, 45])).toThrow()
  expect(() => utils.validateLngLat([220, 45])).toThrow()
  expect(utils.validateLngLat([110, 90])).toEqual([110, 90])
  expect(utils.validateLngLat('[110, 90]')).toEqual([110, 90])
})
