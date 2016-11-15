import * as turf from '@turf/helpers'
import { uniq } from 'lodash'
import * as utils from '../utils'
import { Points } from '../utils'

const wikidataPlaces = require('./wikidataPlaces.json')

export const Options: Options = { }
export interface Options extends utils.Options {
  language?: string
  limit?: number
}

interface Match {
  type: string
  language: string
  text: string
}

interface Entity {
  id: string
  concepturi: string
  url: string
  title: string
  pageid: number
  label: string
  description: string
  match: Match
}

export interface SearchEntities {
  searchinfo: {search: string}
  search: Array<Entity>
  'search-continue': number
  success: number
}

interface Mainsnak {
  mainsnak: {
    snaktype?: string
    property?: string
    datatype?: string
    datavalue?: {
      value?: any
      type?: string
    }
  }
  type?: string
  qualifiers?: any
  'qualifiers-order'?: any
  id?: string
  rank?: string
}

// Coordinates
interface P625 extends Mainsnak {
  mainsnak: {
    datavalue: {
      value: {
        latitude: number
        longitude: number
        altitude: number
        precision: number
        globe: string
      }
    }
  }
}

// Population
interface P1082 extends Mainsnak {
  mainsnak: {
    datavalue: {
      value: any
    }
  }
}

// Country Code
interface P17 extends Mainsnak {
  mainsnak: {
    datavalue: {
      value: any
    }
  }
}

// Instance of
interface P31 extends Mainsnak {
  mainsnak: {
    datavalue: {
      value: {
        'entity-type': string
        'numeric-id': number
        id: string
      }
    }
  }
}

interface Item {
  language: string
  value: string
}

interface Value {
  [language: string]: Item
  en: Item
  fr: Item
  ru: Item
  es: Item
  uk: Item
  zh: Item
  ja: Item
}

type Claims = {
  [key: string]: Array<any>
  P625: Array<P625>
  P31: Array<P31>
}

type Sitelinks = any

export interface Result {
  pageid: number
  ns: number
  title: string
  lastrevid: string
  modified: string
  type: string
  id: string
  labels: Value
  descriptions: Value
  aliases: Value
  claims: Claims
  sitelinks: Sitelinks
}
export interface Results {
  entities: {
    [key: string]: Result
  }
}

function getEnglish(value: Value) {
  if (value) {
    if (value.en) {
      return value.en.value
    }
  }
}

function getPlaces(description: string, claims: Claims): Array<string> {
  const places: Array<string> = []

  // Extract tags from instance of
  if (claims) {
    if (claims.P31) {
      claims.P31.map(claim => {
        const datavalue = claim.mainsnak.datavalue
        if (datavalue) {
          const id = datavalue.value.id
          if (wikidataPlaces.hasOwnProperty(id)) {
            places.push(wikidataPlaces[id])
          }
        }
      })
    }
  }

  // Fallback - Regex description "city in Ontario" = "city"
  if (description && places.length === 0) {
    const match = description.match(/^(.+) [in|of]/)
    if (match) { places.push(match[1]) }
  }
  return uniq(places)
}

/**
 * Convert Wikidata results into GeoJSON
 */
export function toGeoJSON(json: Results, options: Options): Points {
  const collection: Points = turf.featureCollection([])
  if (!json.entities) { return collection }

  Object.keys(json.entities).map(id => {
    const entity = json.entities[id]
    if (entity.claims.P625) {
      const coords = entity.claims.P625[0].mainsnak.datavalue
      if (coords !== undefined) {
        const {longitude, latitude} = coords.value
        const description = getEnglish(entity.descriptions)
        const places = getPlaces(description, entity.claims)
        const properties = {
          description,
          id,
          places,
          label: getEnglish(entity.labels),
        }
        const point = turf.point([longitude, latitude], properties)
        point.id = id
        collection.features.push(point)
      }
    }
  })
  return collection
}
