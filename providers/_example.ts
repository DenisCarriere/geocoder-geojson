import * as turf from '@turf/helpers'

export const ExampleOptions: ExampleOptions = { }
export interface ExampleOptions { }
export interface ExampleResult { }
export interface ExampleResults { }

/**
 * Convert Example results into GeoJSON
 */
export function ExampleToGeoJSON(json: ExampleResults, options: ExampleOptions): GeoJSON.FeatureCollection<GeoJSON.Point> {
  const collection: GeoJSON.FeatureCollection<GeoJSON.Point> = turf.featureCollection([])

  return collection
}
