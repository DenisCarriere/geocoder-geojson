import * as turf from '@turf/turf'
import { assign } from 'lodash'
import { BBox, OSM } from '../index'
import { confidenceScore, replaceStreetSuffix } from '../index'

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

interface GoogleResult {
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

export const GoogleDefaultOptions: GoogleOptions = {
  sensor: false,
  short: false,
}

interface GoogleOptions {
  client?: string
  key?: string
  language?: string
  short?: boolean
  sensor?: boolean
}

export interface GoogleResults {
  status: string
  results: Array<GoogleResult>
}

/**
 * Parses Address Component into a single layer Object
 */
function parseAddressComponents(components: Array<AddressComponent>, options?: GoogleOptions) {
  const results: any = {}
  components.map(component => {
    if (options.short) { results[component.types[0]] = component.short_name
    } else { results[component.types[0]] = component.long_name }
  })
  return results
}

/**
 * Converts GoogleResult Bounds to BBox
 */
function parseBBox(result: GoogleResult): BBox {
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
function parsePoint(result: GoogleResult): GeoJSON.Feature<GeoJSON.Point> {
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
export function GoogleToGeoJSON(json: GoogleResults, options?: GoogleOptions) {
  const collection: GeoJSON.FeatureCollection<GeoJSON.Point> = turf.featureCollection([])

  json.results.map(result => {
    // Google Specific Properties
    const components = parseAddressComponents(result.address_components, options)
    const location_type = result.geometry.location_type
    const formatted_address = result.formatted_address
    const place_id = result.place_id
    const types = result.types

    // Point GeoJSON
    const point = parsePoint(result)
    const bbox = parseBBox(result)
    let confidence = confidenceScore(bbox)
    if (location_type === 'ROOFTOP') { confidence = 10 }
    const properties = {
      location_type,
      formatted_address,
      place_id,
      types,
      confidence,
    }
    assign(properties, components)

    // OSM attributes
    const osm: OSM = {
      'addr:housenumber': components.street_number,
      'addr:street': replaceStreetSuffix(components.route),
      'addr:postcode': components.postal_code,
    }
    assign(properties, osm)

    // Store Point to GeoJSON feature collection
    if (point) {
      point.bbox = bbox
      point.properties = properties
      collection.features.push(point)
    }
  })
  return collection
}
