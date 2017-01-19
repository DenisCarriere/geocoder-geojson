/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 49);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(10);

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  typeof document.createElement -> undefined
 */
function isStandardBrowserEnv() {
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined' &&
    typeof document.createElement === 'function'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object' && !isArray(obj)) {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = merge(result[key], val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim
};


/***/ }),
/* 1 */
/***/ (function(module, exports) {

/**
 * Wraps a GeoJSON {@link Geometry} in a GeoJSON {@link Feature}.
 *
 * @name feature
 * @param {Geometry} geometry input geometry
 * @param {Object} properties properties
 * @returns {FeatureCollection} a FeatureCollection of input features
 * @example
 * var geometry = {
 *      "type": "Point",
 *      "coordinates": [
 *        67.5,
 *        32.84267363195431
 *      ]
 *    }
 *
 * var feature = turf.feature(geometry);
 *
 * //=feature
 */
function feature(geometry, properties) {
    return {
        type: 'Feature',
        properties: properties || {},
        geometry: geometry
    };
}

module.exports.feature = feature;

/**
 * Takes coordinates and properties (optional) and returns a new {@link Point} feature.
 *
 * @name point
 * @param {Array<number>} coordinates longitude, latitude position (each in decimal degrees)
 * @param {Object=} properties an Object that is used as the {@link Feature}'s
 * properties
 * @returns {Feature<Point>} a Point feature
 * @example
 * var pt1 = turf.point([-75.343, 39.984]);
 *
 * //=pt1
 */
module.exports.point = function (coordinates, properties) {
    if (!Array.isArray(coordinates)) throw new Error('Coordinates must be an array');
    if (coordinates.length < 2) throw new Error('Coordinates must be at least 2 numbers long');
    return feature({
        type: 'Point',
        coordinates: coordinates.slice()
    }, properties);
};

/**
 * Takes an array of LinearRings and optionally an {@link Object} with properties and returns a {@link Polygon} feature.
 *
 * @name polygon
 * @param {Array<Array<Array<number>>>} coordinates an array of LinearRings
 * @param {Object=} properties a properties object
 * @returns {Feature<Polygon>} a Polygon feature
 * @throws {Error} throw an error if a LinearRing of the polygon has too few positions
 * or if a LinearRing of the Polygon does not have matching Positions at the
 * beginning & end.
 * @example
 * var polygon = turf.polygon([[
 *  [-2.275543, 53.464547],
 *  [-2.275543, 53.489271],
 *  [-2.215118, 53.489271],
 *  [-2.215118, 53.464547],
 *  [-2.275543, 53.464547]
 * ]], { name: 'poly1', population: 400});
 *
 * //=polygon
 */
module.exports.polygon = function (coordinates, properties) {

    if (!coordinates) throw new Error('No coordinates passed');

    for (var i = 0; i < coordinates.length; i++) {
        var ring = coordinates[i];
        if (ring.length < 4) {
            throw new Error('Each LinearRing of a Polygon must have 4 or more Positions.');
        }
        for (var j = 0; j < ring[ring.length - 1].length; j++) {
            if (ring[ring.length - 1][j] !== ring[0][j]) {
                throw new Error('First and last Position are not equivalent.');
            }
        }
    }

    return feature({
        type: 'Polygon',
        coordinates: coordinates
    }, properties);
};

/**
 * Creates a {@link LineString} based on a
 * coordinate array. Properties can be added optionally.
 *
 * @name lineString
 * @param {Array<Array<number>>} coordinates an array of Positions
 * @param {Object=} properties an Object of key-value pairs to add as properties
 * @returns {Feature<LineString>} a LineString feature
 * @throws {Error} if no coordinates are passed
 * @example
 * var linestring1 = turf.lineString([
 *	[-21.964416, 64.148203],
 *	[-21.956176, 64.141316],
 *	[-21.93901, 64.135924],
 *	[-21.927337, 64.136673]
 * ]);
 * var linestring2 = turf.lineString([
 *	[-21.929054, 64.127985],
 *	[-21.912918, 64.134726],
 *	[-21.916007, 64.141016],
 * 	[-21.930084, 64.14446]
 * ], {name: 'line 1', distance: 145});
 *
 * //=linestring1
 *
 * //=linestring2
 */
module.exports.lineString = function (coordinates, properties) {
    if (!coordinates) {
        throw new Error('No coordinates passed');
    }
    return feature({
        type: 'LineString',
        coordinates: coordinates
    }, properties);
};

/**
 * Takes one or more {@link Feature|Features} and creates a {@link FeatureCollection}.
 *
 * @name featureCollection
 * @param {Feature[]} features input features
 * @returns {FeatureCollection} a FeatureCollection of input features
 * @example
 * var features = [
 *  turf.point([-75.343, 39.984], {name: 'Location A'}),
 *  turf.point([-75.833, 39.284], {name: 'Location B'}),
 *  turf.point([-75.534, 39.123], {name: 'Location C'})
 * ];
 *
 * var fc = turf.featureCollection(features);
 *
 * //=fc
 */
module.exports.featureCollection = function (features) {
    return {
        type: 'FeatureCollection',
        features: features
    };
};

/**
 * Creates a {@link Feature<MultiLineString>} based on a
 * coordinate array. Properties can be added optionally.
 *
 * @name multiLineString
 * @param {Array<Array<Array<number>>>} coordinates an array of LineStrings
 * @param {Object=} properties an Object of key-value pairs to add as properties
 * @returns {Feature<MultiLineString>} a MultiLineString feature
 * @throws {Error} if no coordinates are passed
 * @example
 * var multiLine = turf.multiLineString([[[0,0],[10,10]]]);
 *
 * //=multiLine
 *
 */
module.exports.multiLineString = function (coordinates, properties) {
    if (!coordinates) {
        throw new Error('No coordinates passed');
    }
    return feature({
        type: 'MultiLineString',
        coordinates: coordinates
    }, properties);
};

/**
 * Creates a {@link Feature<MultiPoint>} based on a
 * coordinate array. Properties can be added optionally.
 *
 * @name multiPoint
 * @param {Array<Array<number>>} coordinates an array of Positions
 * @param {Object=} properties an Object of key-value pairs to add as properties
 * @returns {Feature<MultiPoint>} a MultiPoint feature
 * @throws {Error} if no coordinates are passed
 * @example
 * var multiPt = turf.multiPoint([[0,0],[10,10]]);
 *
 * //=multiPt
 *
 */
module.exports.multiPoint = function (coordinates, properties) {
    if (!coordinates) {
        throw new Error('No coordinates passed');
    }
    return feature({
        type: 'MultiPoint',
        coordinates: coordinates
    }, properties);
};


/**
 * Creates a {@link Feature<MultiPolygon>} based on a
 * coordinate array. Properties can be added optionally.
 *
 * @name multiPolygon
 * @param {Array<Array<Array<Array<number>>>>} coordinates an array of Polygons
 * @param {Object=} properties an Object of key-value pairs to add as properties
 * @returns {Feature<MultiPolygon>} a multipolygon feature
 * @throws {Error} if no coordinates are passed
 * @example
 * var multiPoly = turf.multiPolygon([[[[0,0],[0,10],[10,10],[10,0],[0,0]]]);
 *
 * //=multiPoly
 *
 */
module.exports.multiPolygon = function (coordinates, properties) {
    if (!coordinates) {
        throw new Error('No coordinates passed');
    }
    return feature({
        type: 'MultiPolygon',
        coordinates: coordinates
    }, properties);
};

/**
 * Creates a {@link Feature<GeometryCollection>} based on a
 * coordinate array. Properties can be added optionally.
 *
 * @name geometryCollection
 * @param {Array<{Geometry}>} geometries an array of GeoJSON Geometries
 * @param {Object=} properties an Object of key-value pairs to add as properties
 * @returns {Feature<GeometryCollection>} a GeoJSON GeometryCollection Feature
 * @example
 * var pt = {
 *     "type": "Point",
 *       "coordinates": [100, 0]
 *     };
 * var line = {
 *     "type": "LineString",
 *     "coordinates": [ [101, 0], [102, 1] ]
 *   };
 * var collection = turf.geometryCollection([pt, line]);
 *
 * //=collection
 */
module.exports.geometryCollection = function (geometries, properties) {
    return feature({
        type: 'GeometryCollection',
        geometries: geometries
    }, properties);
};

var factors = {
    miles: 3960,
    nauticalmiles: 3441.145,
    degrees: 57.2957795,
    radians: 1,
    inches: 250905600,
    yards: 6969600,
    meters: 6373000,
    metres: 6373000,
    kilometers: 6373,
    kilometres: 6373,
    feet: 20908792.65
};

/*
 * Convert a distance measurement from radians to a more friendly unit.
 *
 * @name radiansToDistance
 * @param {number} distance in radians across the sphere
 * @param {string} [units=kilometers] can be degrees, radians, miles, or kilometers
 * inches, yards, metres, meters, kilometres, kilometers.
 * @returns {number} distance
 */
module.exports.radiansToDistance = function (radians, units) {
    var factor = factors[units || 'kilometers'];
    if (factor === undefined) {
        throw new Error('Invalid unit');
    }
    return radians * factor;
};

/*
 * Convert a distance measurement from a real-world unit into radians
 *
 * @name distanceToRadians
 * @param {number} distance in real units
 * @param {string} [units=kilometers] can be degrees, radians, miles, or kilometers
 * inches, yards, metres, meters, kilometres, kilometers.
 * @returns {number} radians
 */
module.exports.distanceToRadians = function (distance, units) {
    var factor = factors[units || 'kilometers'];
    if (factor === undefined) {
        throw new Error('Invalid unit');
    }
    return distance / factor;
};

/*
 * Convert a distance measurement from a real-world unit into degrees
 *
 * @name distanceToRadians
 * @param {number} distance in real units
 * @param {string} [units=kilometers] can be degrees, radians, miles, or kilometers
 * inches, yards, metres, meters, kilometres, kilometers.
 * @returns {number} degrees
 */
module.exports.distanceToDegrees = function (distance, units) {
    var factor = factors[units || 'kilometers'];
    if (factor === undefined) {
        throw new Error('Invalid unit');
    }
    return (distance / factor) * 57.2958;
};


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var utils = __webpack_require__(47);
module.exports = utils;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(0);
var normalizeHeaderName = __webpack_require__(31);

var PROTECTION_PREFIX = /^\)\]\}',?\n/;
var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(6);
  } else if (typeof process !== 'undefined') {
    // For node use HTTP adapter
    adapter = __webpack_require__(6);
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      data = data.replace(PROTECTION_PREFIX, '');
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMehtodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = function () {
	return /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-PRZcf-nqry=><]/g;
};


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(0);
var settle = __webpack_require__(23);
var buildURL = __webpack_require__(26);
var parseHeaders = __webpack_require__(32);
var isURLSameOrigin = __webpack_require__(30);
var createError = __webpack_require__(9);
var btoa = (typeof window !== 'undefined' && window.btoa && window.btoa.bind(window)) || __webpack_require__(25);

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();
    var loadEvent = 'onreadystatechange';
    var xDomain = false;

    // For IE 8/9 CORS support
    // Only supports POST and GET calls and doesn't returns the response headers.
    // DON'T do this for testing b/c XMLHttpRequest is mocked, not XDomainRequest.
    if (process.env.NODE_ENV !== 'test' &&
        typeof window !== 'undefined' &&
        window.XDomainRequest && !('withCredentials' in request) &&
        !isURLSameOrigin(config.url)) {
      request = new window.XDomainRequest();
      loadEvent = 'onload';
      xDomain = true;
      request.onprogress = function handleProgress() {};
      request.ontimeout = function handleTimeout() {};
    }

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request[loadEvent] = function handleLoad() {
      if (!request || (request.readyState !== 4 && !xDomain)) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        // IE sends 1223 instead of 204 (https://github.com/mzabriskie/axios/issues/201)
        status: request.status === 1223 ? 204 : request.status,
        statusText: request.status === 1223 ? 'No Content' : request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED'));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      var cookies = __webpack_require__(28);

      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ?
          cookies.read(config.xsrfCookieName) :
          undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (config.withCredentials) {
      request.withCredentials = true;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        if (request.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (requestData === undefined) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var enhanceError = __webpack_require__(22);

/**
 * Create an Error with the specified message, config, error code, and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 @ @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, response);
};


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {
var axios_1 = __webpack_require__(16);
var utils = __webpack_require__(2);
var utils_1 = __webpack_require__(2);
var iso3166 = __webpack_require__(45);
var providers_1 = __webpack_require__(41);
/**
 * Mapbox Provider
 *
 * https://www.mapbox.com/api-documentation/#geocoding
 *
 * @param {string} address Location for your search
 * @param {MapboxOptions} [options] Mapbox Options
 * @param {string} [options.access_token] Access token or environment variable `MAPBOX_ACCESS_TOKEN`
 * @param {string} [options.mode='mapbox.places'] Mode mapbox.places or mapbox.places-permanent
 * @param {string} [options.country] ISO 3166 alpha 2 country codes, separated by commas
 * @param {LngLat} [options.proximity] Location around which to bias results, given as longitude,latitude
 * @param {Array<string>} [options.types] Filter results by one or more type.
 * @param {boolean} [options.autocomplete=true] Whether or not to return autocomplete results.
 * @param {BBox} [options.bbox] Bounding box within which to limit results, given as minX,minY,maxX,maxY
 * @param {number} [options.limit=5] Limit the number of results returned.
 * @returns {Promise<Points>} GeoJSON Point FeatureCollection
 * @example
 * const geojson = await geocoder.mapbox('Ottawa, ON')
 */
function mapbox(address, options) {
    if (options === void 0) { options = providers_1.Mapbox.Options; }
    // Define options
    var mode = options.mode || providers_1.Mapbox.Options.mode;
    var access_token = options.access_token || options.key || process.env.MAPBOX_ACCESS_TOKEN;
    var country = options.country;
    var limit = options.limit || providers_1.Mapbox.Options.limit;
    // Validation
    if (!access_token) {
        utils_1.error('[options.access_token] is required');
    }
    if (['mapbox.places', 'mapbox.places-permanent'].indexOf(mode) === -1) {
        utils_1.error('--mode is invalid');
    }
    if (country && iso3166.codes[country] === undefined) {
        utils_1.error('--country is invalid');
    }
    // URL Parameters
    var params = {
        access_token: access_token,
        country: country,
        limit: limit,
    };
    // Request
    var url = "https://api.mapbox.com/geocoding/v5/" + mode + "/" + address + ".json";
    return request(url, providers_1.Mapbox.toGeoJSON, params, options);
}
exports.mapbox = mapbox;
/**
 * Mapbox Provider (Reverse)
 *
 * https://www.mapbox.com/api-documentation/#geocoding
 *
 * @param {LngLat} lnglat Longitude & Latitude [x, y]
 * @param {MapboxOptions} [options] Mapbox Options
 * @param {string} [options.access_token] Access token or environment variable `MAPBOX_ACCESS_TOKEN`
 * @param {string} [options.mode='mapbox.places'] Mode mapbox.places or mapbox.places-permanent
 * @param {string} [options.country] ISO 3166 alpha 2 country codes, separated by commas
 * @param {LngLat} [options.proximity] Location around which to bias results, given as longitude,latitude
 * @param {Array<string>} [options.types] Filter results by one or more type.
 * @param {boolean} [options.autocomplete=true] Whether or not to return autocomplete results.
 * @param {BBox} [options.bbox] Bounding box within which to limit results, given as minX,minY,maxX,maxY
 * @param {number} [options.limit=1] Limit the number of results returned.
 * @returns {Promise<Points>} GeoJSON Point FeatureCollection
 * @example
 * const geojson = await geocoder.mapbox('Ottawa, ON')
 */
function mapboxReverse(lnglat, options) {
    if (options === void 0) { options = providers_1.Mapbox.Options; }
    // Define options
    var mode = options.mode || providers_1.Mapbox.Options.mode;
    var access_token = options.access_token || options.key || process.env.MAPBOX_ACCESS_TOKEN;
    var country = options.country;
    var limit = options.limit || providers_1.Mapbox.Options.limit;
    // Validation
    if (['mapbox.places', 'mapbox.places-permanent'].indexOf(mode) > 0) {
        utils_1.error('--mode is invalid');
    }
    lnglat = utils.validateLngLat(lnglat);
    if (!access_token) {
        utils_1.error('--access_token is required');
    }
    // URL Parameters
    var params = {
        access_token: access_token,
        country: country,
        limit: limit,
    };
    // Request
    var url = "https://api.mapbox.com/geocoding/v5/" + mode + "/" + lnglat.join(',') + ".json";
    return request(url, providers_1.Mapbox.toGeoJSON, params, options);
}
exports.mapboxReverse = mapboxReverse;
/**
 * Google Provider
 *
 * https://developers.google.com/maps/documentation/geocoding
 *
 * @param {string} address Location for your search
 * @param {GoogleOptions} [options] Google Options
 * @param {string} [options.language=en] The language in which to return results
 * @param {boolean} [options.short=false] Address components have long or short results
 * @returns {Promise<Points>} GeoJSON Point FeatureCollection
 * @example
 * const geojson = await geocoder.google('Ottawa, ON')
 */
function google(address, options) {
    if (options === void 0) { options = providers_1.Google.Options; }
    // Define Options
    options.language = options.language || providers_1.Google.Options.language;
    options.sensor = options.sensor || providers_1.Google.Options.sensor;
    options.short = options.short || providers_1.Google.Options.short;
    // URL Parameters
    var params = {
        address: address,
        sensor: options.sensor,
    };
    // Request
    var url = 'https://maps.googleapis.com/maps/api/geocode/json';
    return request(url, providers_1.Google.toGeoJSON, params, options);
}
exports.google = google;
/**
 * Google Provider (Reverse)
 *
 * https://developers.google.com/maps/documentation/geocoding
 *
 * @param {LngLat} lnglat Longitude & Latitude [x, y]
 * @param {GoogleOptions} [options] Google Options
 * @param {string} [options.language=en] The language in which to return results
 * @param {boolean} [options.short=false] Address components have long or short results
 * @returns {Promise<Points>} GeoJSON Point FeatureCollection
 * @example
 * const geojson = await geocoder.googleReverse([-75.1, 45.1])
 */
function googleReverse(lnglat, options) {
    if (options === void 0) { options = providers_1.Google.Options; }
    // Define Options
    options.language = options.language || providers_1.Google.Options.language;
    options.sensor = options.sensor || providers_1.Google.Options.sensor;
    options.short = options.short || providers_1.Google.Options.short;
    var _a = utils.validateLngLat(lnglat), lng = _a[0], lat = _a[1];
    // URL Parameters
    var params = {
        sensor: options.sensor,
        address: [lat, lng].join(','),
    };
    // Request
    var url = 'https://maps.googleapis.com/maps/api/geocode/json';
    return request(url, providers_1.Google.toGeoJSON, params, options);
}
exports.googleReverse = googleReverse;
/**
 * Bing Provider
 *
 * https://msdn.microsoft.com/en-us/library/ff701714.aspx
 *
 * @param {string} address Location for your search
 * @param {BingOptions} [options] Bing Options
 * @param {string} [options.key] API key or environment variable `BING_API_KEY`
 * @param {string} [options.maxResults] Specifies the maximum number of locations to return in the response.
 * @returns {Promise<Points>} GeoJSON Point FeatureCollection
 * @example
 * const geojson = await geocoder.bing('Ottawa, ON')
 */
function bing(address, options) {
    if (options === void 0) { options = providers_1.Bing.Options; }
    // Define Options
    var key = options.key || process.env.BING_API_KEY;
    var maxResults = options.maxResults || options.limit || providers_1.Bing.Options.maxResults;
    // Validation
    if (!key) {
        utils_1.error('--key is required');
    }
    // URL Parameters
    var params = {
        inclnb: 1,
        key: key,
        o: 'json',
        q: address,
        maxResults: maxResults,
    };
    // Request
    var url = 'http://dev.virtualearth.net/REST/v1/Locations';
    return request(url, providers_1.Bing.toGeoJSON, params, options);
}
exports.bing = bing;
/**
 * Wikidata Provider
 *
 * https://query.wikidata.org/
 *
 * @param {string} address Location for your search
 * @param {Options} [options] Wikidata Options
 * @param {LngLat} [options.nearest] Nearest location from a given LngLat
 * @param {number} [options.radius] Maximum radius from nearest LngLat
 * @param {Array<string>} [options.languages] Exact match on a list of languages
 * @param {Array<string>} [options.subclasses] Filter results by Wikidata subclasses
 * @returns {Promise<Points>} GeoJSON Point FeatureCollection
 * @example
 * const geojson = await geocoder.wikidata('Ottawa')
 */
function wikidata(address, options) {
    if (options === void 0) { options = providers_1.Wikidata.Options; }
    // Define Options
    options.subclasses = options.subclasses || providers_1.Wikidata.Options.subclasses;
    options.languages = options.languages || providers_1.Wikidata.Options.languages;
    options.radius = options.radius || providers_1.Wikidata.Options.radius;
    options.sparql = options.sparql || providers_1.Wikidata.Options.sparql;
    // Validation
    if (!options.nearest) {
        utils_1.error('--nearest is required');
    }
    // SPARQL Query
    var query = providers_1.Wikidata.createQuery(address, options);
    // URL Parameters
    var params = {
        query: query,
    };
    // Request
    var url = 'https://query.wikidata.org/bigdata/namespace/wdq/sparql';
    return request(url, providers_1.Wikidata.toGeoJSON, params, options);
}
exports.wikidata = wikidata;
/**
 * Generic GET function to normalize all of the requests
 *
 * @param {string} url URL
 * @param {function} geojsonParser Customized function to generate a GeoJSON Point FeatureCollection
 * @param {Object} params Query String
 * @param {Object} options Options used for HTTP request & GeoJSON Parser function
 * @returns {Promise<Points>} Results in GeoJSON FeatureCollection Points
 */
function request(url, geojsonParser, params, options) {
    if (params === void 0) { params = {}; }
    if (options === void 0) { options = utils.Options; }
    return axios_1.default.get(url, { params: params }).then(function (response) {
        if (options.raw !== undefined) {
            return response.data;
        }
        var geojson = geojsonParser(response.data, options);
        return geojson;
    });
}
exports.request = request;
function get(provider, query, options) {
    if (provider === 'bing') {
        return bing(query, options);
    }
    if (provider === 'google') {
        return google(query, options);
    }
    if (provider === 'mapbox') {
        return mapbox(query, options);
    }
    if (provider === 'wikidata') {
        return wikidata(query, options);
    }
    if (provider === 'googleReverse') {
        return googleReverse(query, options);
    }
    if (provider === 'mapboxReverse') {
        return mapboxReverse(query, options);
    }
}
exports.get = get;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var polygon = __webpack_require__(1).polygon;

/**
 * Takes a bbox and returns an equivalent {@link Polygon|polygon}.
 *
 * @name bboxPolygon
 * @param {Array<number>} bbox extent in [minX, minY, maxX, maxY] order
 * @return {Feature<Polygon>} a Polygon representation of the bounding box
 * @example
 * var bbox = [0, 0, 10, 10];
 *
 * var poly = turf.bboxPolygon(bbox);
 *
 * //=poly
 */

module.exports = function (bbox) {
    var lowLeft = [bbox[0], bbox[1]];
    var topLeft = [bbox[0], bbox[3]];
    var topRight = [bbox[2], bbox[3]];
    var lowRight = [bbox[2], bbox[1]];

    return polygon([[
        lowLeft,
        lowRight,
        topRight,
        topLeft,
        lowLeft
    ]]);
};


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var getCoord = __webpack_require__(14).getCoord;
var radiansToDistance = __webpack_require__(1).radiansToDistance;
//http://en.wikipedia.org/wiki/Haversine_formula
//http://www.movable-type.co.uk/scripts/latlong.html

/**
 * Calculates the distance between two {@link Point|points} in degrees, radians,
 * miles, or kilometers. This uses the
 * [Haversine formula](http://en.wikipedia.org/wiki/Haversine_formula)
 * to account for global curvature.
 *
 * @name distance
 * @param {Feature<Point>} from origin point
 * @param {Feature<Point>} to destination point
 * @param {string} [units=kilometers] can be degrees, radians, miles, or kilometers
 * @return {number} distance between the two points
 * @example
 * var from = {
 *   "type": "Feature",
 *   "properties": {},
 *   "geometry": {
 *     "type": "Point",
 *     "coordinates": [-75.343, 39.984]
 *   }
 * };
 * var to = {
 *   "type": "Feature",
 *   "properties": {},
 *   "geometry": {
 *     "type": "Point",
 *     "coordinates": [-75.534, 39.123]
 *   }
 * };
 * var units = "miles";
 *
 * var points = {
 *   "type": "FeatureCollection",
 *   "features": [from, to]
 * };
 *
 * //=points
 *
 * var distance = turf.distance(from, to, units);
 *
 * //=distance
 */
module.exports = function (from, to, units) {
    var degrees2radians = Math.PI / 180;
    var coordinates1 = getCoord(from);
    var coordinates2 = getCoord(to);
    var dLat = degrees2radians * (coordinates2[1] - coordinates1[1]);
    var dLon = degrees2radians * (coordinates2[0] - coordinates1[0]);
    var lat1 = degrees2radians * coordinates1[1];
    var lat2 = degrees2radians * coordinates2[1];

    var a = Math.pow(Math.sin(dLat / 2), 2) +
          Math.pow(Math.sin(dLon / 2), 2) * Math.cos(lat1) * Math.cos(lat2);

    return radiansToDistance(2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)), units);
};


/***/ }),
/* 14 */
/***/ (function(module, exports) {

/**
 * Unwrap a coordinate from a Feature with a Point geometry, a Point
 * geometry, or a single coordinate.
 *
 * @param {*} obj any value
 * @returns {Array<number>} a coordinate
 */
function getCoord(obj) {
    if (Array.isArray(obj) &&
        typeof obj[0] === 'number' &&
        typeof obj[1] === 'number') {
        return obj;
    } else if (obj) {
        if (obj.type === 'Feature' &&
            obj.geometry &&
            obj.geometry.type === 'Point' &&
            Array.isArray(obj.geometry.coordinates)) {
            return obj.geometry.coordinates;
        } else if (obj.type === 'Point' &&
            Array.isArray(obj.coordinates)) {
            return obj.coordinates;
        }
    }
    throw new Error('A coordinate, feature, or point geometry is required');
}

/**
 * Enforce expectations about types of GeoJSON objects for Turf.
 *
 * @alias geojsonType
 * @param {GeoJSON} value any GeoJSON object
 * @param {string} type expected GeoJSON type
 * @param {string} name name of calling function
 * @throws {Error} if value is not the expected type.
 */
function geojsonType(value, type, name) {
    if (!type || !name) throw new Error('type and name required');

    if (!value || value.type !== type) {
        throw new Error('Invalid input to ' + name + ': must be a ' + type + ', given ' + value.type);
    }
}

/**
 * Enforce expectations about types of {@link Feature} inputs for Turf.
 * Internally this uses {@link geojsonType} to judge geometry types.
 *
 * @alias featureOf
 * @param {Feature} feature a feature with an expected geometry type
 * @param {string} type expected GeoJSON type
 * @param {string} name name of calling function
 * @throws {Error} error if value is not the expected type.
 */
function featureOf(feature, type, name) {
    if (!name) throw new Error('.featureOf() requires a name');
    if (!feature || feature.type !== 'Feature' || !feature.geometry) {
        throw new Error('Invalid input to ' + name + ', Feature with geometry required');
    }
    if (!feature.geometry || feature.geometry.type !== type) {
        throw new Error('Invalid input to ' + name + ': must be a ' + type + ', given ' + feature.geometry.type);
    }
}

/**
 * Enforce expectations about types of {@link FeatureCollection} inputs for Turf.
 * Internally this uses {@link geojsonType} to judge geometry types.
 *
 * @alias collectionOf
 * @param {FeatureCollection} featurecollection a featurecollection for which features will be judged
 * @param {string} type expected GeoJSON type
 * @param {string} name name of calling function
 * @throws {Error} if value is not the expected type.
 */
function collectionOf(featurecollection, type, name) {
    if (!name) throw new Error('.collectionOf() requires a name');
    if (!featurecollection || featurecollection.type !== 'FeatureCollection') {
        throw new Error('Invalid input to ' + name + ', FeatureCollection required');
    }
    for (var i = 0; i < featurecollection.features.length; i++) {
        var feature = featurecollection.features[i];
        if (!feature || feature.type !== 'Feature' || !feature.geometry) {
            throw new Error('Invalid input to ' + name + ', Feature with geometry required');
        }
        if (!feature.geometry || feature.geometry.type !== type) {
            throw new Error('Invalid input to ' + name + ': must be a ' + type + ', given ' + feature.geometry.type);
        }
    }
}

module.exports.geojsonType = geojsonType;
module.exports.collectionOf = collectionOf;
module.exports.featureOf = featureOf;
module.exports.getCoord = getCoord;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

function assembleStyles () {
	var styles = {
		modifiers: {
			reset: [0, 0],
			bold: [1, 22], // 21 isn't widely supported and 22 does the same thing
			dim: [2, 22],
			italic: [3, 23],
			underline: [4, 24],
			inverse: [7, 27],
			hidden: [8, 28],
			strikethrough: [9, 29]
		},
		colors: {
			black: [30, 39],
			red: [31, 39],
			green: [32, 39],
			yellow: [33, 39],
			blue: [34, 39],
			magenta: [35, 39],
			cyan: [36, 39],
			white: [37, 39],
			gray: [90, 39]
		},
		bgColors: {
			bgBlack: [40, 49],
			bgRed: [41, 49],
			bgGreen: [42, 49],
			bgYellow: [43, 49],
			bgBlue: [44, 49],
			bgMagenta: [45, 49],
			bgCyan: [46, 49],
			bgWhite: [47, 49]
		}
	};

	// fix humans
	styles.colors.grey = styles.colors.gray;

	Object.keys(styles).forEach(function (groupName) {
		var group = styles[groupName];

		Object.keys(group).forEach(function (styleName) {
			var style = group[styleName];

			styles[styleName] = group[styleName] = {
				open: '\u001b[' + style[0] + 'm',
				close: '\u001b[' + style[1] + 'm'
			};
		});

		Object.defineProperty(styles, groupName, {
			value: group,
			enumerable: false
		});
	});

	return styles;
}

Object.defineProperty(module, 'exports', {
	enumerable: true,
	get: assembleStyles
});

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(48)(module)))

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(17);

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);
var bind = __webpack_require__(10);
var Axios = __webpack_require__(19);
var defaults = __webpack_require__(4);

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(utils.merge(defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = __webpack_require__(7);
axios.CancelToken = __webpack_require__(18);
axios.isCancel = __webpack_require__(8);

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(33);

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Cancel = __webpack_require__(7);

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var defaults = __webpack_require__(4);
var utils = __webpack_require__(0);
var InterceptorManager = __webpack_require__(20);
var dispatchRequest = __webpack_require__(21);
var isAbsoluteURL = __webpack_require__(29);
var combineURLs = __webpack_require__(27);

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = utils.merge({
      url: arguments[0]
    }, arguments[1]);
  }

  config = utils.merge(defaults, this.defaults, { method: 'get' }, config);

  // Support baseURL config
  if (config.baseURL && !isAbsoluteURL(config.url)) {
    config.url = combineURLs(config.baseURL, config.url);
  }

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);
var transformData = __webpack_require__(24);
var isCancel = __webpack_require__(8);
var defaults = __webpack_require__(4);

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers || {}
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 @ @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }
  error.response = response;
  return error;
};


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createError = __webpack_require__(9);

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  // Note: status is not exposed by XDomainRequest
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response
    ));
  }
};


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// btoa polyfill for IE<10 courtesy https://github.com/davidchambers/Base64.js

var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

function E() {
  this.message = 'String contains an invalid character';
}
E.prototype = new Error;
E.prototype.code = 5;
E.prototype.name = 'InvalidCharacterError';

function btoa(input) {
  var str = String(input);
  var output = '';
  for (
    // initialize result and counter
    var block, charCode, idx = 0, map = chars;
    // if the next str index does not exist:
    //   change the mapping table to "="
    //   check if d has no fractional digits
    str.charAt(idx | 0) || (map = '=', idx % 1);
    // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
    output += map.charAt(63 & block >> 8 - idx % 1 * 8)
  ) {
    charCode = str.charCodeAt(idx += 3 / 4);
    if (charCode > 0xFF) {
      throw new E();
    }
    block = block << 8 | charCode;
  }
  return output;
}

module.exports = btoa;


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

function encode(val) {
  return encodeURIComponent(val).
    replace(/%40/gi, '@').
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      }

      if (!utils.isArray(val)) {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '');
};


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
  (function standardBrowserEnv() {
    return {
      write: function write(name, value, expires, path, domain, secure) {
        var cookie = [];
        cookie.push(name + '=' + encodeURIComponent(value));

        if (utils.isNumber(expires)) {
          cookie.push('expires=' + new Date(expires).toGMTString());
        }

        if (utils.isString(path)) {
          cookie.push('path=' + path);
        }

        if (utils.isString(domain)) {
          cookie.push('domain=' + domain);
        }

        if (secure === true) {
          cookie.push('secure');
        }

        document.cookie = cookie.join('; ');
      },

      read: function read(name) {
        var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
        return (match ? decodeURIComponent(match[3]) : null);
      },

      remove: function remove(name) {
        this.write(name, '', Date.now() - 86400000);
      }
    };
  })() :

  // Non standard browser env (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return {
      write: function write() {},
      read: function read() { return null; },
      remove: function remove() {}
    };
  })()
);


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
  (function standardBrowserEnv() {
    var msie = /(msie|trident)/i.test(navigator.userAgent);
    var urlParsingNode = document.createElement('a');
    var originURL;

    /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
    function resolveURL(url) {
      var href = url;

      if (msie) {
        // IE needs attribute set twice to normalize properties
        urlParsingNode.setAttribute('href', href);
        href = urlParsingNode.href;
      }

      urlParsingNode.setAttribute('href', href);

      // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
      return {
        href: urlParsingNode.href,
        protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
        host: urlParsingNode.host,
        search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
        hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
        hostname: urlParsingNode.hostname,
        port: urlParsingNode.port,
        pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
                  urlParsingNode.pathname :
                  '/' + urlParsingNode.pathname
      };
    }

    originURL = resolveURL(window.location.href);

    /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
    return function isURLSameOrigin(requestURL) {
      var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
      return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
    };
  })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return function isURLSameOrigin() {
      return true;
    };
  })()
);


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
    }
  });

  return parsed;
};


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {
var escapeStringRegexp = __webpack_require__(35);
var ansiStyles = __webpack_require__(15);
var stripAnsi = __webpack_require__(37);
var hasAnsi = __webpack_require__(36);
var supportsColor = __webpack_require__(38);
var defineProps = Object.defineProperties;
var isSimpleWindowsTerm = process.platform === 'win32' && !/^xterm/i.test(process.env.TERM);

function Chalk(options) {
	// detect mode if not set manually
	this.enabled = !options || options.enabled === undefined ? supportsColor : options.enabled;
}

// use bright blue on Windows as the normal blue color is illegible
if (isSimpleWindowsTerm) {
	ansiStyles.blue.open = '\u001b[94m';
}

var styles = (function () {
	var ret = {};

	Object.keys(ansiStyles).forEach(function (key) {
		ansiStyles[key].closeRe = new RegExp(escapeStringRegexp(ansiStyles[key].close), 'g');

		ret[key] = {
			get: function () {
				return build.call(this, this._styles.concat(key));
			}
		};
	});

	return ret;
})();

var proto = defineProps(function chalk() {}, styles);

function build(_styles) {
	var builder = function () {
		return applyStyle.apply(builder, arguments);
	};

	builder._styles = _styles;
	builder.enabled = this.enabled;
	// __proto__ is used because we must return a function, but there is
	// no way to create a function with a different prototype.
	/* eslint-disable no-proto */
	builder.__proto__ = proto;

	return builder;
}

function applyStyle() {
	// support varags, but simply cast to string in case there's only one arg
	var args = arguments;
	var argsLen = args.length;
	var str = argsLen !== 0 && String(arguments[0]);

	if (argsLen > 1) {
		// don't slice `arguments`, it prevents v8 optimizations
		for (var a = 1; a < argsLen; a++) {
			str += ' ' + args[a];
		}
	}

	if (!this.enabled || !str) {
		return str;
	}

	var nestedStyles = this._styles;
	var i = nestedStyles.length;

	// Turns out that on Windows dimmed gray text becomes invisible in cmd.exe,
	// see https://github.com/chalk/chalk/issues/58
	// If we're on Windows and we're dealing with a gray color, temporarily make 'dim' a noop.
	var originalDim = ansiStyles.dim.open;
	if (isSimpleWindowsTerm && (nestedStyles.indexOf('gray') !== -1 || nestedStyles.indexOf('grey') !== -1)) {
		ansiStyles.dim.open = '';
	}

	while (i--) {
		var code = ansiStyles[nestedStyles[i]];

		// Replace any instances already present with a re-opening code
		// otherwise only the part of the string until said closing code
		// will be colored, and the rest will simply be 'plain'.
		str = code.open + str.replace(code.closeRe, code.open) + code.close;
	}

	// Reset the original 'dim' if we changed it to work around the Windows dimmed gray issue.
	ansiStyles.dim.open = originalDim;

	return str;
}

function init() {
	var ret = {};

	Object.keys(styles).forEach(function (name) {
		ret[name] = {
			get: function () {
				return build.call(this, [name]);
			}
		};
	});

	return ret;
}

defineProps(Chalk.prototype, init());

module.exports = new Chalk();
module.exports.styles = ansiStyles;
module.exports.hasColor = hasAnsi;
module.exports.stripColor = stripAnsi;
module.exports.supportsColor = supportsColor;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var matchOperatorsRe = /[|\\{}()[\]^$+*?.]/g;

module.exports = function (str) {
	if (typeof str !== 'string') {
		throw new TypeError('Expected a string');
	}

	return str.replace(matchOperatorsRe, '\\$&');
};


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ansiRegex = __webpack_require__(5);
var re = new RegExp(ansiRegex().source); // remove the `g` flag
module.exports = re.test.bind(re);


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ansiRegex = __webpack_require__(5)();

module.exports = function (str) {
	return typeof str === 'string' ? str.replace(ansiRegex, '') : str;
};


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {
var argv = process.argv;

var terminator = argv.indexOf('--');
var hasFlag = function (flag) {
	flag = '--' + flag;
	var pos = argv.indexOf(flag);
	return pos !== -1 && (terminator !== -1 ? pos < terminator : true);
};

module.exports = (function () {
	if ('FORCE_COLOR' in process.env) {
		return true;
	}

	if (hasFlag('no-color') ||
		hasFlag('no-colors') ||
		hasFlag('color=false')) {
		return false;
	}

	if (hasFlag('color') ||
		hasFlag('colors') ||
		hasFlag('color=true') ||
		hasFlag('color=always')) {
		return true;
	}

	if (process.stdout && !process.stdout.isTTY) {
		return false;
	}

	if (process.platform === 'win32') {
		return true;
	}

	if ('COLORTERM' in process.env) {
		return true;
	}

	if (process.env.TERM === 'dumb') {
		return false;
	}

	if (/^screen|^xterm|^vt100|color|ansi|cygwin|linux/i.test(process.env.TERM)) {
		return true;
	}

	return false;
})();

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var turf = __webpack_require__(1);
var utils_1 = __webpack_require__(2);
exports.Options = {
    maxResults: 5,
};
function parseBBox(result) {
    var _a = result.bbox, south = _a[0], west = _a[1], north = _a[2], east = _a[3];
    return [west, south, east, north];
}
function parsePoint(result) {
    var _a = result.point.coordinates, lat = _a[0], lng = _a[1];
    return turf.point([lng, lat]);
}
/**
 * Convert Bing results into GeoJSON
 */
function toGeoJSON(json, options) {
    if (options === void 0) { options = exports.Options; }
    var collection = turf.featureCollection([]);
    json.resourceSets[0].resources.map(function (result) {
        // Point GeoJSON
        var point = parsePoint(result);
        var bbox = parseBBox(result);
        var confidence = utils_1.confidenceScore(bbox);
        var properties = {
            confidence: confidence,
            authenticationResultCode: json.authenticationResultCode,
            brandLogoUri: json.brandLogoUri,
            copyright: json.copyright,
            entityType: result.entityType,
            matchCodes: result.matchCodes,
            name: result.name,
            statusCode: json.statusCode,
            statusDescription: json.statusDescription,
            traceId: json.traceId,
        };
        Object.keys(result.address).forEach(function (key) { return properties[key] = result.address[key]; });
        // Store Point to GeoJSON feature collection
        if (point) {
            point.bbox = bbox;
            point.properties = properties;
            collection.features.push(point);
        }
    });
    return collection;
}
exports.toGeoJSON = toGeoJSON;


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var turf = __webpack_require__(1);
var utils_1 = __webpack_require__(2);
exports.Options = {
    language: 'en',
    sensor: false,
    short: false,
};
/**
 * Parses Address Component into a single layer Object
 */
function parseAddressComponents(components, short) {
    if (short === void 0) { short = exports.Options.short; }
    var results = {};
    components.map(function (component) {
        if (short) {
            results[component.types[0]] = component.short_name;
        }
        else {
            results[component.types[0]] = component.long_name;
        }
    });
    return results;
}
/**
 * Converts GoogleResult Bounds to BBox
 */
function parseBBox(result) {
    if (result.geometry) {
        if (result.geometry.viewport) {
            var viewport = result.geometry.viewport;
            return [viewport.southwest.lng, viewport.southwest.lat, viewport.northeast.lng, viewport.northeast.lat];
        }
    }
}
/**
 * Converts GoogleResult to GeoJSON Point
 */
function parsePoint(result) {
    if (result.geometry) {
        if (result.geometry.location) {
            var _a = result.geometry.location, lng = _a.lng, lat = _a.lat;
            return turf.point([lng, lat]);
        }
    }
}
/**
 * Convert Google results into GeoJSON
 */
function toGeoJSON(json, options) {
    if (options === void 0) { options = exports.Options; }
    var short = options.short || exports.Options.short;
    var collection = turf.featureCollection([]);
    json.results.map(function (result) {
        // Get Geometries
        var point = parsePoint(result);
        var bbox = parseBBox(result);
        // Calculate Confidence score
        var location_type = result.geometry.location_type;
        var confidence = utils_1.confidenceScore(bbox);
        if (location_type === 'ROOFTOP') {
            confidence = 10;
        }
        // GeoJSON Point properties
        var properties = {
            confidence: confidence,
            location_type: location_type,
            formatted_address: result.formatted_address,
            place_id: result.place_id,
            types: result.types,
        };
        // Google Specific Properties
        var components = parseAddressComponents(result.address_components, short);
        Object.keys(components).forEach(function (key) { return properties[key] = components[key]; });
        // Store Point to GeoJSON feature collection
        if (point) {
            point.bbox = bbox;
            point.properties = properties;
            collection.features.push(point);
        }
    });
    return collection;
}
exports.toGeoJSON = toGeoJSON;


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Bing = __webpack_require__(39);
exports.Bing = Bing;
var Google = __webpack_require__(40);
exports.Google = Google;
var Mapbox = __webpack_require__(42);
exports.Mapbox = Mapbox;
var Wikidata = __webpack_require__(44);
exports.Wikidata = Wikidata;


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var helpers_1 = __webpack_require__(1);
exports.Options = {
    mode: 'mapbox.places',
    limit: 5,
};
/**
 * Convert Mapbox results into GeoJSON
 */
function toGeoJSON(json, options) {
    if (options === void 0) { options = exports.Options; }
    var collection = helpers_1.featureCollection([]);
    json.features.map(function (result) {
        collection.features.push(result);
    });
    return collection;
}
exports.toGeoJSON = toGeoJSON;


/***/ }),
/* 43 */
/***/ (function(module, exports) {

module.exports = {
	"country": "Q6256",
	"province": "Q11828004",
	"capital": "Q5119",
	"city": "Q515",
	"town": "Q3957",
	"village": "Q532",
	"municipality": "Q15284",
	"suburb": "Q188509",
	"neighborhood": "Q123705"
};

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var turf = __webpack_require__(1);
var utils_1 = __webpack_require__(2);
var iso639 = __webpack_require__(46);
var wikidataCodes = __webpack_require__(43);
exports.Options = {
    subclasses: ['Q486972'],
    languages: ['en', 'fr', 'es', 'de', 'it', 'ru'],
    radius: 15,
    sparql: false,
};
function createQuery(address, options) {
    if (options === void 0) { options = exports.Options; }
    // Validation
    if (!options.nearest) {
        utils_1.error('--nearest is required');
    }
    // Options
    var _a = options.nearest, lng = _a[0], lat = _a[1];
    var radius = options.radius || exports.Options.radius;
    var subclasses = options.subclasses || exports.Options.subclasses;
    var languages = options.languages || exports.Options.languages;
    // Validate languages
    languages.map(function (language) {
        if (iso639.codes[language] === undefined) {
            utils_1.error("wikidata language code [" + language + "] is invalid");
        }
    });
    // Convert Arrays into Strings
    var subclassesString = subclasses.map(function (code) {
        code = wikidataCodes[code] || code;
        return "wd:" + code.replace('wd:', '');
    }).join(', ');
    // Build SPARQL Query
    var query = "SELECT DISTINCT ?place ?location ?distance ?placeDescription ";
    query += languages.map(function (language) { return "?name_" + language; }).join(' ');
    query += " WHERE {\n  # Search Instance of & Subclasses\n  ?place wdt:P31/wdt:P279* ?subclass\n  FILTER (?subclass in (" + subclassesString + "))\n";
    if (options.nearest) {
        query += "\n  # Search by Nearest\n  SERVICE wikibase:around {\n    ?place wdt:P625 ?location .\n    bd:serviceParam wikibase:center \"Point(" + lng + " " + lat + ")\"^^geo:wktLiteral .\n    bd:serviceParam wikibase:radius \"" + radius + "\" .\n    bd:serviceParam wikibase:distance ?distance .\n  }\n";
    }
    query += "\n  # Filter by Exact Name\n";
    languages.map(function (language) {
        query += "  OPTIONAL {?place rdfs:label ?name_" + language + " FILTER (lang(?name_" + language + ") = \"" + language + "\") . }\n";
    });
    query += "\n  FILTER (";
    query += languages.map(function (language) { return "regex(?name_" + language + ", \"^" + address + "$\")"; }).join(' || ');
    query += ") .\n";
    // Descriptions
    query += "\n  # Get Descriptions\n  SERVICE wikibase:label {\n    bd:serviceParam wikibase:language \"" + languages.join(',') + "\"\n  }\n\n} ORDER BY ASC(?distance)\n";
    return query;
}
exports.createQuery = createQuery;
/**
 * Convert Wikidata SPARQL results into GeoJSON
 */
function toGeoJSON(json, options) {
    if (options === void 0) { options = exports.Options; }
    var languages = options.languages || exports.Options.languages;
    var collection = turf.featureCollection([]);
    if (json.results !== undefined) {
        if (json.results.bindings !== undefined) {
            json.results.bindings.map(function (result) {
                // Standard Wikidata tags
                var id = result.place.value.match(/entity\/(.+)/)[1];
                var _a = result.location.value.match(/\(([\-\.\d]+) ([\-\.\d]+)\)/).slice(1, 3).map(function (n) { return Number(n); }), lng = _a[0], lat = _a[1];
                var distance = Number(result.distance.value);
                var properties = {
                    id: id,
                    distance: distance,
                };
                if (result.placeDescription) {
                    properties.description = result.placeDescription.value;
                }
                // Parse languages
                languages.map(function (language) {
                    var match = result["name_" + language];
                    if (match !== undefined) {
                        properties["name:" + language] = match.value;
                    }
                });
                // Create Point
                var point = turf.point([lng, lat], properties);
                point.id = id;
                // Add to GeoJSON Feature Collection
                collection.features.push(point);
            });
        }
    }
    return collection;
}
exports.toGeoJSON = toGeoJSON;


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* tslint:enable */
exports.codes = {
    AD: 'AD',
    AE: 'AE',
    AF: 'AF',
    AG: 'AG',
    AI: 'AI',
    AL: 'AL',
    AM: 'AM',
    AO: 'AO',
    AQ: 'AQ',
    AR: 'AR',
    AS: 'AS',
    AT: 'AT',
    AU: 'AU',
    AW: 'AW',
    AX: 'AX',
    AZ: 'AZ',
    BA: 'BA',
    BB: 'BB',
    BD: 'BD',
    BE: 'BE',
    BF: 'BF',
    BG: 'BG',
    BH: 'BH',
    BI: 'BI',
    BJ: 'BJ',
    BL: 'BL',
    BM: 'BM',
    BN: 'BN',
    BO: 'BO',
    BQ: 'BQ',
    BR: 'BR',
    BS: 'BS',
    BT: 'BT',
    BV: 'BV',
    BW: 'BW',
    BY: 'BY',
    BZ: 'BZ',
    CA: 'CA',
    CC: 'CC',
    CD: 'CD',
    CF: 'CF',
    CG: 'CG',
    CH: 'CH',
    CI: 'CI',
    CK: 'CK',
    CL: 'CL',
    CM: 'CM',
    CN: 'CN',
    CO: 'CO',
    CR: 'CR',
    CU: 'CU',
    CV: 'CV',
    CW: 'CW',
    CX: 'CX',
    CY: 'CY',
    CZ: 'CZ',
    DE: 'DE',
    DJ: 'DJ',
    DK: 'DK',
    DM: 'DM',
    DO: 'DO',
    DZ: 'DZ',
    EC: 'EC',
    EE: 'EE',
    EG: 'EG',
    EH: 'EH',
    ER: 'ER',
    ES: 'ES',
    ET: 'ET',
    FI: 'FI',
    FJ: 'FJ',
    FK: 'FK',
    FM: 'FM',
    FO: 'FO',
    FR: 'FR',
    GA: 'GA',
    GB: 'GB',
    GD: 'GD',
    GE: 'GE',
    GF: 'GF',
    GG: 'GG',
    GH: 'GH',
    GI: 'GI',
    GL: 'GL',
    GM: 'GM',
    GN: 'GN',
    GP: 'GP',
    GQ: 'GQ',
    GR: 'GR',
    GS: 'GS',
    GT: 'GT',
    GU: 'GU',
    GW: 'GW',
    GY: 'GY',
    HK: 'HK',
    HM: 'HM',
    HN: 'HN',
    HR: 'HR',
    HT: 'HT',
    HU: 'HU',
    ID: 'ID',
    IE: 'IE',
    IL: 'IL',
    IM: 'IM',
    IN: 'IN',
    IO: 'IO',
    IQ: 'IQ',
    IR: 'IR',
    IS: 'IS',
    IT: 'IT',
    JE: 'JE',
    JM: 'JM',
    JO: 'JO',
    JP: 'JP',
    KE: 'KE',
    KG: 'KG',
    KH: 'KH',
    KI: 'KI',
    KM: 'KM',
    KN: 'KN',
    KP: 'KP',
    KR: 'KR',
    KW: 'KW',
    KY: 'KY',
    KZ: 'KZ',
    LA: 'LA',
    LB: 'LB',
    LC: 'LC',
    LI: 'LI',
    LK: 'LK',
    LR: 'LR',
    LS: 'LS',
    LT: 'LT',
    LU: 'LU',
    LV: 'LV',
    LY: 'LY',
    MA: 'MA',
    MC: 'MC',
    MD: 'MD',
    ME: 'ME',
    MF: 'MF',
    MG: 'MG',
    MH: 'MH',
    MK: 'MK',
    ML: 'ML',
    MM: 'MM',
    MN: 'MN',
    MO: 'MO',
    MP: 'MP',
    MQ: 'MQ',
    MR: 'MR',
    MS: 'MS',
    MT: 'MT',
    MU: 'MU',
    MV: 'MV',
    MW: 'MW',
    MX: 'MX',
    MY: 'MY',
    MZ: 'MZ',
    NA: 'NA',
    NC: 'NC',
    NE: 'NE',
    NF: 'NF',
    NG: 'NG',
    NI: 'NI',
    NL: 'NL',
    NO: 'NO',
    NP: 'NP',
    NR: 'NR',
    NU: 'NU',
    NZ: 'NZ',
    OM: 'OM',
    PA: 'PA',
    PE: 'PE',
    PF: 'PF',
    PG: 'PG',
    PH: 'PH',
    PK: 'PK',
    PL: 'PL',
    PM: 'PM',
    PN: 'PN',
    PR: 'PR',
    PS: 'PS',
    PT: 'PT',
    PW: 'PW',
    PY: 'PY',
    QA: 'QA',
    RE: 'RE',
    RO: 'RO',
    RS: 'RS',
    RU: 'RU',
    RW: 'RW',
    SA: 'SA',
    SB: 'SB',
    SC: 'SC',
    SD: 'SD',
    SE: 'SE',
    SG: 'SG',
    SH: 'SH',
    SI: 'SI',
    SJ: 'SJ',
    SK: 'SK',
    SL: 'SL',
    SM: 'SM',
    SN: 'SN',
    SO: 'SO',
    SR: 'SR',
    SS: 'SS',
    ST: 'ST',
    SV: 'SV',
    SX: 'SX',
    SY: 'SY',
    SZ: 'SZ',
    TC: 'TC',
    TD: 'TD',
    TF: 'TF',
    TG: 'TG',
    TH: 'TH',
    TJ: 'TJ',
    TK: 'TK',
    TL: 'TL',
    TM: 'TM',
    TN: 'TN',
    TO: 'TO',
    TR: 'TR',
    TT: 'TT',
    TV: 'TV',
    TW: 'TW',
    TZ: 'TZ',
    UA: 'UA',
    UG: 'UG',
    UM: 'UM',
    US: 'US',
    UY: 'UY',
    UZ: 'UZ',
    VA: 'VA',
    VC: 'VC',
    VE: 'VE',
    VG: 'VG',
    VI: 'VI',
    VN: 'VN',
    VU: 'VU',
    WF: 'WF',
    WS: 'WS',
    YE: 'YE',
    YT: 'YT',
    ZA: 'ZA',
    ZM: 'ZM',
    ZW: 'ZW',
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = { codes: exports.codes };


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* tslint:enable */
exports.codes = {
    en: 'en',
    fr: 'fr',
    it: 'it',
    de: 'de',
    aa: 'aa',
    ab: 'ab',
    af: 'af',
    am: 'am',
    ar: 'ar',
    as: 'as',
    ay: 'ay',
    az: 'az',
    ba: 'ba',
    be: 'be',
    bg: 'bg',
    bh: 'bh',
    bi: 'bi',
    bn: 'bn',
    bo: 'bo',
    br: 'br',
    ca: 'ca',
    co: 'co',
    cs: 'cs',
    cy: 'cy',
    da: 'da',
    dz: 'dz',
    el: 'el',
    eo: 'eo',
    es: 'es',
    et: 'et',
    eu: 'eu',
    fa: 'fa',
    fi: 'fi',
    fj: 'fj',
    fo: 'fo',
    fy: 'fy',
    ga: 'ga',
    gd: 'gd',
    gl: 'gl',
    gn: 'gn',
    gu: 'gu',
    ha: 'ha',
    hi: 'hi',
    he: 'he',
    hr: 'hr',
    hu: 'hu',
    hy: 'hy',
    ia: 'ia',
    id: 'id',
    ie: 'ie',
    ik: 'ik',
    in: 'in',
    is: 'is',
    iu: 'iu',
    iw: 'iw',
    ja: 'ja',
    ji: 'ji',
    jw: 'jw',
    ka: 'ka',
    kk: 'kk',
    kl: 'kl',
    km: 'km',
    kn: 'kn',
    ko: 'ko',
    ks: 'ks',
    ku: 'ku',
    ky: 'ky',
    la: 'la',
    ln: 'ln',
    lo: 'lo',
    lt: 'lt',
    lv: 'lv',
    mg: 'mg',
    mi: 'mi',
    mk: 'mk',
    ml: 'ml',
    mn: 'mn',
    mo: 'mo',
    mr: 'mr',
    ms: 'ms',
    mt: 'mt',
    my: 'my',
    na: 'na',
    ne: 'ne',
    nl: 'nl',
    no: 'no',
    oc: 'oc',
    om: 'om',
    or: 'or',
    pa: 'pa',
    pl: 'pl',
    ps: 'ps',
    pt: 'pt',
    qu: 'qu',
    rm: 'rm',
    rn: 'rn',
    ro: 'ro',
    ru: 'ru',
    rw: 'rw',
    sa: 'sa',
    sd: 'sd',
    sg: 'sg',
    sh: 'sh',
    si: 'si',
    sk: 'sk',
    sl: 'sl',
    sm: 'sm',
    sn: 'sn',
    so: 'so',
    sq: 'sq',
    sr: 'sr',
    ss: 'ss',
    st: 'st',
    su: 'su',
    sv: 'sv',
    sw: 'sw',
    ta: 'ta',
    te: 'te',
    tg: 'tg',
    th: 'th',
    ti: 'ti',
    tk: 'tk',
    tl: 'tl',
    tn: 'tn',
    to: 'to',
    tr: 'tr',
    ts: 'ts',
    tt: 'tt',
    tw: 'tw',
    ug: 'ug',
    uk: 'uk',
    ur: 'ur',
    uz: 'uz',
    vi: 'vi',
    vo: 'vo',
    wo: 'wo',
    xh: 'xh',
    yi: 'yi',
    yo: 'yo',
    za: 'za',
    zh: 'zh',
    zu: 'zu',
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = { codes: exports.codes };


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var helpers_1 = __webpack_require__(1);
var bboxPolygon = __webpack_require__(12);
var distance = __webpack_require__(13);
var chalk = __webpack_require__(34);
var log = console.log;
exports.Options = {
    limit: 1,
};
/**
 * Pretty Error message
 */
function error(message) {
    log(chalk.bgRed.white('[Error]' + message));
    throw new Error(message);
}
exports.error = error;
/**
 * Score (2 worst to 10 best) Distance (kilometers)
 */
var scoreMatrix = [
    [2, 25],
    [3, 20],
    [4, 15],
    [5, 10],
    [6, 7.5],
    [7, 5],
    [8, 1],
    [9, 0.5],
    [10, 0.25],
];
/**
 * Generates a confidence score from 1 (worst) to 10 (best) from a given BBox
 *
 * @param {BBox} bbox extent in [minX, minY, maxX, maxY] order
 * @returns {number} confidence score
 * @example
 * confidenceScore([-75.1, 45.1, -75, 45])
 * //=4
 * confidenceScore([-75.001, 45.001, -75, 45])
 * //=10
 */
function confidenceScore(bbox) {
    if (bbox === undefined) {
        return 0;
    }
    var result = 0;
    var poly = bboxPolygon(bbox);
    var sw = helpers_1.point(poly.geometry.coordinates[0][0]);
    var ne = helpers_1.point(poly.geometry.coordinates[0][2]);
    var d = distance(sw, ne, 'kilometers');
    scoreMatrix.map(function (step) {
        var score = step[0], maximum = step[1];
        if (d < maximum) {
            result = score;
        }
        if (d >= 25) {
            result = 1;
        }
    });
    return result;
}
exports.confidenceScore = confidenceScore;
/**
 * Validates {@link LngLat} coordinates.
 *
 * @param {LngLat} lnglat Longitude (Meridians) & Latitude (Parallels) in decimal degrees
 * @throws {Error} Will throw an error if LngLat is not valid.
 * @returns {LngLat} LngLat coordinates
 * @example
 * mercator.validateLngLat([-115, 44])
 * //= [ -115, 44 ]
 * mercator.validateLngLat([-225, 44])
 * //= Error: LngLat [lng] must be within -180 to 180 degrees
 */
function validateLngLat(lnglat) {
    var lat;
    var lng;
    if (typeof (lnglat) === 'string') {
        _a = JSON.parse(lnglat), lng = _a[0], lat = _a[1];
    }
    else {
        lng = lnglat[0], lat = lnglat[1];
    }
    if (lat < -90 || lat > 90) {
        var message = 'LngLat [lat] must be within -90 to 90 degrees';
        error(message);
    }
    else if (lng < -180 || lng > 180) {
        var message = 'LngLat [lng] must be within -180 to 180 degrees';
        error(message);
    }
    return [lng, lat];
    var _a;
}
exports.validateLngLat = validateLngLat;


/***/ }),
/* 48 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

const geocoder = __webpack_require__(11)
console.log(`
geocoder.google('Ottawa, ON')
  .then(data => console.log(data))
`)
geocoder.google('Ottawa, ON')
  .then(data => {
    console.log(data)
    console.log(JSON.stringify(data, null, 2))
  })

/***/ })
/******/ ]);