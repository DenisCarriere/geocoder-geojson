"use strict";
const turf = require('@turf/helpers');
const utils = require('../utils');
const wikidataCodes = require('./wikidata/codes.json');
const wikidataLanguages = require('./wikidata/languages.json');
exports.Options = {
    subclasses: ['Q486972'],
    languages: ['en', 'fr', 'es', 'de', 'it', 'ru'],
    radius: 15,
};
function createQuery(address, options) {
    // Options
    const [lng, lat] = options.nearest;
    const radius = options.radius || exports.Options.radius;
    const subclasses = options.subclasses || exports.Options.subclasses;
    const languages = options.languages || exports.Options.languages;
    // Validate languages
    languages.map(language => {
        if (wikidataLanguages.indexOf(language) === -1) {
            utils.error(`wikidata language code [${language}] is invalid`);
        }
    });
    // Convert Arrays into Strings
    const subclassesString = subclasses.map(code => {
        code = wikidataCodes[code] || code;
        return `wd:${code.replace('wd:', '')}`;
    }).join(', ');
    // Build SPARQL Query
    let query = `SELECT DISTINCT ?place ?location ?distance ?placeDescription `;
    query += languages.map(language => `?name_${language}`).join(' ');
    query += ` WHERE { 
  # Search Instance of & Subclasses
  ?place wdt:P31/wdt:P279* ?subclass
  FILTER (?subclass in (${subclassesString}))
  `;
    if (options.nearest) {
        query += `
  # Search by Nearest
  SERVICE wikibase:around { 
    ?place wdt:P625 ?location . 
    bd:serviceParam wikibase:center "Point(${lng} ${lat})"^^geo:wktLiteral .
    bd:serviceParam wikibase:radius "${radius}" . 
    bd:serviceParam wikibase:distance ?distance .
  }
    `;
    }
    query += `\n  # Filter by Exact Name\n`;
    languages.map(language => {
        query += `  OPTIONAL {?place rdfs:label ?name_${language} FILTER (lang(?name_${language}) = "${language}") . }\n`;
    });
    query += `\n  FILTER (`;
    query += languages.map(language => `regex(?name_${language}, "^${address}$")`).join(' || ');
    query += `) .\n`;
    // Descriptions
    query += `
  # Get Descriptions
  SERVICE wikibase:label {
    bd:serviceParam wikibase:language "${languages.join(',')}"
  }

} ORDER BY ASC(?dist)`;
    return query;
}
exports.createQuery = createQuery;
/**
 * Convert Wikidata SPARQL results into GeoJSON
 */
function toGeoJSON(json, options) {
    const languages = options.languages || exports.Options.languages;
    const collection = turf.featureCollection([]);
    if (json.results !== undefined) {
        if (json.results.bindings !== undefined) {
            json.results.bindings.map(result => {
                // Standard Wikidata tags
                const id = result.place.value.match(/entity\/(.+)/)[1];
                const [lng, lat] = result.location.value.match(/\(([\-\.\d]+) ([\-\.\d]+)\)/).slice(1, 3).map(n => Number(n));
                const distance = Number(result.distance.value);
                const properties = {
                    id,
                    distance,
                };
                if (result.placeDescription) {
                    properties.description = result.placeDescription.value;
                }
                // Parse languages
                languages.map(language => {
                    const match = result[`name_${language}`];
                    if (match !== undefined) {
                        properties[`name:${language}`] = match.value;
                    }
                });
                // Create Point
                const point = turf.point([lng, lat], properties);
                point.id = id;
                // Add to GeoJSON Feature Collection
                collection.features.push(point);
            });
        }
    }
    return collection;
}
exports.toGeoJSON = toGeoJSON;
//# sourceMappingURL=wikidata.js.map