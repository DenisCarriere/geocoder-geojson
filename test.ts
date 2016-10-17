import test from 'ava'
import * as geocoder from './index'

test('google', async t => {
  const g = await geocoder.google('Ottawa')
  t.true(!!g.features)
})

test('google short=false', async t => {
  const g = await geocoder.google('Ottawa', {short: false})
  t.true(!!g.features)
})

test('googleReverse', async t => {
  const g = await geocoder.googleReverse([-75.1, 45.1])
  t.true(!!g.features)
})

test('replaceStreetSuffix', async t => {
  t.deepEqual(geocoder.replaceStreetSuffix('Foo Bar St'), 'Foo Bar Street')
  t.deepEqual(geocoder.replaceStreetSuffix('Foo Bar Dr'), 'Foo Bar Drive')
  t.deepEqual(geocoder.replaceStreetSuffix('Foo Bar Ave'), 'Foo Bar Avenue')
  t.deepEqual(geocoder.replaceStreetSuffix('Foo Bar Rd'), 'Foo Bar Road')
})

test('confidenceScore', t => {
  t.deepEqual(geocoder.confidenceScore([-75.1, 45.1, -75, 45]), 4)
  t.deepEqual(geocoder.confidenceScore([-75.001, 45.001, -75, 45]), 10)
})
