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
# mapbox

Mapbox Provider

**Parameters**

-   `address` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Location for your search
-   `options` **\[[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)](default mapbox_1.MapboxOptions)** Mapbox specific options
    -   `options.access_token` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Mapbox developer access token
    -   `options.short` **\[[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)]** Mapbox address components have long or short results (optional, default `false`)

**Examples**

```javascript
geocoder.mapbox('Ottawa, ON')
  .then(results => results.features)
```

Returns **GeoJSON&lt;Point>** GeoJSON Feature Collection

# mapboxReverse

Mapbox Provider (Reverse)

**Parameters**

-   `lnglat` **[LngLat](https://en.wikipedia.org/wiki/World_Geodetic_System)** Longitude & Latitude [x, y]
-   `options` **\[[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)](default mapbox_1.MapboxOptions)** Mapbox specific options
    -   `options.access_token` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Mapbox developer access token
    -   `options.short` **\[[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)]** Mapbox address components have long or short results (optional, default `false`)

**Examples**

```javascript
geocoder.mapbox('Ottawa, ON')
  .then(results => results.features)
```

Returns **GeoJSON&lt;Point>** GeoJSON Feature Collection

# google

Google Provider

**Parameters**

-   `address` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Location for your search
-   `options` **\[[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)](default google_1.GoogleOptions)** Google specific options
    -   `options.language` **\[[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)]** The language in which to return results. (optional, default `en`)
    -   `options.short` **\[[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)]** Google address components have long or short results (optional, default `false`)

**Examples**

```javascript
geocoder.google('Ottawa, ON')
  .then(results => results.features)
```

Returns **GeoJSON&lt;Point>** GeoJSON Feature Collection

# googleReverse

Google Provider (Reverse)

**Parameters**

-   `lnglat` **[LngLat](https://en.wikipedia.org/wiki/World_Geodetic_System)** Longitude & Latitude [x, y]
-   `options` **\[[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)](default google_1.GoogleOptions)** Google specific options
    -   `options.language` **\[[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)]** The language in which to return results. (optional, default `en`)
    -   `options.short` **\[[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)]** Google address components have long or short results (optional, default `false`)

**Examples**

```javascript
geocoder.googleReverse([-75.1, 45.1])
  .then(results => results.features)
```

Returns **GeoJSON&lt;Point>** GeoJSON Feature Collection

# bing

Bing Provider

**Parameters**

-   `address` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Location for your search
-   `options` **\[[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)](default bing_1.BingOptions)** Bing specific options

**Examples**

```javascript
geocoder.bing('Ottawa, ON')
  .then(results => results.features)
```

Returns **GeoJSON&lt;Point>** GeoJSON Feature Collection

# get

Generic GET function to normalize all of the requests

**Parameters**

-   `url` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** URL
-   `params` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** Query String
-   `geojsonParser` **[function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** Customized function to generate a GeoJSON Point FeatureCollection
-   `options` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** Options used for both request & geojsonParser

Returns **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;GeoJSON.FeatureCollection&lt;GeoJSON.Point>>** GeoJSON Results

# Changelog

## 1.2.0 - 2016-10-17

- Validatation of LngLat - Common mistake is rerversing the coordinates to LatLng
- Added Mapbox & Mapbox Reverse providers
- Added generic GET function to normalize all of the requests
```javascript
// Environment Variable MAPBOX_API_KEY
geocoder.mapbox('Ottawa, ON')
geocoder.mapboxReverse([-75.1, 45.1])
```

## 1.1.0 - 2016-10-17

- Added Google Reverse method
- Changed default Google option `short=false`
```javascript
geocoder.googleReverse([-75.1, 45.1])
```

## 1.0.0 - 2016-10-14

First Stable release was created

Features:

- `google` provider
- `confidenceScore`
- `replaceStreetSuffix`
