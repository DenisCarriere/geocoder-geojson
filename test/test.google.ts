import test from 'ava'
import * as geocoder from '../index'
import {CITY, LNGLAT} from './globals'

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
