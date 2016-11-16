"use strict";
const ava_1 = require('ava');
const utils_1 = require('../utils');
ava_1.default('confidenceScore', t => {
    t.deepEqual(utils_1.confidenceScore([-75.1, 45.1, -75, 45]), 4);
    t.deepEqual(utils_1.confidenceScore([-75.001, 45.001, -75, 45]), 10);
});
ava_1.default('validateLngLat', t => {
    t.throws(() => utils_1.validateLngLat([-120, 220]), 'LngLat [lat] must be within -90 to 90 degrees');
    t.throws(() => utils_1.validateLngLat([120, 220]), 'LngLat [lat] must be within -90 to 90 degrees');
    t.throws(() => utils_1.validateLngLat([-220, 45]), 'LngLat [lng] must be within -180 to 180 degrees');
    t.throws(() => utils_1.validateLngLat([220, 45]), 'LngLat [lng] must be within -180 to 180 degrees');
});
// test('replaceStreetSuffix', async t => {
//   t.deepEqual(replaceStreetSuffix('Foo Bar St'), 'Foo Bar Street')
//   t.deepEqual(replaceStreetSuffix('Foo Bar Dr'), 'Foo Bar Drive')
//   t.deepEqual(replaceStreetSuffix('Foo Bar Ave'), 'Foo Bar Avenue')
//   t.deepEqual(replaceStreetSuffix('Foo Bar Rd'), 'Foo Bar Road')
// })
//# sourceMappingURL=test.utils.js.map