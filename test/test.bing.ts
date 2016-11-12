import test from 'ava'
import * as geocoder from '../index'
import {CITY} from './globals'

test('bing', async t => {
  const g = await geocoder.bing(CITY)
  t.true(!!g.features)
})
