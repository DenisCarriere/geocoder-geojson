import * as geocoder from './'
import axios from 'axios'

describe('Geocode', () => {
  test('axios.defaults.headers.Authorization ', async () => {
    axios.defaults.headers.Authorization = 'foo/bar'
    const geojson = await geocoder.google('Ottawa, ON')
    expect(geojson).toBeDefined()
  })
})
