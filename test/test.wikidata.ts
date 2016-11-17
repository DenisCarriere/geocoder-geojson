import test from 'ava'
import * as geocoder from '../index'

const CITY = 'Ottawa'

test('wikidata', async t => {
  const g = await geocoder.wikidata(CITY, {nearest: [-75.7, 45.416667]})
  t.true(!!g.features)
})
