"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
/// <reference path="index.d.ts" />
const axios_1 = require('axios');
const turf = require('@turf/helpers');
const Bing = require('./providers/bing');
const Google = require('./providers/google');
const Mapbox = require('./providers/mapbox');
const Wikidata = require('./providers/wikidata');
const utils = require('./utils');
const utils_1 = require('./utils');
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
function mapbox(address, options = Mapbox.Options) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json`;
        const access_token = options.access_token || process.env.MAPBOX_ACCESS_TOKEN;
        if (!access_token) {
            utils_1.error('--access_token is required');
        }
        const params = {
            access_token,
        };
        return get(url, Mapbox.toGeoJSON, params, options);
    });
}
exports.mapbox = mapbox;
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
function mapboxReverse(lnglat, options = Mapbox.Options) {
    return __awaiter(this, void 0, void 0, function* () {
        lnglat = utils.validateLngLat(lnglat);
        const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lnglat.join(',')}.json`;
        const access_token = options.access_token || process.env.MAPBOX_ACCESS_TOKEN;
        if (!access_token) {
            utils_1.error('--access_token is required');
        }
        const params = {
            access_token,
        };
        return get(url, Mapbox.toGeoJSON, params, options);
    });
}
exports.mapboxReverse = mapboxReverse;
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
function google(address, options = Google.Options) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = 'https://maps.googleapis.com/maps/api/geocode/json';
        const params = {
            address,
            sensor: options.sensor,
        };
        return get(url, Google.toGeoJSON, params, options);
    });
}
exports.google = google;
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
function googleReverse(lnglat, options = Google.Options) {
    return __awaiter(this, void 0, void 0, function* () {
        const [lng, lat] = utils.validateLngLat(lnglat);
        const url = 'https://maps.googleapis.com/maps/api/geocode/json';
        const params = {
            address: [lat, lng].join(','),
            sensor: options.sensor,
        };
        return get(url, Google.toGeoJSON, params, options);
    });
}
exports.googleReverse = googleReverse;
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
function bing(address, options = Bing.Options) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = 'http://dev.virtualearth.net/REST/v1/Locations';
        const key = options.key || process.env.BING_API_KEY;
        if (!key) {
            utils_1.error('--key is required');
        }
        const params = {
            inclnb: 1,
            key,
            o: 'json',
            q: address,
        };
        return get(url, Bing.toGeoJSON, params, options);
    });
}
exports.bing = bing;
/**
 * Wikidata Provider
 *
 * @param {string} address Location for your search
 * @param {Options} [options] Wikidata Options
 * @param {LngLat} [options.nearest] Nearest location from a given LngLat
 * @param {number} [options.radius] Maximum radius from nearest LngLat
 * @param {Array<string>} [options.languages] Exact match on a list of languages
 * @param {Array<string>} [options.subclasses] Filter results by Wikidata subclasses
 * @returns {GeoJSON<Point>} GeoJSON Feature Collection
 * @example
 * const geojson = await geocoder.wikidata('Ottawa')
 */
function wikidata(address, options = Wikidata.Options) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = 'https://query.wikidata.org/bigdata/namespace/wdq/sparql';
        const query = Wikidata.createQuery(address, options);
        const params = {
            query,
        };
        return get(url, Wikidata.toGeoJSON, params, options);
    });
}
exports.wikidata = wikidata;
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
function get(url, geojsonParser, params = {}, options) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield axios_1.default.get(url, { params });
        const json = response.data;
        let geojson;
        if (json !== undefined) {
            geojson = geojsonParser(json, options);
        }
        else {
            geojson = turf.featureCollection([]);
        }
        return geojson;
    });
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    google,
    googleReverse,
    mapbox,
    mapboxReverse,
    bing,
    wikidata,
};
//# sourceMappingURL=index.js.map