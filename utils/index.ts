import * as turf from '@turf/turf'
import { keys } from 'lodash'

interface Suffix {
  [key: string]: string
}

/**
 * Street Suffix
 */
export const suffix: Suffix = require('./suffix.json')

/**
 * BBox extent in [minX, minY, maxX, maxY] order
 */
export type BBox = [number, number, number, number]

/**
 * Score (2 worst to 10 best) Distance (kilometers)
 */
export const scoreMatrix: Array<[number, number]> = [
  [2, 25],
  [3, 20],
  [4, 15],
  [5, 10],
  [6, 7.5],
  [7, 5],
  [8, 1],
  [9, 0.5],
  [10, 0.25],
]

/**
 * Generates a confidence score from 1 (worst) to 10 (best) from a given BBox
 *
 * @param {BBox} bbox extent in [minX, minY, maxX, maxY] order
 * @returns {number} confidence score
 * @example
 * const score = condifenceScore([-76, 44, -75, 45])
 * //=score
 */
export function confidenceScore(bbox: BBox): number {
  if (!bbox) { return 0 }
  let result = 0
  const poly = turf.bboxPolygon(bbox)
  const sw = turf.point(poly.geometry.coordinates[0][0])
  const ne = turf.point(poly.geometry.coordinates[0][2])
  const distance = turf.distance(sw, ne, 'kilometers')
  scoreMatrix.map(step => {
    const [score, maximum] = step
    if (distance < maximum) { result = score }
    if (distance >= 25) { result = 1 }
  })
  return result
}

export function fullStreetSuffix(name: string): string {
  keys(suffix).map(key => {
    const pattern = new RegExp(`${ key }[\.]?$`, 'i')
    name = name.replace(pattern, suffix[key])
  })
  return name
}

const street = fullStreetSuffix('1552 Payette Dr')
console.log(street)
