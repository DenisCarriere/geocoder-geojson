const helpers = require('@turf/helpers')
const bboxPolygon = require('@turf/bbox-polygon')
const distance = require('@turf/distance')
const chalk = require('chalk')

/**
 * Pretty Error message
 */
function error (message) {
  console.log(chalk.bgRed.white('[Error]' + message))
  throw new Error(message)
}
module.exports.error = error

/**
 * Score (2 worst to 10 best) Distance (kilometers)
 */
const scoreMatrix = [
  [2, 25],
  [3, 20],
  [4, 15],
  [5, 10],
  [6, 7.5],
  [7, 5],
  [8, 1],
  [9, 0.5],
  [10, 0.25],
]

/**
 * Generates a confidence score from 1 (worst) to 10 (best) from a given BBox
 *
 * @param {BBox} bbox extent in [minX, minY, maxX, maxY] order
 * @returns {number} confidence score
 * @example
 * confidenceScore([-75.1, 45.1, -75, 45])
 * //=4
 * confidenceScore([-75.001, 45.001, -75, 45])
 * //=10
 */
function confidenceScore(bbox) {
  if (bbox === undefined) { return 0 }
  let result = 0
  const poly = bboxPolygon(bbox)
  const sw = helpers.point(poly.geometry.coordinates[0][0])
  const ne = helpers.point(poly.geometry.coordinates[0][2])
  const d = distance(sw, ne, 'kilometers')
  scoreMatrix.map(step => {
    const [score, maximum] = step
    if (d < maximum) { result = score }
    if (d >= 25) { result = 1 }
  })
  return result
}
module.exports.confidenceScore = confidenceScore

/**
 * Validates {@link LngLat} coordinates.
 *
 * @param {LngLat} lnglat Longitude (Meridians) & Latitude (Parallels) in decimal degrees
 * @throws {Error} Will throw an error if LngLat is not valid.
 * @returns {LngLat} LngLat coordinates
 * @example
 * mercator.validateLngLat([-115, 44])
 * //= [ -115, 44 ]
 * mercator.validateLngLat([-225, 44])
 * //= Error: LngLat [lng] must be within -180 to 180 degrees
 */
function validateLngLat(lnglat) {
  let lat
  let lng

  if (typeof(lnglat) === 'string') { [lng, lat] = JSON.parse(lnglat)
  } else { [lng, lat] = lnglat }

  if (lat < -90 || lat > 90) {
    const message = 'LngLat [lat] must be within -90 to 90 degrees'
    error(message)
  } else if (lng < -180 || lng > 180) {
    const message = 'LngLat [lng] must be within -180 to 180 degrees'
    error(message)
  }
  return [lng, lat]
}
module.exports.validateLngLat = validateLngLat