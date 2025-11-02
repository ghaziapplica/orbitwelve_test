// Type definitions for leaflet
import 'leaflet';

declare module 'leaflet' {
  namespace Icon {
    interface DefaultIconOptions extends BaseIconOptions {
      imagePath?: string;
    }
  }

  namespace Icon.Default {
    interface DefaultIconOptions extends IconOptions {
      imagePath?: string;
    }
  }
}

declare module 'leaflet/dist/leaflet.css' {
  const content: string;
  export default content;
}
