import test from 'ava'
import * as geocoder from '../index'
import {CITY, LNGLAT} from './globals'

test('mapbox', async t => {
  const g = await geocoder.mapbox(CITY)
  t.true(!!g.features)
})

test('mapboxReverse', async t => {
  const g = await geocoder.mapboxReverse(LNGLAT)
  t.true(!!g.features)
})
