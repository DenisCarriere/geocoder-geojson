import * as colors from 'colors'
import { point } from '@turf/helpers'
import * as bboxPolygon from '@turf/bbox-polygon'
import * as distance from '@turf/distance'

/**
 * Options for all providers
 */
export interface Options {
  nearest?: LngLat
  distance?: number
  in?: Array<string>
}

/**
 * Feature Collection of Points
 */
export type Points = GeoJSON.FeatureCollection<GeoJSON.Point>

/**
 * BBox extent in [minX, minY, maxX, maxY] order
 */
export type BBox = [number, number, number, number]

/**
 * Longitude & Latitude [x, y]
 */
export type LngLat = [number, number]

/**
 * OpenStreetMap
 */
export interface OpenStreetMap {
  'addr:housenumber'?: string
  'addr:street'?: string
  'addr:city'?: string
  'addr:postcode'?: string
}

/**
 * Pretty Error message
 */
export function error (message: string) {
  console.log(colors.bgRed(`[Error] ${ message }`))
  process.exit(1)
}

/**
 * Score (2 worst to 10 best) Distance (kilometers)
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
  const poly = bboxPolygon(bbox)
  const sw = point(poly.geometry.coordinates[0][0])
  const ne = point(poly.geometry.coordinates[0][2])
  const d = distance(sw, ne, 'kilometers')
  scoreMatrix.map(step => {
    const [score, maximum] = step
    if (d < maximum) { result = score }
    if (d >= 25) { result = 1 }
  })
  return result
}

// /**
//  * Street Suffix
//  */
// const suffix: Suffix = require(path.join(__dirname, 'suffix.json'))
// interface Suffix { [key: string]: string }

// /**
//  * Replaces Street Suffix with a complete word
//  *
//  * @param {string} name street name
//  * @returns {string} name replace street suffix
//  * @example
//  * replaceStreetSuffix('Foo Bar St')
//  * //='Foo Bar Street'
//  * replaceStreetSuffix('Foo Bar Dr.')
//  * //='Foo Bar Drive'
//  */
// export function replaceStreetSuffix(name: string): string {
//   if (name) {
//     Object.keys(suffix).map(key => {
//       const pattern = new RegExp(`${ key }[\.]?$`, 'i')
//       name = name.replace(pattern, suffix[key])
//     })
//   }
//   return name
// }

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
export function validateLngLat(lnglat: LngLat): LngLat {
  const [lng, lat] = lnglat
  if (lat < -90 || lat > 90) {
    const message = 'LngLat [lat] must be within -90 to 90 degrees'
    throw new Error(message)
  } else if (lng < -180 || lng > 180) {
    const message = 'LngLat [lng] must be within -180 to 180 degrees'
    throw new Error(message)
  }
  return [lng, lat]
}
