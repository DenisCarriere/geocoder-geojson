import * as bing from './'

test('bing.toGeoJSON', () => {
  const geojson = bing.toGeoJSON(require('./fixtures/in'))
  expect(geojson).toEqual(require('./fixtures/out'))
})
