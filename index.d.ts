/// <reference types="geojson" />

export interface GeoJSONParser {
  (json: any, options: any): Points
}
export type Points = GeoJSON.FeatureCollection<GeoJSON.Point>
export type BBox = [number, number, number, number]
export type LngLat = [number, number]
export interface OpenStreetMap {
  'addr:housenumber'?: string
  'addr:street'?: string
  'addr:city'?: string
  'addr:postcode'?: string
}
export declare type Providers = 'bing' | 'google' | 'mapbox' | 'mapboxReverse' | 'wikidata' | 'googleReverse' | 'mapboxReverse' | 'opencage' | 'opencageReverse';
export declare function mapbox(address: string, options?: any): Promise<Points>;
export declare function mapboxReverse(lnglat: string | LngLat, options?: any): Promise<Points>;
export declare function google(address: string, options?: any): Promise<Points>;
export declare function googleReverse(lnglat: string | LngLat, options?: any): Promise<Points>;
export declare function bing(address: string, options?: any): Promise<Points>;
export declare function wikidata(address: string, options?: any): Promise<Points>;
export declare function opencage(address: string, options?: any): Promise<Points>;
export declare function opencageReverse(lnglat: string | LngLat, options?: any): Promise<Points>;
export declare function request(url: string, geojsonParser: GeoJSONParser, params?: {}, options?: any): Promise<Points>;
export declare function get(provider: Providers, query: string, options?: any): Promise<Points>;
