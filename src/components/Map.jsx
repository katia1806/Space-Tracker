import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
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

  const createEmojiIcon = (emoji) => {
    return L.divIcon({
      className: 'emoji-icon leaflet-div-icon',
      html: `<div>${emoji}</div>`,
      iconSize: [32, 32], // Size of the emoji marker
      iconAnchor: [16, 16], // Center the icon
    });
  };

  return (
    <MapContainer
      center={[0, 0]}
      zoom={2}
      minZoom={2}
      maxZoom={10}
      maxBounds={[
        [-90, -180],
        [90, 180],
      ]}
      maxBoundsViscosity={1.0}
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
          icon={createEmojiIcon(obj.type === 'astéroïde' ? '☄️' : obj.type === 'météorite' ? '🌑' : '🌠')}
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
