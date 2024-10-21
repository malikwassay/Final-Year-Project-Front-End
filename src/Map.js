import React, { useState, useCallback, useEffect } from 'react';
import { GoogleMap, Marker, InfoWindow, useLoadScript } from '@react-google-maps/api';

const mapContainerStyle = {
  height: "100vh",
  width: "100%"
};

const center = {
  lat: 33.6694, 
  lng: 72.9972
};

const cities = [
  { name: "Islamabad", location: { lat: 33.6694, lng: 72.9972 }, weight: 5 },
  { name: "Islamabad", location: { lat: 33.7297, lng: 73.0746}, weight: 8 },
];

const heatmapOptions = {
  radius: 5,
  opacity: 10,
  dissipating: false,
  maxIntensity: 10,
};

const Map = () => {
  const [selectedCity, setSelectedCity] = useState(null);
  const [map, setMap] = useState(null);
  
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ["places", "visualization"],
  });

  const onLoad = useCallback((map) => {
    console.log("Map loaded");
    setMap(map);
    
    if (window.google && window.google.maps.visualization) {
      const heatmapData = cities.map(city => ({
        location: new window.google.maps.LatLng(city.location.lat, city.location.lng),
        weight: city.weight,
      }));
      
      const heatmap = new window.google.maps.visualization.HeatmapLayer({
        data: heatmapData,
        map: map,
      });
      heatmap.setOptions(heatmapOptions);
      console.log("Heatmap layer created");
    } else {
      console.error("Google Maps visualization library not loaded");
    }
  }, []);

  if (loadError) {
    console.error("Error loading maps:", loadError);
    return "Error loading maps";
  }
  if (!isLoaded) return "Loading Maps";

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={5}
      center={center}
      onLoad={onLoad}
    >
      {cities.map((city, index) => (
        <Marker
          key={index}
          position={city.location}
          onClick={() => setSelectedCity(city)}
        />
      ))}
      {selectedCity && (
        <InfoWindow
          position={selectedCity.location}
          onCloseClick={() => setSelectedCity(null)}
        >
          <div>
            <h2>{selectedCity.name}</h2>
            <p>Dengue Intensity: {selectedCity.weight}</p>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
};

export default Map;
