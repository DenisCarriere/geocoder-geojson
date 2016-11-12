import test from 'ava'
import * as geocoder from '../index'

const CITY = 'Ottawa'

test('wikidata', async t => {
  const g = await geocoder.wikidata(CITY)
  t.true(!!g.features)
})

test('wikidata.nearest', async t => {
  const g = await geocoder.wikidata(CITY, {nearest: [-75, 45]})
  t.true(!!g.features)
})

test('wikidata.nearest.distance', async t => {
  const g = await geocoder.wikidata(CITY, {distance: 1, nearest: [-75, 45]})
  t.true(!!g.features)
})