[![Build Status](https://travis-ci.org/DenisCarriere/geocoder-geojson.svg?branch=master)](https://travis-ci.org/DenisCarriere/geocoder-geojson)
[![Coverage Status](https://coveralls.io/repos/github/DenisCarriere/geocoder-geojson/badge.svg?branch=master)](https://coveralls.io/github/DenisCarriere/geocoder-geojson?branch=master)
[![npm version](https://badge.fury.io/js/geocoder-geojson.svg)](https://badge.fury.io/js/geocoder-geojson)

# [Geocoder GeoJSON](https://www.npmjs.com/package/geocoder-geojson)

Geocoding results in standard GeoJSON geographic data structures.

## Install

```bash
$ npm install --save geocoder-geojson
```

## Quickstart

```javascript
import * as geocoder from 'geocoder-geojson'

geocoder.google('New York City')
  .then(geojson => console.log(geojson))
```

## Providers

| Providers       | Coverage    | Restrictions |
|-----------------|:------------|:-------------|
| Google          | Global      | API Key      |
