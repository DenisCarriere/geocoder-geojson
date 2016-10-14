import test from 'ava'
import * as geocoder from './index'

test('google', async t => {
  const g = await geocoder.google('Ottawa')
  t.true(!!g.features)
})

test('replaceStreetSuffix', async t => {
  t.deepEqual(geocoder.replaceStreetSuffix('Foo Bar St'), 'Foo Bar Street')
  t.deepEqual(geocoder.replaceStreetSuffix('Foo Bar Dr'), 'Foo Bar Drive')
  t.deepEqual(geocoder.replaceStreetSuffix('Foo Bar Ave'), 'Foo Bar Avenue')
  t.deepEqual(geocoder.replaceStreetSuffix('Foo Bar Rd'), 'Foo Bar Road')
})
