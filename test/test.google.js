"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const ava_1 = require('ava');
const geocoder = require('../index');
const globals_1 = require('./globals');
ava_1.default('google', (t) => __awaiter(this, void 0, void 0, function* () {
    const g = yield geocoder.google(globals_1.CITY);
    t.true(!!g.features);
}));
ava_1.default('google short=false', (t) => __awaiter(this, void 0, void 0, function* () {
    const g = yield geocoder.google(globals_1.CITY, { short: false });
    t.true(!!g.features);
}));
ava_1.default('googleReverse', (t) => __awaiter(this, void 0, void 0, function* () {
    const g = yield geocoder.googleReverse(globals_1.LNGLAT);
    t.true(!!g.features);
}));
//# sourceMappingURL=test.google.js.map