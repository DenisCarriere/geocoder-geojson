"use strict";
const helpers_1 = require('@turf/helpers');
exports.Options = {};
/**
 * Convert Mapbox results into GeoJSON
 */
function toGeoJSON(json, options) {
    const collection = helpers_1.featureCollection([]);
    json.features.map(result => {
        collection.features.push(result);
    });
    return collection;
}
exports.toGeoJSON = toGeoJSON;
//# sourceMappingURL=mapbox.js.map