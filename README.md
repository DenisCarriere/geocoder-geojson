# [Geocoder GeoJSON](https://www.npmjs.com/package/geocoder-geojson)

[![Build Status](https://travis-ci.org/DenisCarriere/geocoder-geojson.svg?branch=master)](https://travis-ci.org/DenisCarriere/geocoder-geojson)
[![Coverage Status](https://coveralls.io/repos/github/DenisCarriere/geocoder-geojson/badge.svg?branch=master)](https://coveralls.io/github/DenisCarriere/geocoder-geojson?branch=master)
[![npm version](https://badge.fury.io/js/geocoder-geojson.svg)](https://badge.fury.io/js/geocoder-geojson)
[![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/DenisCarriere/geocoder-geojson/master/LICENSE)

Geocoding results in [GeoJSON format](http://geojson.org/geojson-spec.html).

## Install

```bash
$ npm install --save geocoder-geojson
```

## Quickstart

```javascript
import geocoder from 'geocoder-geojson'

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

## Future Goals

- Replace `request-promise` & `request` dependencies for `fetch`.
- Implement all geocoding providers from [`Python Geocoder`](https://github.com/DenisCarriere/geocoder)
- Add CLI `geocode`
# mapbox

Mapbox Provider

**Parameters**

-   `address` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Location for your search
-   `options` **\[MapboxOptions]** Mapbox Options
    -   `options.access_token` **\[[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)]** Access token or environment variable `MAPBOX_ACCESS_TOKEN`
    -   `options.short` **\[[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)]** Address components have long or short results (optional, default `false`)

**Examples**

```javascript
const geojson = await geocoder.mapbox('Ottawa, ON')
```

Returns **GeoJSON&lt;Point>** GeoJSON Feature Collection

# mapboxReverse

Mapbox Provider (Reverse)

**Parameters**

-   `lnglat` **[LngLat](https://en.wikipedia.org/wiki/World_Geodetic_System)** Longitude & Latitude [x, y]
-   `options` **\[MapboxOptions]** Mapbox Options
    -   `options.access_token` **\[[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)]** Access token or environment variable `MAPBOX_ACCESS_TOKEN`
    -   `options.short` **\[[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)]** Address components have long or short results (optional, default `false`)

**Examples**

```javascript
const geojson = await geocoder.mapbox('Ottawa, ON')
```

Returns **GeoJSON&lt;Point>** GeoJSON Feature Collection

# google

Google Provider

**Parameters**

-   `address` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Location for your search
-   `options` **\[GoogleOptions]** Google Options
    -   `options.language` **\[[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)]** The language in which to return results (optional, default `en`)
    -   `options.short` **\[[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)]** Address components have long or short results (optional, default `false`)

**Examples**

```javascript
const geojson = await geocoder.google('Ottawa, ON')
```

Returns **GeoJSON&lt;Point>** GeoJSON Feature Collection

# googleReverse

Google Provider (Reverse)

**Parameters**

-   `lnglat` **[LngLat](https://en.wikipedia.org/wiki/World_Geodetic_System)** Longitude & Latitude [x, y]
-   `options` **\[GoogleOptions]** Google Options
    -   `options.language` **\[[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)]** The language in which to return results (optional, default `en`)
    -   `options.short` **\[[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)]** Address components have long or short results (optional, default `false`)

**Examples**

```javascript
const geojson = await geocoder.googleReverse([-75.1, 45.1])
```

Returns **GeoJSON&lt;Point>** GeoJSON Feature Collection

# bing

Bing Provider

**Parameters**

-   `address` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Location for your search
-   `options` **\[BingOptions]** Bing Options
    -   `options.key` **\[[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)]** API key or environment variable `BING_API_KEY`

**Examples**

```javascript
const geojson = await geocoder.bing('Ottawa, ON')
```

Returns **GeoJSON&lt;Point>** GeoJSON Feature Collection

# Changelog

## 1.5.0 - 2016-10-26

- Replaced `request` dependency for `isomorphic-fetch`.

## 1.4.0 - 2016-10-22

- Replaced `@turf/turf` for namespaced modules `@turf/helpers`, `@turf/distance` & `@turf/bbox-polygon`
- Removed `lodash` from dependencies
- Change docs to `await` instead of `.then()`
- Add default export
- Update JSDocs options

## 1.2.1 - 2016-10-20

- Remove OSM attribute creation from Google & Bing
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
