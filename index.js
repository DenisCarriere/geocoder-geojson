const axios = require('axios')
const utils = require('./utils')
const iso3166 = require('./utils/ISO_3166-1_alpha-2')
const providers = require('./providers')
const Google = providers.Google
const Bing = providers.Bing
const Wikidata = providers.Wikidata
const Mapbox = providers.Mapbox

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
function mapbox(address, options = Mapbox.Options) {
  // Define options
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
module.exports.mapbox = mapbox

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
function mapboxReverse(lnglat, options = Mapbox.Options) {
  // Define options
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
module.exports.mapboxReverse = mapboxReverse

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
function google(address, options = Google.Options) {
  // Define Options
  const language = options.language || Google.Options.language
  const sensor = options.sensor || Google.Options.sensor
  options.short = options.short || Google.Options.short

  // URL Parameters
  const params = {
    address,
    language,
    sensor,
  }

  // Add the api key to if specified
  if (options.key) {
    params.key = options.key
  }

  // Request
  const url = 'https://maps.googleapis.com/maps/api/geocode/json'
  return request(url, Google.toGeoJSON, params, options)
}
module.exports.google = google

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
function googleReverse(lnglat, options = Google.Options) {
  // Define Options
  options.language = options.language || Google.Options.language
  options.sensor = options.sensor || Google.Options.sensor
  options.short = options.short || Google.Options.short
  const [lng, lat] = utils.validateLngLat(lnglat)

  // URL Parameters
  const params = {
    address: [lat, lng].join(','),
    sensor: options.sensor,
  }
  
  // Add the api key to if specified
  if (options.key) {
    params.key = options.key
  }

  // Request
  const url = 'https://maps.googleapis.com/maps/api/geocode/json'
  return request(url, Google.toGeoJSON, params, options)
}
module.exports.googleReverse = googleReverse

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
function bing(address, options = Bing.Options) {
  // Define Options
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
module.exports.bing = bing

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
function wikidata(address, options = Wikidata.Options) {
  // Define Options
  options.subclasses = options.subclasses || Wikidata.Options.subclasses
  options.languages = options.languages || Wikidata.Options.languages
  options.radius = options.radius || Wikidata.Options.radius
  options.sparql = options.sparql || Wikidata.Options.sparql

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
module.exports.wikidata = wikidata

/**
 * Generic GET function to normalize all of the requests
 *
 * @param {string} url URL
 * @param {function} geojsonParser Customized function to generate a GeoJSON Point FeatureCollection
 * @param {Object} params Query String
 * @param {Object} options Options used for HTTP request & GeoJSON Parser function
 * @returns {Promise<Points>} Results in GeoJSON FeatureCollection Points
 */
function request(url, geojsonParser, params = {}, options = utils.Options) {
  // Create custom Axios instance
  const instance = axios.create({})

  // Remove any existing default Authorization headers
  if (instance.defaults.headers.common && instance.defaults.headers.common.Authorization) { delete instance.defaults.headers.common.Authorization }
  if (instance.defaults.headers.Authorization) { delete instance.defaults.headers.Authorization }

  // Handle request
  return new Promise((resolve, reject) => {
    instance.get(url, {params}).then(response => {
      if (options.raw !== undefined) { return resolve(response.data) }
      const geojson = geojsonParser(response.data, options)
      return resolve(geojson)
    })
  })
}
module.exports.request = request

function get(provider, query, options) {
  if (provider === 'bing') { return bing(query, options) }
  if (provider === 'google') { return google(query, options) }
  if (provider === 'mapbox') { return mapbox(query, options) }
  if (provider === 'wikidata') { return wikidata(query, options) }
  if (provider === 'googleReverse') { return googleReverse(query, options) }
  if (provider === 'mapboxReverse') { return mapboxReverse(query, options) }
}
module.exports.get = get