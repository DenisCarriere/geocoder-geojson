#! /usr/bin/env node

const path = require('path')
const program = require('commander')
const utils = require(path.join(__dirname, '..', 'utils'))
const geocoder = require(path.join(__dirname,'..'))
const wikidata = require(path.join(__dirname, '..', 'providers', 'wikidata'))
const pkg = require(path.join(__dirname, '..', 'package.json'))

function customHelp() {
  process.stdout.write(`
  Examples:

    $ geocode --provider bing "Ottawa ON"
    $ geocode -p wikidata --nearest [-75.7,45.4] Ottawa
    $ geocode -p google --limit 3 "Ottawa ON"

  Providers:
`)
  Object.keys(geocoder).map(provider => process.stdout.write(`    * ${provider}`))
}

program
  .version(pkg.version)
  .usage('[options] <location>')
  .description('Geocoding results according to the GeoJSON specification')
  .option('-p, --provider [string="bing"]', 'Geocoding Provider')
  .option('--limit [number]', 'Limit the results', value => Number(value))
  .option('--nearest [LngLat]', 'Nearest result from a given LngLat', value => JSON.parse(value))
  .option('--places [Array<string>]', 'Filter by places=*', value => JSON.parse(value))
  .option('--radius [number]', 'Maximum radius distance (in kilometers) of nearest results', value => Number(value))
  .option('--raw', 'Returns the raw geocoded result as json')
  .option('--short', 'Short property values')
  .option('--sparql', 'Outputs only SPARQL query')
  .on('--help', customHelp)
  .parse(process.argv)

const cli = program

let location
if (cli.args[0]) {
  location = cli.args[0]
} else {
  utils.error('<location> is required')
}

// Handle Providers
const provider = cli.provider || 'bing'
if (Object.keys(geocoder).indexOf(provider) === -1) {
  utils.error(`--provider is invalid`)
}

function printGeoJSON(geojson) {
  process.stdout.write(JSON.stringify(geojson, null, 2))
}

// Geocoder
function main() {
  // Generates SPARQL query
  if (provider === 'wikidata' && cli.sparql !== undefined) {
    const query = wikidata.createQuery(location, cli)
    process.stdout.write(query)

  // Default Geocoder
  } else {
    geocoder.get(provider, location, cli).then(printGeoJSON).catch(utils.error)
  }
}
main()
