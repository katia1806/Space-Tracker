import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';

const Map = ({ endpoint }) => {
  const [objects, setObjects] = useState([]);

  useEffect(() => {
    axios.get(endpoint)
      .then(response => {
        const validObjects = response.data.filter(obj => {
          if (!obj.position) return false;
          const { x, y } = obj.position;
          return x >= -180 && x <= 180 && y >= -90 && y <= 90;
        });
        setObjects(validObjects);
      })
      .catch(error => console.error('Error fetching objects:', error));
  }, [endpoint]);

  return (
    <MapContainer
      center={[0, 0]} // Centre de la carte (latitude, longitude)
      zoom={2} // Niveau de zoom initial
      minZoom={2} // Niveau de zoom minimum
      maxZoom={10} // Niveau de zoom maximum
      maxBounds={[
        [-90, -180], // Limite sud-ouest (latitude, longitude)
        [90, 180],   // Limite nord-est (latitude, longitude)
      ]} // Limites géographiques pour empêcher le défilement infini
      maxBoundsViscosity={1.0} // Empêche de sortir des limites
      style={{ height: '400px', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {objects.map(obj => (
        <Marker
          key={obj.id}
          position={[obj.position.y, obj.position.x]}
        >
          <Popup>
            <strong>{obj.type}</strong><br />
            Speed: {obj.vitesse} km/s<br />
            Size: {obj.taille} m
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;