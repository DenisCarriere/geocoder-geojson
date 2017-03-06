const helpers = require('@turf/helpers')
const confidenceScore = require('../utils').confidenceScore

const Options = {
  maxResults: 5
}

function parseBBox(result) {
  const [south, west, north, east] = result.bbox
  return [west, south, east, north]
}

function parsePoint(result) {
  const [lat, lng] = result.point.coordinates
  return helpers.point([lng, lat])
}

/**
 * Convert Bing results into GeoJSON
 */
function toGeoJSON(json, options = Options) {
  const collection = helpers.featureCollection([])
  json.resourceSets[0].resources.map(result => {
    // Point GeoJSON
    const point = parsePoint(result)
    const bbox = parseBBox(result)
    let confidence = confidenceScore(bbox)
    const properties = {
      confidence,
      authenticationResultCode: json.authenticationResultCode,
      brandLogoUri: json.brandLogoUri,
      copyright: json.copyright,
      entityType: result.entityType,
      matchCodes: result.matchCodes,
      name: result.name,
      statusCode: json.statusCode,
      statusDescription: json.statusDescription,
      traceId: json.traceId,
    }
    Object.keys(result.address).forEach(key => properties[key] = result.address[key])

    // Store Point to GeoJSON feature collection
    if (point) {
      point.bbox = bbox
      point.properties = properties
      collection.features.push(point)
    }
  })
  return collection
}

module.exports.Options = Options
module.exports.toGeoJSON = toGeoJSON