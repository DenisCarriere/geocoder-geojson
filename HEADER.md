# [Geocoder GeoJSON](https://www.npmjs.com/package/geocoder-geojson)

[![Build Status](https://travis-ci.org/DenisCarriere/geocoder-geojson.svg?branch=master)](https://travis-ci.org/DenisCarriere/geocoder-geojson)
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

### CLI

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

## Features

| Name                              | Coverage    | Restrictions                 |
|-----------------------------------|:------------|:-----------------------------|
| [google](#google)                 | Global      | Free & API Key - RateLimit 2500/day
| [googleReverse](#googlereverse)   | Global      | Free & API Key - RateLimit 2500/day
| [mapbox](#mapbox)                 | Global      | API Key
| [mapboxReverse](#mapboxreverse)   | Global      | API Key
| [bing](#bing)                     | Global      | API Key
| [wikdata](#wikidata)              | Global      | Free

## Future Goals

- Implement all geocoding providers from [`Python Geocoder`](https://github.com/DenisCarriere/geocoder)
