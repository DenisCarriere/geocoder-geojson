import * as turf from '@turf/helpers'

export const Options: Options = { }
export interface Options { }

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
type Type = 'item'
type Labels = any
type Descriptions = any
type Aliases = any
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
  type: Type
  id: string
  labels: Labels
  descriptions: Descriptions
  aliases: Aliases
  claims: Claims
  sitelinks: Sitelinks
}
export interface Results {
  entities: {
    [key: string]: Result
  }
}

/**
 * Convert Wikidata results into GeoJSON
 */
export function toGeoJSON(json: Results, options: Options): GeoJSON.FeatureCollection<GeoJSON.Point> {
  const collection: GeoJSON.FeatureCollection<GeoJSON.Point> = turf.featureCollection([])
  Object.keys(json.entities).map(id => {
    const entity = json.entities[id]
    const {longitude, latitude} = entity.claims.P625[0].mainsnak.datavalue.value
    console.log(longitude, latitude)
  })
  return collection
}
