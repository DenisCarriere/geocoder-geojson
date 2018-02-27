# [Geocoder GeoJSON](https://www.npmjs.com/package/geocoder-geojson)

[![Build Status](https://travis-ci.org/DenisCarriere/geocoder-geojson.svg?branch=master)](https://travis-ci.org/DenisCarriere/geocoder-geojson)
[![Circle CI](https://circleci.com/gh/DenisCarriere/geocoder-geojson.svg?style=svg)](https://circleci.com/gh/DenisCarriere/geocoder-geojson)
[![Coverage Status](https://coveralls.io/repos/github/DenisCarriere/geocoder-geojson/badge.svg?branch=master)](https://coveralls.io/github/DenisCarriere/geocoder-geojson?branch=master)
[![npm version](https://badge.fury.io/js/geocoder-geojson.svg)](https://badge.fury.io/js/geocoder-geojson)
[![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/DenisCarriere/geocoder-geojson/master/LICENSE)

Geocoding results according to the [GeoJSON specification](http://geojson.org/geojson-spec.html).

## Install

```bash
$ npm install --save geocoder-geojson
```

Install globaly to access `geocode` via your command prompt.

```bash
$ npm install -g geocoder-geojson
$ geocode --version
$ geocode --help
```

## Quickstart

```javascript
import geocoder from 'geocoder-geojson'

geocoder.google('Ottawa, ON')
  .then(geojson => console.log(geojson))
```

## Supports

-   [Webpack](https://webpack.js.org/)
-   [Browserify](http://browserify.org/)
-   [ES6 (ES2015)](https://babeljs.io/learn-es2015/)
-   [NodeJS 6 & 7](https://nodejs.org/en/)

## Features

| Name                            | Coverage | Restrictions                        |
| ------------------------------- | :------- | :---------------------------------- |
| [google](#google)               | Global   | Free & API Key - RateLimit 2500/day |
| [googleReverse](#googlereverse) | Global   | Free & API Key - RateLimit 2500/day |
| [mapbox](#mapbox)               | Global   | API Key                             |
| [mapboxReverse](#mapboxreverse) | Global   | API Key                             |
| [bing](#bing)                   | Global   | API Key                             |
| [wikidata](#wikidata)           | Global   | Free                                |

## CLI

```bash
$ geocode --provider bing "Ottawa ON"
$ geocode -p wikidata --nearest [-75.7,45.4] Ottawa
$ geocode -p google --limit 3 "Ottawa ON"
```

Using `jq` to filter JSON data

```bash
$ geocode -p wikidata --nearest [-75.7,45.4] Ottawa | jq .features[0].id
"Q1930"
```

## Roadmap

-   Implement all geocoder providers from [`Python Geocoder`](https://github.com/DenisCarriere/geocoder)

## API

### mapbox

Mapbox Provider

<https://www.mapbox.com/api-documentation/#geocoding>

**Parameters**

-   `address` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Location for your search
-   `options` **\[MapboxOptions]** Mapbox Options
    -   `options.access_token` **\[[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)]** Access token or environment variable `MAPBOX_ACCESS_TOKEN`
    -   `options.mode` **\[[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)]** Mode mapbox.places or mapbox.places-permanent (optional, default `'mapbox.places'`)
    -   `options.country` **\[[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)]** ISO 3166 alpha 2 country codes, separated by commas
    -   `options.proximity` **\[LngLat]** Location around which to bias results, given as longitude,latitude
    -   `options.types` **\[[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)>]** Filter results by one or more type.
    -   `options.autocomplete` **\[[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)]** Whether or not to return autocomplete results. (optional, default `true`)
    -   `options.bbox` **\[BBox]** Bounding box within which to limit results, given as minX,minY,maxX,maxY
    -   `options.limit` **\[[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)]** Limit the number of results returned. (optional, default `5`)

**Examples**

```javascript
const geojson = await geocoder.mapbox('Ottawa, ON')
```

Returns **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;Points>** GeoJSON Point FeatureCollection

### mapboxReverse

Mapbox Provider (Reverse)

<https://www.mapbox.com/api-documentation/#geocoding>

**Parameters**

-   `lnglat` **LngLat** Longitude & Latitude [x, y]
-   `options` **\[MapboxOptions]** Mapbox Options
    -   `options.access_token` **\[[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)]** Access token or environment variable `MAPBOX_ACCESS_TOKEN`
    -   `options.mode` **\[[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)]** Mode mapbox.places or mapbox.places-permanent (optional, default `'mapbox.places'`)
    -   `options.country` **\[[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)]** ISO 3166 alpha 2 country codes, separated by commas
    -   `options.proximity` **\[LngLat]** Location around which to bias results, given as longitude,latitude
    -   `options.types` **\[[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)>]** Filter results by one or more type.
    -   `options.autocomplete` **\[[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)]** Whether or not to return autocomplete results. (optional, default `true`)
    -   `options.bbox` **\[BBox]** Bounding box within which to limit results, given as minX,minY,maxX,maxY
    -   `options.limit` **\[[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)]** Limit the number of results returned. (optional, default `1`)

**Examples**

```javascript
const geojson = await geocoder.mapbox('Ottawa, ON')
```

Returns **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;Points>** GeoJSON Point FeatureCollection

### google

Google Provider

<https://developers.google.com/maps/documentation/geocoding>

**Parameters**

-   `address` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Location for your search
-   `options` **\[GoogleOptions]** Google Options
    -   `options.key` **\[[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)]** API key
    -   `options.language` **\[[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)]** The language in which to return results (optional, default `en`)
    -   `options.short` **\[[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)]** Address components have long or short results (optional, default `false`)

**Examples**

```javascript
const geojson = await geocoder.google('Ottawa, ON')
```

Returns **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;Points>** GeoJSON Point FeatureCollection

### googleReverse

Google Provider (Reverse)

<https://developers.google.com/maps/documentation/geocoding>

**Parameters**

-   `lnglat` **LngLat** Longitude & Latitude [x, y]
-   `options` **\[GoogleOptions]** Google Options
    -   `options.key` **\[[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)]** API key
    -   `options.language` **\[[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)]** The language in which to return results (optional, default `en`)
    -   `options.short` **\[[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)]** Address components have long or short results (optional, default `false`)

**Examples**

```javascript
const geojson = await geocoder.googleReverse([-75.1, 45.1])
```

Returns **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;Points>** GeoJSON Point FeatureCollection

### bing

Bing Provider

<https://msdn.microsoft.com/en-us/library/ff701714.aspx>

**Parameters**

-   `address` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Location for your search
-   `options` **\[BingOptions]** Bing Options
    -   `options.key` **\[[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)]** API key or environment variable `BING_API_KEY`
    -   `options.maxResults` **\[[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)]** Specifies the maximum number of locations to return in the response.

**Examples**

```javascript
const geojson = await geocoder.bing('Ottawa, ON')
```

Returns **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;Points>** GeoJSON Point FeatureCollection

### wikidata

Wikidata Provider

<https://query.wikidata.org/>

**Parameters**

-   `address` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Location for your search
-   `options` **\[Options]** Wikidata Options
    -   `options.nearest` **\[LngLat]** Nearest location from a given LngLat
    -   `options.radius` **\[[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)]** Maximum radius from nearest LngLat
    -   `options.languages` **\[[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)>]** Exact match on a list of languages
    -   `options.subclasses` **\[[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)>]** Filter results by Wikidata subclasses

**Examples**

```javascript
const geojson = await geocoder.wikidata('Ottawa')
```

Returns **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;Points>** GeoJSON Point FeatureCollection

### request

Generic GET function to normalize all of the requests

**Parameters**

-   `url` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** URL
-   `geojsonParser` **[function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** Customized function to generate a GeoJSON Point FeatureCollection
-   `params` **\[[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)](default {})** Query String
-   `options` **\[[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)](default utils.Options)** Options used for HTTP request & GeoJSON Parser function

Returns **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;Points>** Results in GeoJSON FeatureCollection Points
