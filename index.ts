import * as rp from 'request-promise'
import { BingToGeoJSON, BingOptions } from './providers/bing'
import { GoogleToGeoJSON, GoogleOptions } from './providers/google'
import { MapboxToGeoJSON, MapboxOptions } from './providers/mapbox'
import { verifyKey, LngLat, validateLngLat } from './utils'

/**
 * Mapbox Provider
 *
 * @param {string} address Location for your search
 * @param {Object} options Mapbox specific options
 * @param {string} options.access_token Mapbox developer access token
 * @param {boolean} [options.short=false] Mapbox address components have long or short results
 * @returns {GeoJSON<Point>} GeoJSON Feature Collection
 * @example
 * geocoder.mapbox('Ottawa, ON')
 *   .then(results => results.features)
 */
export async function mapbox(address: string, options = MapboxOptions): Promise<GeoJSON.FeatureCollection<GeoJSON.Point>> {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${ address }.json`
  const params = {
    access_token: verifyKey(options.access_token, 'MAPBOX_ACCESS_TOKEN'),
  }
  return get(url, params, MapboxToGeoJSON, options)
}

/**
 * Mapbox Provider (Reverse)
 *
 * @param {LngLat} address Location for your search
 * @param {Object} options Mapbox specific options
 * @param {string} options.access_token Mapbox developer access token
 * @param {boolean} [options.short=false] Mapbox address components have long or short results
 * @returns {GeoJSON<Point>} GeoJSON Feature Collection
 * @example
 * geocoder.mapbox('Ottawa, ON')
 *   .then(results => results.features)
 */
export async function mapboxReverse(lnglat: LngLat, options = MapboxOptions): Promise<GeoJSON.FeatureCollection<GeoJSON.Point>> {
  lnglat = validateLngLat(lnglat)
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${ lnglat.join(',') }.json`
  const params = {
    access_token: verifyKey(options.access_token, 'MAPBOX_ACCESS_TOKEN'),
  }
  return get(url, params, MapboxToGeoJSON, options)
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
 * geocoder.google('Ottawa, ON')
 *   .then(results => results.features)
 */
export async function google(address: string, options: GoogleOptions = GoogleOptions): Promise<GeoJSON.FeatureCollection<GeoJSON.Point>> {
  const url = 'https://maps.googleapis.com/maps/api/geocode/json'
  const params = {
    address,
    sensor: options.sensor,
  }
  return get(url, params, GoogleToGeoJSON, options)
}

/**
 * Google Provider (Reverse)
 *
 * @param {LngLat} address Location for your search
 * @param {Object} options Google specific options
 * @param {string} [options.language=en] The language in which to return results.
 * @param {boolean} [options.short=false] Google address components have long or short results
 * @returns {GeoJSON<Point>} GeoJSON Feature Collection
 * @example
 * geocoder.googleReverse([-75.1, 45.1])
 *   .then(results => results.features)
 */
export async function googleReverse(lnglat: LngLat, options: GoogleOptions = GoogleOptions): Promise<GeoJSON.FeatureCollection<GeoJSON.Point>> {
  const [lng, lat] = validateLngLat(lnglat)
  const url = 'https://maps.googleapis.com/maps/api/geocode/json'
  const params = {
    address: [lat, lng].join(','),
    sensor: options.sensor,
  }
  return get(url, params, GoogleToGeoJSON, options)
}

/**
 * Bing Provider
 *
 * @param {string} address Location for your search
 * @param {Object} options Bing specific options
 * @returns {GeoJSON<Point>} GeoJSON Feature Collection
 * @example
 * geocoder.bing('Ottawa, ON')
 *   .then(results => results.features)
 */
export async function bing(address: string, options: BingOptions = BingOptions): Promise<GeoJSON.FeatureCollection<GeoJSON.Point>> {
  const url = 'http://dev.virtualearth.net/REST/v1/Locations'
  const params = {
    inclnb: 1,
    key: verifyKey(options.key, 'BING_API_KEY'),
    o: 'json',
    q: address,
  }
  return get(url, params, BingToGeoJSON, options)
}

/**
 * Generic GET function for all geocoding providers
 *
 * @param {string} url URL
 * @param {Object} params Query String
 * @param {function} geojsonParser Customized function to generate a GeoJSON Point FeatureCollection
 * @param {Object} options Options used for both request & geojsonParser
 * @returns {Promise<GeoJSON.FeatureCollection<GeoJSON.Point>>} GeoJSON Results
 */
async function get(url: string, params: any, geojsonParser: any, options: any): Promise<GeoJSON.FeatureCollection<GeoJSON.Point>> {
  const response = await rp.get(url, Object.assign({ qs: params }, options))
  const json = await JSON.parse(response)
  const geojson: GeoJSON.FeatureCollection<GeoJSON.Point> = geojsonParser(json, options)
  return geojson
}
