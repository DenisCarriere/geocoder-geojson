import test from 'ava'
import { confidenceScore, validateLngLat, verifyKey } from '../utils'

test('confidenceScore', t => {
  t.deepEqual(confidenceScore([-75.1, 45.1, -75, 45]), 4)
  t.deepEqual(confidenceScore([-75.001, 45.001, -75, 45]), 10)
})

test('validateLngLat', t => {
  t.throws(() => validateLngLat([-120, 220]), 'LngLat [lat] must be within -90 to 90 degrees')
  t.throws(() => validateLngLat([120, 220]), 'LngLat [lat] must be within -90 to 90 degrees')
  t.throws(() => validateLngLat([-220, 45]), 'LngLat [lng] must be within -180 to 180 degrees')
  t.throws(() => validateLngLat([220, 45]), 'LngLat [lng] must be within -180 to 180 degrees')
})

test('verifyKey', t => {
  t.throws(() => verifyKey('', 'ENV_MISSING'), 'API key authentication is required')
})

// test('replaceStreetSuffix', async t => {
//   t.deepEqual(replaceStreetSuffix('Foo Bar St'), 'Foo Bar Street')
//   t.deepEqual(replaceStreetSuffix('Foo Bar Dr'), 'Foo Bar Drive')
//   t.deepEqual(replaceStreetSuffix('Foo Bar Ave'), 'Foo Bar Avenue')
//   t.deepEqual(replaceStreetSuffix('Foo Bar Rd'), 'Foo Bar Road')
// })
