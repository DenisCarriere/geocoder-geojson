import * as rp from 'request-promise'
import { verifyKey, LngLat } from './providers/utils'
import { GoogleToGeoJSON, GoogleOptions } from './providers/google'
import { BingToGeoJSON, BingOptions } from './providers/bing'
import { MapboxToGeoJSON, MapboxOptions } from './providers/mapbox'

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
export async function mapbox(address: string, options?: MapboxOptions): Promise<GeoJSON.FeatureCollection<GeoJSON.Point>> {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${ address }.json`
  const params = {
    access_token: options.access_token,
  }
  return rp.get(url, {qs: params})
    .then(data => JSON.parse(data))
    .then(json => MapboxToGeoJSON(json, options))
}

/**
 * Mapbox Provider (Reverse)
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
export async function mapboxReverse(lnglat: LngLat, options?: MapboxOptions): Promise<GeoJSON.FeatureCollection<GeoJSON.Point>> {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${ lnglat.join(',') }.json`
  const params = {
    access_token: verifyKey(options.access_token, 'MAPBOX_ACCESS_TOKEN'),
  }
  return rp.get(url, { qs: params })
    .then(data => JSON.parse(data))
    .then(json => MapboxToGeoJSON(json, options))
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
export async function google(address: string, options?: GoogleOptions): Promise<GeoJSON.FeatureCollection<GeoJSON.Point>> {
  const url = 'https://maps.googleapis.com/maps/api/geocode/json'
  const params = {
    address,
    sensor: (options.sensor) ? options.sensor : false,
  }
  return rp.get(url, { qs: params })
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
export async function googleReverse(lnglat: LngLat, options?: GoogleOptions): Promise<GeoJSON.FeatureCollection<GeoJSON.Point>> {
  const [lng, lat] = lnglat
  const url = 'https://maps.googleapis.com/maps/api/geocode/json'
  const params = {
    address: [lat, lng].join(','),
    sensor: (options.sensor) ? options.sensor : false,
  }
  return rp.get(url, { qs: params })
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
 * geocoder.bing('Ottawa, ON')
 *   .then(results => results.features)
 */
export async function bing(address: string, options?: BingOptions): Promise<GeoJSON.FeatureCollection<GeoJSON.Point>> {
  const url = 'http://dev.virtualearth.net/REST/v1/Locations'
  const params = {
    inclnb: 1,
    key: verifyKey(options.key, 'BING_API_KEY'),
    o: 'json',
    q: address,
  }
  return rp.get(url, { qs: params })
    .then(data => JSON.parse(data))
    .then(json => BingToGeoJSON(json, options))
}

bing('Ottawa ON').then(data => console.log(data), error => console.log(error))
