import { featureCollection } from '@turf/helpers'
import { LngLat } from '../utils'

export const MapboxOptions: MapboxOptions = {}
export interface MapboxOptions {
  access_token?: string
}

interface Geometry {
  coordinates: LngLat
  type: string
}

export interface MapboxResult extends GeoJSON.Feature<GeoJSON.Point> {
  address: string
  center: LngLat
  context: any[]
  id: string
  place_name: string
  properties: any
  relevance: number
  text: string
}

export interface MapboxResults {
  attribution: string
  features: Array<MapboxResult>
  query: string[]
  type: string
}

/**
 * Convert Mapbox results into GeoJSON
 */
export function MapboxToGeoJSON(json: MapboxResults, options: MapboxOptions): GeoJSON.FeatureCollection<GeoJSON.Point> {
  const collection: GeoJSON.FeatureCollection<GeoJSON.Point> = featureCollection([])
  json.features.map(result => {
    collection.features.push(result)
  })
  return collection
}
