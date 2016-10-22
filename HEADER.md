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
  .then(geojson => geojson.features[0])
/*
{ type: 'Feature',
  properties:
   { location_type: 'APPROXIMATE',
     formatted_address: 'Ottawa, ON, Canada',
     place_id: 'ChIJrxNRX7IFzkwR7RXdMeFRaoo',
     types: [ 'locality', 'political' ],
     confidence: 1,
     locality: 'Ottawa',
     administrative_area_level_2: 'Ottawa Division',
     administrative_area_level_1: 'Ontario',
     country: 'Canada',
  geometry:
   { type: 'Point',
     coordinates: [ -75.69719309999999, 45.4215296 ] },
  bbox: [ -76.3539158, 44.9627331, -75.2465979, 45.5375801 ] }
*/
```

## Features

| Name                              | Coverage    | Restrictions                 |
|-----------------------------------|:------------|:-----------------------------|
| [google](#google)                 | Global      | API Key - RateLimit 2500/day
| [googleReverse](#googlereverse)   | Global      | API Key - RateLimit 2500/day
| [mapbox](#mapbox)                 | Global      | API Key
| [mapboxReverse](#mapboxreverse)   | Global      | API Key
| [bing](#bing)                     | Global      | API Key
