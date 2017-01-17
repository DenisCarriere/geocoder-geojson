
# Changelog

## 1.9.0 - 2016-12-3

-   Replace all test cases with `Jest` - Major refactoring
-   Added more Mapbox Options
-   Added ISO_3166 & ISO_639 codes to `utils`

## 1.8.0 - 2016-11-16

-   Implemented Wikidata SPARQL

## 1.7.0 - 2016-11-11

-   Add Command Line Interface (CLI)
-   Add Wikidata provider
-   Add `--nearest` to Wikidata
-   Add wikidata `places` precision
-   Add `places` to filter out `places=*` when using `nearest`
-   Seperate tests per providers `test/test.<provider>.ts`

## 1.6.0 - 2016-11-3

-   Replace `isomorphic-fetch` & `qs` with `axios` (less headaches)
-   Deprecate `replaceStreetSuffix` function

## 1.5.2 - 2016-10-26

-   Add `@types` to dependencies
-   Replaced `request` dependency for `isomorphic-fetch`.

## 1.4.0 - 2016-10-22

-   Replaced `@turf/turf` for namespaced modules `@turf/helpers`, `@turf/distance` & `@turf/bbox-polygon`
-   Removed `lodash` from dependencies
-   Change docs to `await` instead of `.then()`
-   Add default export
-   Update JSDocs options

## 1.2.1 - 2016-10-20

-   Remove OSM attribute creation from Google & Bing
-   Validatation of LngLat - Common mistake is rerversing the coordinates to LatLng
-   Added Mapbox & Mapbox Reverse providers
-   Added generic GET function to normalize all of the requests

```javascript
// Environment Variable MAPBOX_API_KEY
geocoder.mapbox('Ottawa, ON')
geocoder.mapboxReverse([-75.1, 45.1])
```

## 1.1.0 - 2016-10-17

-   Added Google Reverse method
-   Changed default Google option `short=false`

```javascript
geocoder.googleReverse([-75.1, 45.1])
```

## 1.0.0 - 2016-10-14

First Stable release was created

Features:

-   `google` provider
-   `confidenceScore`
-   `replaceStreetSuffix`
