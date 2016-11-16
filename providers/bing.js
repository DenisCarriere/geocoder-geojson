"use strict";
const helpers_1 = require('@turf/helpers');
const utils_1 = require('../utils');
exports.Options = {};
function parseBBox(result) {
    const [south, west, north, east] = result.bbox;
    return [west, south, east, north];
}
function parsePoint(result) {
    const [lat, lng] = result.point.coordinates;
    return helpers_1.point([lng, lat]);
}
/**
 * Convert Bing results into GeoJSON
 */
function toGeoJSON(json, options) {
    const collection = helpers_1.featureCollection([]);
    json.resourceSets[0].resources.map(result => {
        // Point GeoJSON
        const point = parsePoint(result);
        const bbox = parseBBox(result);
        let confidence = utils_1.confidenceScore(bbox);
        const properties = {
            confidence,
            authenticationResultCode: json.authenticationResultCode,
            brandLogoUri: json.brandLogoUri,
            copyright: json.copyright,
            entityType: result.entityType,
            matchCodes: result.matchCodes,
            name: result.name,
            statusCode: json.statusCode,
            statusDescription: json.statusDescription,
            traceId: json.traceId,
        };
        Object.assign(properties, result.address);
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
//# sourceMappingURL=bing.js.map