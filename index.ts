import * as providers from './providers'
import * as utils from './utils'

/**
 * Google Provider
 *
 * @param {string} address Location for your search
 * @returns {GoogleResults} JSON Object
 * @example
 * geocoder.google('Ottawa')
 *   .then(data => data.results)
 */
export const google = providers.google

/**
 * Replaces Street Suffix with a complete word
 *
 * @param {string} name street name
 * @returns {string} name replace street suffix
 * @example
 * replaceStreetSuffix('Foo Bar St')
 * //='Foo Bar Street'
 * replaceStreetSuffix('Foo Bar Dr.')
 * //='Foo Bar Drive'
 */
export const replaceStreetSuffix = utils.replaceStreetSuffix

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
export const confidenceScore = utils.confidenceScore

/**
 * Geocoder GeoJSON
 */
export default {
  google,
  replaceStreetSuffix,
  confidenceScore,
}
