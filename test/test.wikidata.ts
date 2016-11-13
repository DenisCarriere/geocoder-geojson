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

test('wikidata.nearest + distance', async t => {
  const g = await geocoder.wikidata(CITY, {distance: 50, nearest: [-75, 45]})
  t.true(!!g.features)
})

test('wikidata.nearest + places', async t => {
  const g = await geocoder.wikidata(CITY, {places: ['capital', 'city'], nearest: [-75, 45]})
  t.true(!!g.features)
})
