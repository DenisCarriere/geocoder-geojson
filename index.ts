import * as path from 'path'
import * as turf from '@turf/turf'
import { keys } from 'lodash'
import * as rp from 'request-promise'
import { GoogleResults, GoogleToGeoJSON } from './providers/google'

/**
 * BBox extent in [minX, minY, maxX, maxY] order
 * @private
 */
export type BBox = [number, number, number, number]

/**
 * Google Provider
 *
 * @param {string} address Location for your search
 * @param {boolean} [short=true] Google address components have long or short results
 * @returns {GoogleResults} JSON Object
 * @example
 * geocoder.google('Ottawa')
 *   .then(data => data.results)
 */
export async function google(address: string, short?: boolean): Promise<GeoJSON.FeatureCollection<GeoJSON.Point>> {
  const url = 'https://maps.googleapis.com/maps/api/geocode/json'
  const params = {
    address,
  }
  const data = await rp.get(url, {qs: params})
  const json: GoogleResults = await JSON.parse(data)
  return GoogleToGeoJSON(json, short)
}

/**
 * Score (2 worst to 10 best) Distance (kilometers)
 * @private
 */
const scoreMatrix: Array<[number, number]> = [
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
export function confidenceScore(bbox: BBox): number {
  if (!bbox) { return 0 }
  let result = 0
  const poly = turf.bboxPolygon(bbox)
  const sw = turf.point(poly.geometry.coordinates[0][0])
  const ne = turf.point(poly.geometry.coordinates[0][2])
  const distance = turf.distance(sw, ne, 'kilometers')
  scoreMatrix.map(step => {
    const [score, maximum] = step
    if (distance < maximum) { result = score }
    if (distance >= 25) { result = 1 }
  })
  return result
}

/**
 * Street Suffix
 * @private
 */
const suffix: Suffix = require(path.join(__dirname, 'utils', 'suffix.json'))
interface Suffix { [key: string]: string }

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
export function replaceStreetSuffix(name: string): string {
  if (name) {
    keys(suffix).map(key => {
      const pattern = new RegExp(`${ key }[\.]?$`, 'i')
      name = name.replace(pattern, suffix[key])
    })
  }
  return name
}

export default {
  google,
  confidenceScore,
  replaceStreetSuffix,
}
