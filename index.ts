import * as path from 'path'
import * as turf from '@turf/turf'
import { keys, assign } from 'lodash'
import * as rp from 'request-promise'
import { GoogleToGeoJSON, GoogleDefaultOptions } from './providers/google'
import { BingToGeoJSON, BingDefaultOptions } from './providers/bing'

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
export interface OSM {
  'addr:housenumber'?: string
  'addr:street'?: string
  'addr:postcode'?: string
}

/**
 * Google Provider
 *
 * @param {string} address Location for your search
 * @param {Object} options Google specific options
 * @param {string} [options.language=en] The language in which to return results.
 * @param {boolean} [options.short=false] Google address components have long or short results
 * @returns {GeoJSON<Point>} GeoJSON Feature Collection
 * @example
 * geocoder.google('Ottawa')
 *   .then(results => results.features)
 */
export async function google(address: string, options = GoogleDefaultOptions): Promise<GeoJSON.FeatureCollection<GeoJSON.Point>> {
  const url = 'https://maps.googleapis.com/maps/api/geocode/json'
  const params = {
    address,
    sensor: (options.sensor) ? options.sensor : false,
  }
  assign(params, options)
  return rp.get(url, {qs: params})
    .then(data => JSON.parse(data))
    .then(json => GoogleToGeoJSON(json, options))
}

/**
 * Google Provider (Reverse)
 *
 * @param {string} address Location for your search
 * @param {Object} options Google specific options
 * @param {string} [options.language=en] The language in which to return results.
 * @param {boolean} [options.short=false] Google address components have long or short results
 * @returns {GeoJSON<Point>} GeoJSON Feature Collection
 * @example
 * geocoder.googleReverse([-75.1, 45.1])
 *   .then(results => results.features)
 */
export async function googleReverse(lnglat: LngLat, options = GoogleDefaultOptions): Promise<GeoJSON.FeatureCollection<GeoJSON.Point>> {
  const [lng, lat] = lnglat
  const url = 'https://maps.googleapis.com/maps/api/geocode/json'
  const params = {
    address: [lat, lng].join(','),
    sensor: (options.sensor) ? options.sensor : false,
  }
  assign(params, options)
  return rp.get(url, {qs: params})
    .then(data => JSON.parse(data))
    .then(json => GoogleToGeoJSON(json, options))
}

/**
 * Bing Provider
 *
 * @param {string} address Location for your search
 * @param {Object} options Bing specific options
 * @returns {GeoJSON<Point>} GeoJSON Feature Collection
 * @example
 * geocoder.bing('Ottawa')
 *   .then(results => results.features)
 */
export async function bing(address: string, options = BingDefaultOptions): Promise<GeoJSON.FeatureCollection<GeoJSON.Point>> {
  const url = 'http://dev.virtualearth.net/REST/v1/Locations'
  const params = {
    inclnb: 1,
    key: verifyKey(options, 'BING_API_KEY'),
    o: 'json',
    q: address,
  }
  assign(params, options)
  return rp.get(url, {qs: params})
    .then(data => JSON.parse(data))
    .then(json => BingToGeoJSON(json, options))
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

/**
 * Verify if Key exists in Options or Environment Variable
 *
 * @private
 * @param {Object} options Options with key
 * @param {string} env Environment variable
 * @returns {string} key
 * @example
 * const key = verifyKey(options, 'BING_API_KEY')
 * //=key
 */
function verifyKey(options: {key?: string}, env: string) {
  const key = (options.key) ? options.key : process.env[env]
  if (!key) { throw new Error('[options.key] is required') }
  return key
}

bing('Ottawa, ON')
  .then(results => console.log(results.features[0]))
