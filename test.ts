import test from 'ava'
import * as geocoder from './index'
import { replaceStreetSuffix, confidenceScore } from './providers/utils'

const CITY = 'Ottawa, ON'
const LNGLAT: [number, number] = [-75.1, 45.1]

test('mapbox', async t => {
  const g = await geocoder.mapbox(CITY, {access_token: 'pk.eyJ1IjoidHJpc3RlbiIsImEiOiJiUzBYOEJzIn0.VyXs9qNWgTfABLzSI3YcrQ'})
  t.true(!!g.features)
})

test('bing', async t => {
  const g = await geocoder.bing(CITY)
  t.true(!!g.features)
})

test('google', async t => {
  const g = await geocoder.google(CITY)
  t.true(!!g.features)
})

test('google short=false', async t => {
  const g = await geocoder.google(CITY, {short: false})
  t.true(!!g.features)
})

test('googleReverse', async t => {
  const g = await geocoder.googleReverse(LNGLAT)
  t.true(!!g.features)
})

test('replaceStreetSuffix', async t => {
  t.deepEqual(replaceStreetSuffix('Foo Bar St'), 'Foo Bar Street')
  t.deepEqual(replaceStreetSuffix('Foo Bar Dr'), 'Foo Bar Drive')
  t.deepEqual(replaceStreetSuffix('Foo Bar Ave'), 'Foo Bar Avenue')
  t.deepEqual(replaceStreetSuffix('Foo Bar Rd'), 'Foo Bar Road')
})

test('confidenceScore', t => {
  t.deepEqual(confidenceScore([-75.1, 45.1, -75, 45]), 4)
  t.deepEqual(confidenceScore([-75.001, 45.001, -75, 45]), 10)
})
