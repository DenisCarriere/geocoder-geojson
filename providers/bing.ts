import * as turf from '@turf/turf'
import { assign } from 'lodash'
import { BBox, LngLat, OSM } from '../index'
import { confidenceScore } from '../index'

export const BingDefaultOptions: BingOptions = {
}

interface BingOptions {
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
  resources: Array<BingResult>
}

interface BingResult {
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

export interface BingResults {
  authenticationResultCode: string
  brandLogoUri: string
  copyright: string
  resourceSets: Array<ResourceSets>
  statusCode: number
  statusDescription: string
  traceId: string
}

function parseBBox(result: BingResult): BBox {
  const [minY, minX, maxY, maxX] = result.bbox
  return [minX, minY, maxX, maxY]
}

function parsePoint(result: BingResult): GeoJSON.Feature<GeoJSON.Point> {
  const [lat, lng] = result.point.coordinates
  return turf.point([lng, lat])
}

/**
 * Convert Bing results into GeoJSON
 */
export function BingToGeoJSON(json: BingResults, options?: BingOptions) {
  const collection: GeoJSON.FeatureCollection<GeoJSON.Point> = turf.featureCollection([])
  json.resourceSets[0].resources.map(result => {
    // Point GeoJSON
    const point = parsePoint(result)
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
    assign(properties, result.address)

    // OSM attributes
    const osm: OSM = {
      'addr:postcode': result.address.postalCode,
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
