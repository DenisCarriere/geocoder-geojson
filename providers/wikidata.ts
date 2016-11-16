import * as turf from '@turf/helpers'
import * as utils from '../utils'
import { Points, LngLat } from '../utils'
const wikidataCodes = require('./wikidata/codes.json')
const wikidataLanguages: Array<string> = require('./wikidata/languages.json')

export interface Options extends utils.Options {
  limit?: number
  nearest?: LngLat
  radius?: number
  subclasses?: Array<string>
  languages?: Array<string>
}
export interface Result { }
export interface Results { }

export function createQuery(address: string, options: Options) {
  // Options
  const [lng, lat] = options.nearest
  const radius = options.radius || 15
  const subclasses = options.subclasses || ['Q486972']
  const languages = options.languages || ['en', 'fr', 'es', 'de', 'it', 'ru']

  // Validate languages
  languages.map(language => {
    if (wikidataLanguages.indexOf(language) === -1) {
      utils.error(`wikidata language code [${ language }] is invalid`)
    }
  })

  // Convert Arrays into Strings
  const subclassesString = subclasses.map(code => {
    code = wikidataCodes[code] || code
    return `wd:${code.replace('wd:', '')}`
  }).join(', ')

  // Build SPARQL Query
  let query = `SELECT DISTINCT ?place ?location ?distance ?placeDescription `
  query += languages.map(language => `?name_${ language }`).join(' ')
  query += ` WHERE { 
  # Search Instance of & Subclasses
  ?place wdt:P31/wdt:P279* ?subclass
  FILTER (?subclass in (${ subclassesString }))
  `
  if (options.nearest) {
    query += `
  # Search by Nearest
  SERVICE wikibase:around { 
    ?place wdt:P625 ?location . 
    bd:serviceParam wikibase:center "Point(${ lng } ${ lat })"^^geo:wktLiteral .
    bd:serviceParam wikibase:radius "${ radius }" . 
    bd:serviceParam wikibase:distance ?distance .
  }
    `
  }
  query += `
  # Filter by Exact Name
  OPTIONAL {
`
  languages.map(language => {
    query += `    ?place rdfs:label ?name_${ language } FILTER (lang(?name_${ language }) = "${ language }") .\n`
  })

  query += `  }\n\n`
  query += ` FILTER (`
  query += languages.map(language => `regex(?name_${ language }, "^${ address }$")`).join(' || ')
  query += `) .`

  // Descriptions
  query += `
# Get Descriptions
  SERVICE wikibase:label {
    bd:serviceParam wikibase:language "${ languages.join(',') }"
  }

} ORDER BY ASC(?dist)`
}

/**
 * Convert Wikidata SPARQL results into GeoJSON
 */
export function toGeoJSON(json: Results, options?: Options): Points {
  const collection: Points = turf.featureCollection([])
  return collection
}
