const helpers = require('@turf/helpers')
const iso3166 = require('../utils/ISO_3166-1_alpha-2')

const Options = {
  limit: 10
}

/**
 * Convert Opencage results into GeoJSON
 */
function toGeoJSON(json, options = Options) {
  const collection = helpers.featureCollection([])
  collection.features = json.features.map(result => {
    return result
  })
  return collection
}

module.exports.Options = Options
module.exports.toGeoJSON = toGeoJSON
