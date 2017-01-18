import * as mapbox from './mapbox'

test('mapbox.toGeoJSON', () => {
  const geojson = mapbox.toGeoJSON(require('./fixtures/in'))
  expect(geojson).toEqual(require('./fixtures/out'))
})

// test('mapbox options.country=UK', () => {
//   geocoder.mapbox(LOCATION, {country: 'CA'})
//     .then(g => expect(g.features.length > 0).toBe(true))
// })

// test('mapboxReverse', () => {
//   geocoder.mapboxReverse(LNGLAT)
//     .then(g => expect(g.features.length > 0).toBe(true))
// })
