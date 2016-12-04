import * as google from './index'

test('google.toGeoJSON', () => {
  const geojson = google.toGeoJSON(require('./fixtures/in'))
  expect(geojson).toEqual(require('./fixtures/out'))
})

test('google.toGeoJSON short=true', () => {
  const geojson = google.toGeoJSON(require('./fixtures/in'), {short: true})
  expect(geojson).toEqual(require('./fixtures/out.short=true'))
})

test('googleReverse.toGeoJSON', () => {
  const geojson = google.toGeoJSON(require('./fixtures/in.reverse'))
  expect(geojson).toEqual(require('./fixtures/out.reverse'))
})
