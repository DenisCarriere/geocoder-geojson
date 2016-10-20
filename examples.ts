import * as geocoder from './index'

geocoder.bing('Ottawa, ON')
  .then(data => console.log('Bing', data.features[0]), error => console.log('Bing ERROR', error.message))

geocoder.google('Ottawa, ON')
  .then(data => console.log('Google', data.features[0]), error => console.log('Google ERROR', error.message))

geocoder.mapbox('Ottawa, ON')
  .then(data => console.log('Mapbox', data.features[0]), error => console.log('Mapbox ERROR', error.message))
