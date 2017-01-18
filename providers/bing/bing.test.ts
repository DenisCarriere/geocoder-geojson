import * as bing from './bing'

test('bing.toGeoJSON', () => {
  const geojson = bing.toGeoJSON(require('./fixtures/in'))
  expect(geojson).toEqual(require('./fixtures/out'))
})
