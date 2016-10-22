
# Changelog

## 1.3.0 - 2016-10-22

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
