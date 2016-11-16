"use strict";
const helpers_1 = require('@turf/helpers');
const utils_1 = require('../utils');
exports.Options = {
    language: 'en',
    sensor: false,
    short: false,
};
/**
 * Parses Address Component into a single layer Object
 */
function parseAddressComponents(components, short = true) {
    const results = {};
    components.map(component => {
        if (short) {
            results[component.types[0]] = component.short_name;
        }
        else {
            results[component.types[0]] = component.long_name;
        }
    });
    return results;
}
/**
 * Converts GoogleResult Bounds to BBox
 */
function parseBBox(result) {
    if (result.geometry) {
        if (result.geometry.viewport) {
            const viewport = result.geometry.viewport;
            return [viewport.southwest.lng, viewport.southwest.lat, viewport.northeast.lng, viewport.northeast.lat];
        }
    }
}
/**
 * Converts GoogleResult to GeoJSON Point
 */
function parsePoint(result) {
    if (result.geometry) {
        if (result.geometry.location) {
            const { lng, lat } = result.geometry.location;
            return helpers_1.point([lng, lat]);
        }
    }
}
/**
 * Convert Google results into GeoJSON
 */
function toGeoJSON(json, options) {
    const collection = helpers_1.featureCollection([]);
    json.results.map(result => {
        // Get Geometries
        const point = parsePoint(result);
        const bbox = parseBBox(result);
        // Calculate Confidence score
        const location_type = result.geometry.location_type;
        let confidence = utils_1.confidenceScore(bbox);
        if (location_type === 'ROOFTOP') {
            confidence = 10;
        }
        // GeoJSON Point properties
        const properties = {
            confidence,
            location_type,
            formatted_address: result.formatted_address,
            place_id: result.place_id,
            types: result.types,
        };
        // Google Specific Properties
        const components = parseAddressComponents(result.address_components, options.short);
        Object.assign(properties, components);
        // Store Point to GeoJSON feature collection
        if (point) {
            point.bbox = bbox;
            point.properties = properties;
            collection.features.push(point);
        }
    });
    return collection;
}
exports.toGeoJSON = toGeoJSON;
//# sourceMappingURL=google.js.map