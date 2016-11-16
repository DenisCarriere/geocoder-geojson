/// <reference path="index.d.ts" />
import axios from 'axios'
import * as lodash from 'lodash'
import * as turf from '@turf/helpers'
import * as nearest from '@turf/nearest'
import * as distance from '@turf/distance'
import * as wdk from 'wikidata-sdk'
import * as Bing from './providers/bing'
import * as Google from './providers/google'
import * as Mapbox from './providers/mapbox'
import * as Wikidata from './providers/wikidata'
import * as utils from './utils'
import { LngLat, Points, error } from './utils'

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
export async function mapbox(address: string, options = Mapbox.Options): Promise<GeoJSON.FeatureCollection<GeoJSON.Point>> {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${ address }.json`
  const access_token = options.access_token || process.env.MAPBOX_ACCESS_TOKEN
  if (!access_token) { error('--access_token is required') }
  const params = {
    access_token,
  }
  return get(url, Mapbox.toGeoJSON, params, options)
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
export async function mapboxReverse(lnglat: LngLat, options = Mapbox.Options): Promise<GeoJSON.FeatureCollection<GeoJSON.Point>> {
  lnglat = utils.validateLngLat(lnglat)
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${ lnglat.join(',') }.json`
  const access_token = options.access_token || process.env.MAPBOX_ACCESS_TOKEN
  if (!access_token) { error('--access_token is required') }
  const params = {
    access_token,
  }
  return get(url, Mapbox.toGeoJSON, params, options)
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
export async function google(address: string, options = Google.Options): Promise<GeoJSON.FeatureCollection<GeoJSON.Point>> {
  const url = 'https://maps.googleapis.com/maps/api/geocode/json'
  const params = {
    address,
    sensor: options.sensor,
  }
  return get(url, Google.toGeoJSON, params, options)
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
export async function googleReverse(lnglat: LngLat, options = Google.Options): Promise<GeoJSON.FeatureCollection<GeoJSON.Point>> {
  const [lng, lat] = utils.validateLngLat(lnglat)
  const url = 'https://maps.googleapis.com/maps/api/geocode/json'
  const params = {
    address: [lat, lng].join(','),
    sensor: options.sensor,
  }
  return get(url, Google.toGeoJSON, params, options)
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
export async function bing(address: string, options = Bing.Options): Promise<GeoJSON.FeatureCollection<GeoJSON.Point>> {
  const url = 'http://dev.virtualearth.net/REST/v1/Locations'
  const key = options.key || process.env.BING_API_KEY
  if (!key) { error('--key is required') }
  const params = {
    inclnb: 1,
    key,
    o: 'json',
    q: address,
  }
  return get(url, Bing.toGeoJSON, params, options)
}

/**
 * Wikidata Provider
 *
 * @param {string} address Location for your search
 * @param {Options} [options] Wikidata Options
 * @param {string} [options.language] Language
 * @param {number} [options.limit] Limit the amount of results
 * @param {LngLat} [options.nearest] Nearest location from a given LngLat
 * @param {number} [options.distance] Maximum distance from nearest LngLat
 * @param {Array<string>} [options.places] Filter results by place=*
 * @returns {GeoJSON<Point>} GeoJSON Feature Collection
 * @example
 * const geojson = await geocoder.wikidata('Ottawa')
 */
export async function wikidata(address: string, options = Wikidata.Options): Promise<GeoJSON.FeatureCollection<GeoJSON.Point>> {
  const urlEntities = wdk.searchEntities({
    language: options.language,
    limit: options.limit,
    search: address,
  })
  const response = await axios.get(urlEntities)
  const entities: Wikidata.SearchEntities = response.data
  const ids = entities.search.map(entity => entity.id)
  const url = wdk.getEntities(ids)
  return get(url, Wikidata.toGeoJSON, {}, options)
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
async function get(url: string, geojsonParser: Function, params = {}, options?: utils.Options): Promise<GeoJSON.FeatureCollection<GeoJSON.Point>> {
  const response = await axios.get(url, {params})
  const json = response.data
  let geojson: Points = turf.featureCollection([])
  if (json) {
    geojson = geojsonParser(json, options)

    // Filter by places
    if (options.places) {
      geojson.features = geojson.features.filter(feature => {
        return lodash.intersection(feature.properties.places, options.places).length !== 0
      })
    }

    // Filter by nearest (1.601ms)
    if (geojson.features[0]) {
      if (options.nearest) {
        const point = turf.point(options.nearest)
        const result = nearest(point, geojson)
        const dist = Number(distance(point, result).toFixed(6))
        result.properties.distance = dist
        geojson.features = [result]

        // Remove features if nearest feature is not within maximum distance
        if (dist > options.radius) {
          geojson.features = []
        }
      }
    }

    // Convert coordinate precision to 6 (0.240ms)
    geojson.features = geojson.features.map(feature => {
      feature.geometry.coordinates = feature.geometry.coordinates.map(coord => Number(coord.toFixed(6)))
      return feature
    })
  }
  return geojson
}

export default {
  google,
  googleReverse,
  mapbox,
  mapboxReverse,
  bing,
  wikidata,
}
