import * as geocoder from './'
import axios from 'axios'

describe('google', () => {
  test('axios.defaults.headers.Authorization ', async () => {
    axios.defaults.headers.Authorization = 'foo/bar'
    const geojson = await geocoder.google('Ottawa, ON')
    expect(geojson).toBeDefined()
  })
  test('french', async () => {
    const geojson = await geocoder.google('Quebec, Quebec', { language: 'fr' })
    expect(geojson.features[0].properties.formatted_address).toBe('Ville de Québec, QC, Canada')
  })
  test('english', async () => {
    const geojson = await geocoder.google('Quebec, Quebec', { language: 'en' })
    expect(geojson.features[0].properties.formatted_address).toBe('Québec City, QC, Canada')
  })
})
