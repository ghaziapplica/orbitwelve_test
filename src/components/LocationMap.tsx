"use client";

import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useMemo, useState } from "react";

const MapComponent = ({
  center,
  zoom = 12,
}: {
  center: { lat: number; lng: number };
  zoom?: number;
}) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries: ["places"],
  });

  const mapOptions = useMemo<google.maps.MapOptions>(
    () => ({
      disableDefaultUI: true,
      zoomControl: true,
      styles: [
        {
          featureType: "poi",
          elementType: "labels",
          stylers: [{ visibility: "off" }],
        },
      ],
    }),
    []
  );

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <GoogleMap
      zoom={zoom}
      center={center}
      mapContainerClassName="w-full h-[400px] md:h-[500px]"
      options={mapOptions}
    >
      <Marker position={center} />
    </GoogleMap>
  );
};

const LocationMap = () => {
  const [selectedOffice, setSelectedOffice] = useState<number>(0);
  const [mapCenter, setMapCenter] = useState({ lat: 25.2048, lng: 55.2708 }); // Default to Dubai

  const offices = [
    {
      id: "dubai",
      name: "Dubai Office",
      address: "Sheikh Zayed Road, Trade Centre, Dubai, UAE",
      email: "dubai@orbitwelve.com",
      phone: "+971 4 123 4567",
      coords: { lat: 25.2048, lng: 55.2708 },
      zoom: 14,
    },
    {
      id: "lahore",
      name: "Lahore Office",
      address: "MM Alam Road, Gulberg III, Lahore, Pakistan",
      email: "lahore@orbitwelve.com",
      phone: "+92 42 111 234567",
      coords: { lat: 31.5204, lng: 74.3587 },
      zoom: 14,
    },
    {
      id: "london",
      name: "London Office",
      address: "1 Canada Square, Canary Wharf, London, UK",
      email: "london@orbitwelve.com",
      phone: "+44 20 1234 5678",
      coords: { lat: 51.505, lng: -0.09 },
      zoom: 14,
    },
    {
      id: "beijing",
      name: "Beijing Office",
      address: "No.1 Jianguomenwai Avenue, Chaoyang District, Beijing, China",
      email: "beijing@orbitwelve.com",
      phone: "+86 10 1234 5678",
      coords: { lat: 39.9042, lng: 116.4074 },
      zoom: 12,
    },
    {
      id: "newyork",
      name: "New York Office",
      address: "One World Trade Center, New York, NY 10007, USA",
      email: "nyc@orbitwelve.com",
      phone: "+1 212 555 1234",
      coords: { lat: 40.7128, lng: -74.006 },
      zoom: 14,
    },
    {
      id: "singapore",
      name: "Singapore Office",
      address: "Marina Bay Financial Centre, Singapore 018981",
      email: "singapore@orbitwelve.com",
      phone: "+65 6123 4567",
      coords: { lat: 1.2806, lng: 103.8519 },
      zoom: 14,
    },
  ];

  const handleLocationClick = (index: number) => {
    setSelectedOffice(index);
    setMapCenter(offices[index].coords);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Our Global Presence
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Visit us at any of our international offices
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="w-full">
            <MapComponent
              center={mapCenter}
              zoom={offices[selectedOffice].zoom}
            />
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {offices.map((office) => (
                <div
                  key={office.id}
                  className={`border rounded-lg p-4 transition-all cursor-pointer ${
                    offices[selectedOffice]?.id === office.id
                      ? "border-[#1098D5] bg-[#1098D5]/10"
                      : "border-gray-200 hover:border-[#1098D5] hover:shadow-md"
                  }`}
                  onClick={() => handleLocationClick(offices.indexOf(office))}
                >
                  <h3 className="font-bold text-lg text-[#1098D5]">
                    {office.name}
                  </h3>
                  <p className="text-gray-600 mt-2">{office.address}</p>
                  <a
                    href={`mailto:${office.email}`}
                    className="text-[#1098D5] hover:underline block mt-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {office.email}
                  </a>
                  <a
                    href={`tel:${office.phone.replace(/[^0-9+]/g, "")}`}
                    className="text-gray-700 hover:text-[#1098D5] block"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {office.phone}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationMap;
