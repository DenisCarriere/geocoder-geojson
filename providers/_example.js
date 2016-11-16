"use strict";
const turf = require('@turf/helpers');
exports.Options = {};
/**
 * Convert <PROVIDER> results into GeoJSON
 */
function toGeoJSON(json, options) {
    const collection = turf.featureCollection([]);
    return collection;
}
exports.toGeoJSON = toGeoJSON;
//# sourceMappingURL=_example.js.map