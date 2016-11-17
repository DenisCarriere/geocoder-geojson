import { featureCollection } from '@turf/helpers'
import * as utils from '../utils'
import { LngLat, Points } from '../utils'

export const Options: Options = {}
export interface Options extends utils.Options {
  access_token?: string
}

interface Geometry {
  coordinates: LngLat
  type: string
}

export interface Result extends GeoJSON.Feature<GeoJSON.Point> {
  address: string
  center: LngLat
  context: any[]
  id: string
  place_name: string
  properties: any
  relevance: number
  text: string
}

export interface Results {
  attribution: string
  features: Array<Result>
  query: string[]
  type: string
}

/**
 * Convert Mapbox results into GeoJSON
 */
export function toGeoJSON(json: Results, options: Options): Points {
  const collection: Points = featureCollection([])
  json.features.map(result => {
    collection.features.push(result)
  })
  return collection
}
