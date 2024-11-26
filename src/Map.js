import React, { useState, useEffect, useCallback } from 'react';
import { GoogleMap, Marker, InfoWindow, useLoadScript, HeatmapLayer } from '@react-google-maps/api';
import axios from 'axios';

const styles = {
  flex: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    minHeight: '100vh'
  },
  
  card: {
    width: '16rem',
    backgroundColor: 'white',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    padding: '16px',
    borderRadius: '8px',
    zIndex: 10
  },
  
  cardHeader: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    marginBottom: '16px'
  },
  
  caseBox: {
    padding: '12px',
    borderRadius: '8px',
    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
    marginBottom: '16px'
  },
  
  caseBoxHover: {
    transform: 'scale(1.05)',
    boxShadow: '0 6px 10px rgba(0, 0, 0, 0.1)'
  },
  
  // City-specific styles
  iquitos: {
    color: '#2a4365',
    backgroundColor: '#ebf8ff'
  },
  
  sanJuan: {
    color: '#276749',
    backgroundColor: '#f0fff4'
  },
  
  total: {
    color: '#6b46c1',
    backgroundColor: '#faf5ff'
  },
  
  caseCount: {
    fontSize: '1.5rem',
    fontWeight: 'bold'
  },
  
  form: {
    margin: '1rem',
    display: 'flex'
  },
  
  input: {
    flex: 1,
    padding: '0.5rem',
    borderRadius: '0.25rem',
    border: '1px solid #cbd5e0'
  },
  
  button: {
    marginLeft: '0.5rem',
    padding: '0.5rem 1rem',
    backgroundColor: '#4299e1',
    color: 'white',
    borderRadius: '0.25rem',
    cursor: 'pointer'
  },
  
  error: {
    margin: '1rem',
    padding: '0.5rem',
    backgroundColor: '#fed7d7',
    color: '#c53030',
    borderRadius: '0.25rem'
  }
};

const mapContainerStyle = {
  height: "100vh",
  width: "100%"
};

const center = {
  lat: -9.1951786,
  lng: -74.9904165
};

const cities = [
  { name: "Iquitos", location: { lat: -3.75, lng: -73.25 }, weight: 1 },
  { name: "San Juan", location: { lat: -14.689663908, lng: -74.121166182 }, weight: 0 },
];

const libraries = ["places", "visualization"];

const Map = () => {
  const [selectedCity, setSelectedCity] = useState(null);
  const [heatmapData, setHeatmapData] = useState([]);
  const [mapCenter, setMapCenter] = useState(center);
  const [location, setLocation] = useState('');
  const [error, setError] = useState(null);
  const [caseCounts, setCaseCounts] = useState({ iquitos: 0, sanjuan: 0 });
  const [mapInstance, setMapInstance] = useState(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const onLoad = useCallback((map) => {
    setMapInstance(map);
    const bounds = new window.google.maps.LatLngBounds();
    cities.forEach(city => bounds.extend(city.location));
    map.fitBounds(bounds);
  }, []);

  const fetchPredictions = useCallback(async () => {
    // Only fetch if Google Maps API is loaded
    if (!isLoaded || !window.google) {
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:5000/predict_both');
      const { iquitos, sanjuan } = response.data;

      const heatmapPoints = [];
      let iquitosMax = 0;
      let sanjuanMax = 0;
      
      if (iquitos?.real_time) {
        iquitosMax = Math.max(...iquitos.real_time);
        if (iquitosMax > 12) {
          heatmapPoints.push({
            location: new window.google.maps.LatLng(cities[0].location.lat, cities[0].location.lng),
            weight: iquitosMax
          });
        }
      }

      if (sanjuan?.real_time) {
        sanjuanMax = Math.max(...sanjuan.real_time);
        if (sanjuanMax > 20) {
          heatmapPoints.push({
            location: new window.google.maps.LatLng(cities[1].location.lat, cities[1].location.lng),
            weight: sanjuanMax
          });
        }
      }

      setCaseCounts({ iquitos: iquitosMax, sanjuan: sanjuanMax });
      setHeatmapData(heatmapPoints);
      setError(null);
    } catch (error) {
      setError(`Error fetching predictions: ${error.message}`);
      console.error("Error fetching predictions:", error);
    }
  }, [isLoaded]);

  useEffect(() => {
    // Only set up interval if Google Maps API is loaded
    if (!isLoaded) return;

    const timer = setInterval(fetchPredictions, 60000);
    fetchPredictions();

    return () => clearInterval(timer);
  }, [fetchPredictions, isLoaded]);

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleLocationSubmit = async (event) => {
    event.preventDefault();
    if (!isLoaded || !window.google) {
      setError('Google Maps API not loaded yet');
      return;
    }

    try {
      const geocoder = new window.google.maps.Geocoder();
      const results = await new Promise((resolve, reject) => {
        geocoder.geocode({ address: location }, (results, status) => {
          if (status === 'OK') resolve(results);
          else reject(new Error(`Geocoding failed: ${status}`));
        });
      });

      const { lat, lng } = results[0].geometry.location.toJSON();
      setMapCenter({ lat, lng });
      
      if (mapInstance) {
        mapInstance.panTo({ lat, lng });
        mapInstance.setZoom(10);
      }
    } catch (error) {
      setError(`Location search failed: ${error.message}`);
    }
  };

  if (loadError) return <div style={styles.error}>Error loading maps: {loadError.message}</div>;
  if (!isLoaded) return <div>Loading Maps...</div>;

  return (
    <div style={styles.flex}>
      <div style={styles.card}>
        <h2 style={styles.cardHeader}>Dengue Cases</h2>
        <div>
          <div style={{...styles.caseBox, ...styles.iquitos}}>
            <h3 style={{fontWeight: 600}}>Iquitos</h3>
            <p style={styles.caseCount}>{caseCounts.iquitos}</p>
          </div>
          <div style={{...styles.caseBox, ...styles.sanJuan}}>
            <h3 style={{fontWeight: 600}}>San Juan</h3>
            <p style={styles.caseCount}>{caseCounts.sanjuan}</p>
          </div>
          <div style={{...styles.caseBox, ...styles.total}}>
            <h3 style={{fontWeight: 600}}>Total Cases</h3>
            <p style={styles.caseCount}>
              {caseCounts.iquitos + caseCounts.sanjuan}
            </p>
          </div>
        </div>
      </div>
      <div style={{flex: 1}}>
        <form onSubmit={handleLocationSubmit} style={styles.form}>
          <input
            type="text"
            value={location}
            onChange={handleLocationChange}
            placeholder="Enter a location"
            style={styles.input}
          />
          <button type="submit" style={styles.button}>
            Search
          </button>
        </form>
        {error && <div style={styles.error}>{error}</div>}
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={5}
          center={mapCenter}
          onLoad={onLoad}
        >
          {cities.map((city, index) => (
            <Marker
              key={index}
              position={city.location}
              onClick={() => setSelectedCity(city)}
              visible={
                (city.name === "Iquitos" && city.weight > 12) || 
                (city.name === "San Juan" && city.weight > 20)
              }
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
          {heatmapData.length > 0 && (
            <HeatmapLayer
              data={heatmapData}
              options={{
                radius: 52,
                opacity: 1
              }}
            />
          )}
        </GoogleMap>
      </div>
    </div>
  );
};

export default Map;