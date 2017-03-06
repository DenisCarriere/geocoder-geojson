const helpers = require('@turf/helpers')
const featureCollection = helpers.featureCollection
const iso3166 = require('../utils/ISO_3166-1_alpha-2')

const Options = {
  mode: 'mapbox.places',
  limit: 5,
}

/**
 * Convert Mapbox results into GeoJSON
 */
function toGeoJSON(json, options = Options) {
  const collection = featureCollection([])
  collection.features = json.features.map(result => {
    return result
  })
  return collection
}

module.exports.Options = Options
module.exports.toGeoJSON = toGeoJSON