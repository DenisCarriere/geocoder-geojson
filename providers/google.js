const helpers = require('@turf/helpers')
const confidenceScore = require('../utils').confidenceScore

const Options = {
  language: 'en',
  sensor: false,
  short: false,
}

/**
 * Parses Address Component into a single layer Object
 */
function parseAddressComponents(components, short = Options.short) {
  const results = {}
  components.map(component => {
    if (short) { results[component.types[0]] = component.short_name
    } else { results[component.types[0]] = component.long_name }
  })
  return results
}

/**
 * Converts GoogleResult Bounds to BBox
 */
function parseBBox(result) {
  if (result.geometry) {
    if (result.geometry.viewport) {
      const viewport = result.geometry.viewport
      return [viewport.southwest.lng, viewport.southwest.lat, viewport.northeast.lng, viewport.northeast.lat]
    }
  }
}

/**
 * Converts GoogleResult to GeoJSON Point
 */
function parsePoint(result) {
  if (result.geometry) {
    if (result.geometry.location) {
      const {lng, lat} = result.geometry.location
      return helpers.point([lng, lat])
    }
  }
}

/**
 * Convert Google results into GeoJSON
 */
function toGeoJSON(json, options = Options) {
  const short = options.short || Options.short
  const collection = helpers.featureCollection([])
  json.results.map(result => {
    // Get Geometries
    const point = parsePoint(result)
    const bbox = parseBBox(result)

    // Calculate Confidence score
    const location_type = result.geometry.location_type
    let confidence = confidenceScore(bbox)
    if (location_type === 'ROOFTOP') { confidence = 10 }

    // GeoJSON Point properties
    const properties = {
      confidence,
      location_type,
      formatted_address: result.formatted_address,
      place_id: result.place_id,
      types: result.types,
    }

    // Google Specific Properties
    const components = parseAddressComponents(result.address_components, short)
    Object.keys(components).forEach(key => properties[key] = components[key])

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