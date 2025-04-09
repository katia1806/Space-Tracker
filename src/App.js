import React from 'react';
import ObjectList from './components/ObjectList';
import Map from './components/Map';
import Alert from './components/Alert';
import './App.css'; 

const App = () => {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>🚀 Space Object Tracker</h1>
      </header>
      
      <main className="app-main">
        
        
        <section className="info-section">
          <div className="object-list">
            <h2>🌍 Object List</h2>
            <ObjectList />
          </div>
          <div className="map-section">
            <h2>🗺️ Map</h2>
            <Map endpoint="http://localhost:5001/objects" />
          </div>
        </section>
        <section className="alert-section">
          <div className="alert-list">
            <h2>⚠️ Alerts</h2>
            <Alert />
          </div>
          <div className="map-section">
            <h2>🗺️ Alert Map</h2>
            <Map endpoint="http://localhost:5001/alerts" />
          </div>
        </section>

      </main>
      
    </div>
  );
};

export default App;