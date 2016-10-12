import * as rp from 'request-promise'
import { GoogleResults } from './providers/google'

/**
 * Google Provider
 *
 * @param {string} address Location for your search
 * @returns {GoogleResults}
 * @example
 * geocoder.google('Ottawa')
 *   .then(data => data.results)
 */
export async function google(address: string): Promise<GoogleResults> {
  const url = 'https://maps.googleapis.com/maps/api/geocode/json'
  const params = {
    address,
  }
  const results: GoogleResults = await rp.get(url, {qs: params})
    .then(data => JSON.parse(data))
  return results
}
