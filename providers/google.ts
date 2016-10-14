import * as rp from 'request-promise'
import * as turf from '@turf/turf'
import { assign } from 'lodash'
import { BBox, confidenceScore } from '../utils'

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

interface GoogleResults {
  status: string
  results: Array<GoogleResult>
}

/**
 * Google Provider
 *
 * @param {string} address Location for your search
 * @returns {GoogleResults} JSON Object
 * @example
 * geocoder.google('Ottawa')
 *   .then(data => data.results)
 */
export default async function google(address: string, short?: boolean): Promise<GeoJSON.FeatureCollection<GeoJSON.Point>> {
  const url = 'https://maps.googleapis.com/maps/api/geocode/json'
  const params = {
    address,
  }
  const data = await rp.get(url, {qs: params})
  const json: GoogleResults = await JSON.parse(data)
  return GoogleToGeoJSON(json, short)
}

/**
 * Parses Address Component into a single layer Object
 */
function parseAddressComponents(components: Array<AddressComponent>, short = true) {
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
function GoogleToGeoJSON(json: GoogleResults, short?: boolean) {
  const collection: GeoJSON.FeatureCollection<GeoJSON.Point> = turf.featureCollection([])

  json.results.map(result => {
    // Google Specific Properties
    const components = parseAddressComponents(result.address_components)
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
    const osm = {
      'addr:housenumber': components.street_number,
      'addr:street': components.route,
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

google('1552 Payette dr., ottawa, Ontario')
  .then(data => console.log(JSON.stringify(data, null, 4)), error => console.log(error))
