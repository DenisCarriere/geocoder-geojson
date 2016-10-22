import * as rp from 'request-promise'
import { BingToGeoJSON, BingOptions } from './providers/bing'
import { GoogleToGeoJSON, GoogleOptions } from './providers/google'
import { MapboxToGeoJSON, MapboxOptions } from './providers/mapbox'
import { verifyKey, LngLat, validateLngLat } from './utils'

/**
 * Mapbox Provider
 *
 * @param {string} address Location for your search
 * @param {MapboxOptions} [options] Mapbox Options
 * @param {string} [options.access_token] Access token or environment variable `MAPBOX_ACCESS_TOKEN`
 * @param {boolean} [options.short=false] Address components have long or short results
 * @returns {GeoJSON<Point>} GeoJSON Feature Collection
 * @example
 * const geojson = await geocoder.mapbox('Ottawa, ON')
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
 * @param {LngLat} lnglat Longitude & Latitude [x, y]
 * @param {MapboxOptions} [options] Mapbox Options
 * @param {string} [options.access_token] Access token or environment variable `MAPBOX_ACCESS_TOKEN`
 * @param {boolean} [options.short=false] Address components have long or short results
 * @returns {GeoJSON<Point>} GeoJSON Feature Collection
 * @example
 * const geojson = await geocoder.mapbox('Ottawa, ON')
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
 * @param {GoogleOptions} [options] Google Options
 * @param {string} [options.language=en] The language in which to return results
 * @param {boolean} [options.short=false] Address components have long or short results
 * @returns {GeoJSON<Point>} GeoJSON Feature Collection
 * @example
 * const geojson = await geocoder.google('Ottawa, ON')
 */
export async function google(address: string, options = GoogleOptions): Promise<GeoJSON.FeatureCollection<GeoJSON.Point>> {
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
 * @param {LngLat} lnglat Longitude & Latitude [x, y]
 * @param {GoogleOptions} [options] Google Options
 * @param {string} [options.language=en] The language in which to return results
 * @param {boolean} [options.short=false] Address components have long or short results
 * @returns {GeoJSON<Point>} GeoJSON Feature Collection
 * @example
 * const geojson = await geocoder.googleReverse([-75.1, 45.1])
 */
export async function googleReverse(lnglat: LngLat, options = GoogleOptions): Promise<GeoJSON.FeatureCollection<GeoJSON.Point>> {
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
 * @param {BingOptions} [options] Bing Options
 * @param {string} [options.key] API key or environment variable `BING_API_KEY`
 * @returns {GeoJSON<Point>} GeoJSON Feature Collection
 * @example
 * const geojson = await geocoder.bing('Ottawa, ON')
 */
export async function bing(address: string, options = BingOptions): Promise<GeoJSON.FeatureCollection<GeoJSON.Point>> {
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
 * Generic GET function to normalize all of the requests
 *
 * @private
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

export default {
  google,
  googleReverse,
  mapbox,
  mapboxReverse,
  bing,
}
