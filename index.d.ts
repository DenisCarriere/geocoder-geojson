/// <reference types="geojson" />
import * as utils from './utils';
import { LngLat, GeoJSONParser } from './utils';
import { Bing, Google, Mapbox, Wikidata } from './providers';
export declare type Providers = 'bing' | 'google' | 'mapbox' | 'mapboxReverse' | 'wikidata' | 'googleReverse' | 'mapboxReverse';
export declare type Points = GeoJSON.FeatureCollection<GeoJSON.Point>;
export declare function mapbox(address: string, options?: Mapbox.Options): Promise<Points>;
export declare function mapboxReverse(lnglat: string | LngLat, options?: Mapbox.Options): Promise<Points>;
export declare function google(address: string, options?: Google.Options): Promise<Points>;
export declare function googleReverse(lnglat: string | LngLat, options?: Google.Options): Promise<Points>;
export declare function bing(address: string, options?: Bing.Options): Promise<Points>;
export declare function wikidata(address: string, options?: Wikidata.Options): Promise<Points>;
export declare function request(url: string, geojsonParser: GeoJSONParser, params?: {}, options?: utils.Options): Promise<Points>;
export declare function get(provider: Providers, query: string, options?: any): Promise<Points>;
