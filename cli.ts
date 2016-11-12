#!/usr/bin/env node
import * as program from 'commander'
import * as colors from 'colors'

const geocoder = require('.')
delete geocoder.default
const providers = Object.keys(geocoder)

interface CLI extends program.ICommand {
  limit?: number
  location?: string
  provider?: string
}

function customHelp() {
  console.log('  Examples:\n')
  console.log('    $ geocode --provider bing "Ottawa ON"\n')
  console.log('    $ geocode --provider wikidata --nearest [-75.7,45.4] Ottawa')
  console.log('  Providers:\n')
  providers.map(provider => console.log(`    - ${provider}`))
}

function error (message: string) {
  console.log(colors.bgRed(`[Error] ${ message }`))
  process.exit(1)
}

program
  .version(require('./package.json').version)
  .usage('[options] <location>')
  .description('Geocoding results according to the GeoJSON specification')
  .option('-p, --provider [string="bing"]', 'Geocoding Provider')
  .option('--limit [number]', 'Limit the results')
  .option('--nearest [LngLat]', 'Nearest result from a given LngLat', value => JSON.parse(value))
  .option('--distance [number]', 'Maximum distance of nearest results')
  .on('--help', customHelp)
  .parse(process.argv)

const cli: CLI = program

// Handle Location
let location: string
if (cli.args[0]) {
  location = cli.args[0]
} else {
  error('<location> is required')
}

// Handle Providers
const provider = cli.provider.toLowerCase() || 'bing'
if (providers.indexOf(provider) === -1) {
  error(`--provider is invalid`)
}

// Handle Options
/**
 * options
 */

// Geocoder
async function main() {
  const geojson = await geocoder[provider](location, cli)
  console.log(JSON.stringify(geojson, null, 4))
}
main()
