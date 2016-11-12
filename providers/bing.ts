import { point, featureCollection } from '@turf/helpers'
import { Points, BBox, LngLat, confidenceScore } from '../utils'

export const Options: Options = {}
export interface Options {
  key?: string
}

interface Point {
  type: string
  coordinates: LngLat
}

interface GeocodePoint extends Point {
  calculationMethod: string
  usageTypes: Array<string>
}

interface ResourceSets {
  estimatedTotal: number
  resources: Array<Result>
}

interface Result {
  __type?: string
  bbox: BBox
  name: string
  point: Point
  address: {
    addressLine: string
    adminDistrict: string
    adminDistrict2: string
    countryRegion: string
    formattedAddress: string
    neighborhood: string
    locality: string
    postalCode: string
  }
  confidence: string
  entityType: string
  geocodePoints: Array<GeocodePoint>
  matchCodes: Array<string>
}

export interface Results {
  authenticationResultCode: string
  brandLogoUri: string
  copyright: string
  resourceSets: Array<ResourceSets>
  statusCode: number
  statusDescription: string
  traceId: string
}

function parseBBox(result: Result): BBox {
  const [south, west, north, east] = result.bbox
  return [west, south, east, north]
}

/**
 * Convert Bing results into GeoJSON
 */
export function toGeoJSON(json: Results, options?: Options): Points {
  const collection: Points = featureCollection([])
  json.resourceSets[0].resources.map(result => {
    // Point GeoJSON
    const point = turf.point(result.point.coordinates.reverse())
    const bbox = parseBBox(result)
    let confidence = confidenceScore(bbox)
    const properties: any = {
      confidence,
      authenticationResultCode: json.authenticationResultCode,
      brandLogoUri: json.brandLogoUri,
      copyright: json.copyright,
      entityType: result.entityType,
      matchCodes: result.matchCodes,
      name: result.name,
      statusCode: json.statusCode,
      statusDescription: json.statusDescription,
      traceId: json.traceId,
    }
    Object.assign(properties, result.address)

    // Store Point to GeoJSON feature collection
    if (point) {
      point.bbox = bbox
      point.properties = properties
      collection.features.push(point)
    }
  })
  return collection
}
