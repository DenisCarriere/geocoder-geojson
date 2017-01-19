import axios from 'axios'
import * as utils from './utils'
import { LngLat, error, GeoJSONParser } from './utils'
import * as iso3166 from './utils/ISO_3166-1_alpha-2'
import {
  Bing,
  Google,
  Mapbox,
  Wikidata } from './providers'

export type Providers = 'bing' | 'google' | 'mapbox' | 'mapboxReverse' | 'wikidata' | 'googleReverse' | 'mapboxReverse'
export type Points = GeoJSON.FeatureCollection<GeoJSON.Point>

/**
 * Mapbox Provider
 *
 * https://www.mapbox.com/api-documentation/#geocoding
 *
 * @param {string} address Location for your search
 * @param {MapboxOptions} [options] Mapbox Options
 * @param {string} [options.access_token] Access token or environment variable `MAPBOX_ACCESS_TOKEN`
 * @param {string} [options.mode='mapbox.places'] Mode mapbox.places or mapbox.places-permanent
 * @param {string} [options.country] ISO 3166 alpha 2 country codes, separated by commas
 * @param {LngLat} [options.proximity] Location around which to bias results, given as longitude,latitude
 * @param {Array<string>} [options.types] Filter results by one or more type.
 * @param {boolean} [options.autocomplete=true] Whether or not to return autocomplete results.
 * @param {BBox} [options.bbox] Bounding box within which to limit results, given as minX,minY,maxX,maxY
 * @param {number} [options.limit=5] Limit the number of results returned.
 * @returns {Promise<Points>} GeoJSON Point FeatureCollection
 * @example
 * const geojson = await geocoder.mapbox('Ottawa, ON')
 */
export async function mapbox(address: string, options?: Mapbox.Options): Promise<Points> {
  // Define Options
  options = Object.assign(options, Mapbox.Options)

  const mode = options.mode || Mapbox.Options.mode
  const access_token = options.access_token || options.key || process.env.MAPBOX_ACCESS_TOKEN
  const country = options.country
  const limit = options.limit || Mapbox.Options.limit

  // Validation
  if (!access_token) { error('[options.access_token] is required') }
  if (['mapbox.places', 'mapbox.places-permanent'].indexOf(mode) === -1) { error('--mode is invalid') }
  if (country && iso3166.codes[country] === undefined) { error('--country is invalid') }

  // URL Parameters
  const params = {
    access_token,
    country,
    limit,
  }

  // Request
  const url = `https://api.mapbox.com/geocoding/v5/${mode}/${address}.json`
  return request(url, Mapbox.toGeoJSON, params, options)
}

/**
 * Mapbox Provider (Reverse)
 *
 * https://www.mapbox.com/api-documentation/#geocoding
 *
 * @param {LngLat} lnglat Longitude & Latitude [x, y]
 * @param {MapboxOptions} [options] Mapbox Options
 * @param {string} [options.access_token] Access token or environment variable `MAPBOX_ACCESS_TOKEN`
 * @param {string} [options.mode='mapbox.places'] Mode mapbox.places or mapbox.places-permanent
 * @param {string} [options.country] ISO 3166 alpha 2 country codes, separated by commas
 * @param {LngLat} [options.proximity] Location around which to bias results, given as longitude,latitude
 * @param {Array<string>} [options.types] Filter results by one or more type.
 * @param {boolean} [options.autocomplete=true] Whether or not to return autocomplete results.
 * @param {BBox} [options.bbox] Bounding box within which to limit results, given as minX,minY,maxX,maxY
 * @param {number} [options.limit=1] Limit the number of results returned.
 * @returns {Promise<Points>} GeoJSON Point FeatureCollection
 * @example
 * const geojson = await geocoder.mapbox('Ottawa, ON')
 */
export async function mapboxReverse(lnglat: string | LngLat, options?: Mapbox.Options): Promise<Points> {
  // Define Options
  options = Object.assign(options, Mapbox.Options)

  const mode = options.mode || Mapbox.Options.mode
  const access_token = options.access_token || options.key || process.env.MAPBOX_ACCESS_TOKEN
  const country = options.country
  const limit = options.limit || Mapbox.Options.limit

  // Validation
  if (['mapbox.places', 'mapbox.places-permanent'].indexOf(mode) > 0) { error('--mode is invalid') }
  lnglat = utils.validateLngLat(lnglat)
  if (!access_token) { error('--access_token is required') }

  // URL Parameters
  const params = {
    access_token,
    country,
    limit,
  }

  // Request
  const url = `https://api.mapbox.com/geocoding/v5/${mode}/${lnglat.join(',')}.json`
  return request(url, Mapbox.toGeoJSON, params, options)
}

/**
 * Google Provider
 *
 * https://developers.google.com/maps/documentation/geocoding
 *
 * @param {string} address Location for your search
 * @param {GoogleOptions} [options] Google Options
 * @param {string} [options.language=en] The language in which to return results
 * @param {boolean} [options.short=false] Address components have long or short results
 * @returns {Promise<Points>} GeoJSON Point FeatureCollection
 * @example
 * const geojson = await geocoder.google('Ottawa, ON')
 */
export async function google(address: string, options?: Google.Options): Promise<Points> {
  // Define Options
  options = Object.assign(options, Google.Options)

  // URL Parameters
  const params = {
    address,
    sensor: options.sensor,
  }

  // Request
  const url = 'https://maps.googleapis.com/maps/api/geocode/json'
  return request(url, Google.toGeoJSON, params, options)
}

/**
 * Google Provider (Reverse)
 *
 * https://developers.google.com/maps/documentation/geocoding
 *
 * @param {LngLat} lnglat Longitude & Latitude [x, y]
 * @param {GoogleOptions} [options] Google Options
 * @param {string} [options.language=en] The language in which to return results
 * @param {boolean} [options.short=false] Address components have long or short results
 * @returns {Promise<Points>} GeoJSON Point FeatureCollection
 * @example
 * const geojson = await geocoder.googleReverse([-75.1, 45.1])
 */
export async function googleReverse(lnglat: string | LngLat, options?: Google.Options): Promise<Points> {
  // Define Options
  options = Object.assign(options, Google.Options)

  // Options
  const [lng, lat] = utils.validateLngLat(lnglat)
  const sensor = options.sensor || Google.Options.sensor

  // URL Parameters
  const params = {
    sensor,
    address: [lat, lng].join(','),
  }

  // Request
  const url = 'https://maps.googleapis.com/maps/api/geocode/json'
  return request(url, Google.toGeoJSON, params, options)
}

/**
 * Bing Provider
 *
 * https://msdn.microsoft.com/en-us/library/ff701714.aspx
 *
 * @param {string} address Location for your search
 * @param {BingOptions} [options] Bing Options
 * @param {string} [options.key] API key or environment variable `BING_API_KEY`
 * @param {string} [options.maxResults] Specifies the maximum number of locations to return in the response.
 * @returns {Promise<Points>} GeoJSON Point FeatureCollection
 * @example
 * const geojson = await geocoder.bing('Ottawa, ON')
 */
export async function bing(address: string, options?: Bing.Options): Promise<Points> {
  // Define Options
  options = Object.assign(options, Bing.Options)
  const key = options.key || process.env.BING_API_KEY
  const maxResults = options.maxResults || options.limit || Bing.Options.maxResults

  // Validation
  if (!key) { error('--key is required') }

  // URL Parameters
  const params = {
    inclnb: 1,
    key,
    o: 'json',
    q: address,
    maxResults,
  }

  // Request
  const url = 'http://dev.virtualearth.net/REST/v1/Locations'
  return request(url, Bing.toGeoJSON, params, options)
}

/**
 * Wikidata Provider
 *
 * https://query.wikidata.org/
 *
 * @param {string} address Location for your search
 * @param {Options} [options] Wikidata Options
 * @param {LngLat} [options.nearest] Nearest location from a given LngLat
 * @param {number} [options.radius] Maximum radius from nearest LngLat
 * @param {Array<string>} [options.languages] Exact match on a list of languages
 * @param {Array<string>} [options.subclasses] Filter results by Wikidata subclasses
 * @returns {Promise<Points>} GeoJSON Point FeatureCollection
 * @example
 * const geojson = await geocoder.wikidata('Ottawa')
 */
export async function wikidata(address: string, options?: Wikidata.Options): Promise<Points> {
  // Define Options
  options = Object.assign(options, Wikidata.Options)

  // Validation
  if (!options.nearest) { error('--nearest is required') }

  // SPARQL Query
  const query = Wikidata.createQuery(address, options)

  // URL Parameters
  const params = {
    query,
  }

  // Request
  const url = 'https://query.wikidata.org/bigdata/namespace/wdq/sparql'
  return request(url, Wikidata.toGeoJSON, params, options)
}

/**
 * Generic GET function to normalize all of the requests
 *
 * @param {string} url URL
 * @param {function} geojsonParser Customized function to generate a GeoJSON Point FeatureCollection
 * @param {Object} params Query String
 * @param {Object} options Options used for HTTP request & GeoJSON Parser function
 * @returns {Promise<Points>} Results in GeoJSON FeatureCollection Points
 */
export async function request(url: string, geojsonParser: GeoJSONParser, params?: {}, options?: utils.Options): Promise<Points> {
  params = params || {}
  const response = await axios.get(url, {params})
  if (options.raw !== undefined) { return response.data }
  const geojson = geojsonParser(response.data, options)
  return geojson
}

export function get(provider: Providers, query: string, options?: any): Promise<Points> {
  if (provider === 'bing') { return bing(query, options) }
  if (provider === 'google') { return google(query, options) }
  if (provider === 'mapbox') { return mapbox(query, options) }
  if (provider === 'wikidata') { return wikidata(query, options) }
  if (provider === 'googleReverse') { return googleReverse(query, options) }
  if (provider === 'mapboxReverse') { return mapboxReverse(query, options) }
}
