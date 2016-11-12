import * as turf from '@turf/helpers'
import * as nearest from '@turf/nearest'
import { Points } from '../utils'

type LngLat = [number, number]

export const Options: Options = { }
export interface Options {
  language?: string
  limit?: number
  nearest?: LngLat
  distance?: number
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

interface P625 {
  mainsnak: {
    snaktype: string
    property: string
    datavalue: {
      value: {
        latitude: number
        longitude: number
        altitude: number
        precision: number
        globe: string
      }
      type: string
    }
    datatype: string
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
  P625: Array<P625>
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

function english(value: Value) {
  if (value.en) {
    return value.en.value
  }
}

/**
 * Convert Wikidata results into GeoJSON
 */
export function toGeoJSON(json: Results, options: Options): Points {
  const collection: Points = turf.featureCollection([])
  Object.keys(json.entities).map(id => {
    const entity = json.entities[id]
    if (entity.claims.P625) {
      const {longitude, latitude} = entity.claims.P625[0].mainsnak.datavalue.value
      const properties = {
        description: english(entity.descriptions),
        id,
        label: english(entity.labels),
      }
      const point = turf.point([longitude, latitude], properties)
      point.id = id
      collection.features.push(point)
    }
  })
  return collection
}
