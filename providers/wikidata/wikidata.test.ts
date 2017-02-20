import * as fs from 'fs'
import * as path from 'path'
import * as wikidata from './wikidata'

test('wikidata.toGeoJSON', () => {
  const geojson = wikidata.toGeoJSON(require('./fixtures/in'))
  expect(geojson).toEqual(require('./fixtures/out'))
})

test('wikidata.createQuery', () => {
  const query = wikidata.createQuery('Ottawa', {radius: 100, nearest: [-75, 45]})
  if (process.env.regen) { fs.writeFileSync(path.join(__dirname, 'fixtures', 'out.sparql.sql'), query, 'utf8')}

  const sparql = fs.readFileSync(path.join(__dirname, 'fixtures', 'out.sparql.sql'), 'utf8')
  expect(query).toBe(sparql)
  expect(() => wikidata.createQuery('Ottawa')).toThrow()
  expect(() => wikidata.createQuery('Ottawa', {nearest: [-75, 45], languages: ['xx']})).toThrow()
})
