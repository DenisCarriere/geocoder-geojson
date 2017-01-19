import * as turf from '@turf/helpers'
import * as utils from '../../utils'
import { BBox, confidenceScore, Points } from '../../utils'

export const Options: Options = {
  language: 'en',
  sensor: false,
  short: false,
}
export interface Options extends utils.Options {
  client?: string
  key?: string
  language?: string
  short?: boolean
  sensor?: boolean
}

interface Bounds {
  northeast: LatLng
  southwest: LatLng
}

interface LatLng {
  lat: number
  lng: number
}

interface AddressComponent {
  long_name: string
  short_name: string
  types: Array<string>
}

export interface Result {
  address_components: Array<AddressComponent>
  formatted_address: string
  geometry: {
    bounds: Bounds
    location: LatLng
    location_type: string
    viewport: Bounds
  }
  place_id: string
  types: Array<string>
}

export interface Results {
  status: string
  results: Array<Result>
}

/**
 * Parses Address Component into a single layer Object
 */
function parseAddressComponents(components: Array<AddressComponent>, short = Options.short) {
  const results: any = {}
  components.map(component => {
    if (short) { results[component.types[0]] = component.short_name
    } else { results[component.types[0]] = component.long_name }
  })
  return results
}

/**
 * Converts GoogleResult Bounds to BBox
 */
function parseBBox(result: Result): BBox {
  if (result.geometry) {
    if (result.geometry.viewport) {
      const viewport = result.geometry.viewport
      return [viewport.southwest.lng, viewport.southwest.lat, viewport.northeast.lng, viewport.northeast.lat]
    }
  }
}

/**
 * Converts GoogleResult to GeoJSON Point
 */
function parsePoint(result: Result): GeoJSON.Feature<GeoJSON.Point> {
  if (result.geometry) {
    if (result.geometry.location) {
      const {lng, lat} = result.geometry.location
      return turf.point([lng, lat])
    }
  }
}

/**
 * Convert Google results into GeoJSON
 */
export function toGeoJSON(json: Results, options?: Options): Points {
  const short = options.short || Options.short
  const collection: Points = turf.featureCollection([])
  json.results.map(result => {
    // Get Geometries
    const point = parsePoint(result)
    const bbox = parseBBox(result)

    // Calculate Confidence score
    const location_type = result.geometry.location_type
    let confidence = confidenceScore(bbox)
    if (location_type === 'ROOFTOP') { confidence = 10 }

    // GeoJSON Point properties
    const properties = {
      confidence,
      location_type,
      formatted_address: result.formatted_address,
      place_id: result.place_id,
      types: result.types,
    }

    // Google Specific Properties
    const components = parseAddressComponents(result.address_components, short)
    Object.assign(properties, components)

    // Store Point to GeoJSON feature collection
    if (point) {
      point.bbox = bbox
      point.properties = properties
      collection.features.push(point)
    }
  })
  return collection
}
