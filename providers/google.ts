export interface Bounds {
  northeast: LatLng
  southwest: LatLng
}

export interface LatLng {
  lat: number
  lng: number
}

export interface AddressComponent {
  long_name: string
  short_name: string
  types: Array<string>
}

export interface GoogleResult {
  address_components: Array<AddressComponent>
  formatted_address: string
  geometry: {
    bounds: Bounds
    location: LatLng
    location_type: string
    viewport: Bounds
  }
  place_id: string
  types: Array<string>
}

export interface GoogleResults {
  status: string
  results: Array<GoogleResult>
}

