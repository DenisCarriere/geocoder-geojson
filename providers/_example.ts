import * as turf from '@turf/helpers'
import * as utils from '../utils'
import { Points } from '../utils'

export const Options: Options = { }
export interface Options extends utils.Options { }
export interface Result { }
export interface Results { }

/**
 * Convert <PROVIDER> results into GeoJSON
 */
export function toGeoJSON(json: Results, options: Options): Points {
  const collection: Points = turf.featureCollection([])
  return collection
}
