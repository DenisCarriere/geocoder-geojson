"use strict";
const colors = require('colors');
const helpers_1 = require('@turf/helpers');
const bboxPolygon = require('@turf/bbox-polygon');
const distance = require('@turf/distance');
/**
 * Pretty Error message
 */
function error(message) {
    console.log(colors.bgRed(`[Error] ${message}`));
    process.exit(1);
}
exports.error = error;
/**
 * Score (2 worst to 10 best) Distance (kilometers)
 */
const scoreMatrix = [
    [2, 25],
    [3, 20],
    [4, 15],
    [5, 10],
    [6, 7.5],
    [7, 5],
    [8, 1],
    [9, 0.5],
    [10, 0.25],
];
/**
 * Generates a confidence score from 1 (worst) to 10 (best) from a given BBox
 *
 * @param {BBox} bbox extent in [minX, minY, maxX, maxY] order
 * @returns {number} confidence score
 * @example
 * confidenceScore([-75.1, 45.1, -75, 45])
 * //=4
 * confidenceScore([-75.001, 45.001, -75, 45])
 * //=10
 */
function confidenceScore(bbox) {
    if (!bbox) {
        return 0;
    }
    let result = 0;
    const poly = bboxPolygon(bbox);
    const sw = helpers_1.point(poly.geometry.coordinates[0][0]);
    const ne = helpers_1.point(poly.geometry.coordinates[0][2]);
    const d = distance(sw, ne, 'kilometers');
    scoreMatrix.map(step => {
        const [score, maximum] = step;
        if (d < maximum) {
            result = score;
        }
        if (d >= 25) {
            result = 1;
        }
    });
    return result;
}
exports.confidenceScore = confidenceScore;
// /**
//  * Street Suffix
//  */
// const suffix: Suffix = require(path.join(__dirname, 'suffix.json'))
// interface Suffix { [key: string]: string }
// /**
//  * Replaces Street Suffix with a complete word
//  *
//  * @param {string} name street name
//  * @returns {string} name replace street suffix
//  * @example
//  * replaceStreetSuffix('Foo Bar St')
//  * //='Foo Bar Street'
//  * replaceStreetSuffix('Foo Bar Dr.')
//  * //='Foo Bar Drive'
//  */
// export function replaceStreetSuffix(name: string): string {
//   if (name) {
//     Object.keys(suffix).map(key => {
//       const pattern = new RegExp(`${ key }[\.]?$`, 'i')
//       name = name.replace(pattern, suffix[key])
//     })
//   }
//   return name
// }
/**
 * Validates {@link LngLat} coordinates.
 *
 * @param {LngLat} lnglat Longitude (Meridians) & Latitude (Parallels) in decimal degrees
 * @throws {Error} Will throw an error if LngLat is not valid.
 * @returns {LngLat} LngLat coordinates
 * @example
 * mercator.validateLngLat([-115, 44])
 * //= [ -115, 44 ]
 * mercator.validateLngLat([-225, 44])
 * //= Error: LngLat [lng] must be within -180 to 180 degrees
 */
function validateLngLat(lnglat) {
    const [lng, lat] = lnglat;
    if (lat < -90 || lat > 90) {
        const message = 'LngLat [lat] must be within -90 to 90 degrees';
        throw new Error(message);
    }
    else if (lng < -180 || lng > 180) {
        const message = 'LngLat [lng] must be within -180 to 180 degrees';
        throw new Error(message);
    }
    return [lng, lat];
}
exports.validateLngLat = validateLngLat;
//# sourceMappingURL=index.js.map