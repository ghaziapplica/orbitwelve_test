// Type definitions for Google Maps JavaScript API
interface Window {
  google: {
    maps: {
      Map: new (mapDiv: HTMLElement, opts?: google.maps.MapOptions) => google.maps.Map;
      Marker: new (opts?: google.maps.MarkerOptions) => google.maps.Marker;
      event: {
        clearInstanceListeners(instance: any): void;
      };
      // Add other Google Maps types as needed
    };
  };
}

declare namespace google.maps {
  interface MapOptions {
    center: LatLng | LatLngLiteral;
    zoom: number;
    disableDefaultUI?: boolean;
    zoomControl?: boolean;
    styles?: MapTypeStyle[];
  }

  interface Map {
    // Add methods you plan to use
    setCenter(latLng: LatLng | LatLngLiteral): void;
    setZoom(zoom: number): void;
  }

  interface MarkerOptions {
    position: LatLng | LatLngLiteral;
    map?: Map;
    title?: string;
    icon?: string | google.maps.Icon | google.maps.Symbol;
  }

  interface Marker {
    setMap(map: Map | null): void;
    setPosition(latLng: LatLng | LatLngLiteral): void;
  }

  interface LatLng {
    lat(): number;
    lng(): number;
  }

  interface LatLngLiteral {
    lat: number;
    lng: number;
  }

  interface Size {
    width: number;
    height: number;
  }

  interface MapTypeStyle {
    featureType?: string;
    elementType?: string;
    stylers?: MapTypeStyler[];
  }

  type MapTypeStyler = {
    color?: string;
    lightness?: number;
    saturation?: number;
    weight?: number;
    visibility?: string;
  };

  interface Icon {
    url: string;
    scaledSize?: Size;
    origin?: Point;
    anchor?: Point;
  }

  interface Symbol {
    path: string;
    fillColor?: string;
    fillOpacity?: number;
    strokeColor?: string;
    strokeWeight?: number;
    scale?: number;
  }

  interface Point {
    x: number;
    y: number;
  }
}
