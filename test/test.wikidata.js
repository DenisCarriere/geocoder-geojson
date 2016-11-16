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
const CITY = 'Ottawa';
ava_1.default('wikidata', (t) => __awaiter(this, void 0, void 0, function* () {
    const g = yield geocoder.wikidata(CITY);
    t.true(!!g.features);
}));
ava_1.default('wikidata.nearest', (t) => __awaiter(this, void 0, void 0, function* () {
    const g = yield geocoder.wikidata(CITY, { nearest: [-75, 45] });
    t.true(!!g.features);
}));
ava_1.default('wikidata.nearest + distance', (t) => __awaiter(this, void 0, void 0, function* () {
    const g = yield geocoder.wikidata(CITY, { radius: 50, nearest: [-75, 45] });
    t.true(!!g.features);
}));
ava_1.default('wikidata.nearest + places', (t) => __awaiter(this, void 0, void 0, function* () {
    const g = yield geocoder.wikidata(CITY, { places: ['capital', 'city'], nearest: [-75, 45] });
    t.true(!!g.features);
}));
//# sourceMappingURL=test.wikidata.js.map