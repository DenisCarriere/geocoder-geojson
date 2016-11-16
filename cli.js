#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const program = require('commander');
const utils_1 = require('./utils');
const geocoder = require('.');
delete geocoder.default;
const providers = Object.keys(geocoder);
function customHelp() {
    console.log(`
  Examples:

    $ geocode --provider bing "Ottawa ON"
    $ geocode -p wikidata --nearest [-75.7,45.4] Ottawa
    $ geocode -p google --limit 3 "Ottawa ON"

  Providers:
`);
    providers.map(provider => console.log(`    * ${provider}`));
}
program
    .version(require('./package.json').version)
    .usage('[options] <location>')
    .description('Geocoding results according to the GeoJSON specification')
    .option('-p, --provider [string="bing"]', 'Geocoding Provider')
    .option('--limit [number]', 'Limit the results', value => Number(value))
    .option('--nearest [LngLat]', 'Nearest result from a given LngLat', value => JSON.parse(value))
    .option('--places [Array<string>]', 'Filter by places=*', value => JSON.parse(value))
    .option('--radius [number]', 'Maximum radius distance (in kilometers) of nearest results', value => Number(value))
    .on('--help', customHelp)
    .parse(process.argv);
const cli = program;
// Handle Location
let location;
if (cli.args[0]) {
    location = cli.args[0];
}
else {
    utils_1.error('<location> is required');
}
// Handle Providers
let provider = cli.provider || 'bing';
provider = provider.toLowerCase();
if (providers.indexOf(provider) === -1) {
    utils_1.error(`--provider is invalid`);
}
// Handle Options
/**
 * options
 */
// Geocoder
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const geojson = yield geocoder[provider](location, cli);
        console.log(JSON.stringify(geojson, null, 4));
    });
}
main();
//# sourceMappingURL=cli.js.map