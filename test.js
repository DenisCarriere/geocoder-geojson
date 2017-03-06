const geocoder = require('.')
const axios = require('axios')

describe('google', () => {
  test('axios.defaults.headers.Authorization ', () => {
    axios.defaults.headers.Authorization = 'foo/bar'
    geocoder.google('Ottawa, ON').then(geojson => {
      expect(geojson).toBeDefined()
    })
  })
  test('french', () => {
    geocoder.google('Quebec, Quebec', { language: 'fr' }).then(geojson => {
      expect(geojson.features[0].properties.formatted_address).toBe('Ville de Québec, QC, Canada')
    })
  })
  test('english', () => {
    geocoder.google('Quebec, Quebec', { language: 'en' }).then(geojson => {
      expect(geojson.features[0].properties.formatted_address).toBe('Québec City, QC, Canada')
    })
  })
})
