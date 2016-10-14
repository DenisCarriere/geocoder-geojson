import test from 'ava'
import * as geocoder from './index'

test('google', async t => {
  const g = await geocoder.google('Ottawa')
  // t.deepEqual(g.status, 'OK')
})
