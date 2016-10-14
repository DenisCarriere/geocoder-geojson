import * as providers from './providers'
import * as utils from './utils'

// Providers
export const google = providers.google

// Utils
export const fullStreetSuffix = utils.fullStreetSuffix
export const confidenceScore = utils.confidenceScore

// Default Export
export default {
  google,
  fullStreetSuffix,
  confidenceScore,
}
