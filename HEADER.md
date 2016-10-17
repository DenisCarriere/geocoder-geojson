[![Build Status](https://travis-ci.org/DenisCarriere/geocoder-geojson.svg?branch=master)](https://travis-ci.org/DenisCarriere/geocoder-geojson)
[![Coverage Status](https://coveralls.io/repos/github/DenisCarriere/geocoder-geojson/badge.svg?branch=master)](https://coveralls.io/github/DenisCarriere/geocoder-geojson?branch=master)
[![npm version](https://badge.fury.io/js/geocoder-geojson.svg)](https://badge.fury.io/js/geocoder-geojson)
[![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/DenisCarriere/geocoder-geojson/master/LICENSE)

# [Geocoder GeoJSON](https://www.npmjs.com/package/geocoder-geojson)

Geocoding results in standard GeoJSON geographic data structures.

## Install

```bash
$ npm install --save geocoder-geojson
```

## Quickstart

```javascript
import * as geocoder from 'geocoder-geojson'

geocoder.google('Ottawa, Canada')
  .then(results => results.features[0])
/*
{ type: 'Feature',
  properties:
   { location_type: 'ROOFTOP',
     formatted_address: '150 Elgin St, Ottawa, ON K2P 1L4, Canada',
     place_id: 'ChIJC5ZgQ6oFzkwRE0RurHZ6uFQ',
     types: [ 'street_address' ],
     confidence: 10,
     street_number: '150',
     route: 'Elgin St',
     neighborhood: 'Byward Market - Parliament Hill',
     locality: 'Ottawa',
     administrative_area_level_2: 'Ottawa Division',
     administrative_area_level_1: 'ON',
     country: 'CA',
     postal_code: 'K2P 1L4',
     'addr:housenumber': '150',
     'addr:street': 'Elgin Street',
     'addr:postcode': 'K2P 1L4' },
  geometry: { type: 'Point', coordinates: [ -75.6927819, 45.4204693 ] },
  bbox:
   [ -75.6941308802915,
     45.4191203197085,
     -75.69143291970849,
     45.4218182802915 ] }
*/
```

## Features

| Name               | Coverage    | Restrictions                 |
|--------------------|:------------|:-----------------------------|
| Google             | Global      | API Key - RateLimit 2500/day |
| GoogleReverse      | Global      | API Key - RateLimit 2500/day |
