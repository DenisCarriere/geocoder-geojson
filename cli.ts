#!/usr/bin/env node
import * as program from 'commander'
import { error, LngLat } from './utils'

const geocoder = require('.')
delete geocoder.default
const providers = Object.keys(geocoder)

interface CLI extends program.ICommand {
  limit?: number
  location?: string
  provider?: string
  nearest?: LngLat
  places?: Array<string>
  distance?: number
}

function customHelp() {
  console.log(`
  Examples:

    $ geocode --provider bing "Ottawa ON"
    $ geocode -p wikidata --nearest [-75.7,45.4] Ottawa
    $ geocode -p google --limit 3 "Ottawa ON"

  Providers:
`)
  providers.map(provider => console.log(`    * ${provider}`))
}

program
  .version(require('./package.json').version)
  .usage('[options] <location>')
  .description('Geocoding results according to the GeoJSON specification')
  .option('-p, --provider [string="bing"]', 'Geocoding Provider')
  .option('--limit [number]', 'Limit the results', value => Number(value))
  .option('--nearest [LngLat]', 'Nearest result from a given LngLat', value => JSON.parse(value))
  .option('--places [Array<string>]', 'Filter by places=*', value => JSON.parse(value))
  .option('--distance [number]', 'Maximum distance of nearest results', value => Number(value))
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
let provider = cli.provider || 'bing'
provider = provider.toLowerCase()
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
