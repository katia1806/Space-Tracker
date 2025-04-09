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
        {/* Première paire : Liste des objets et carte */}
        <div className="pair-section">
          <div className="object-list">
            <h2>🌍 Object List</h2>
            <ObjectList />
          </div>
          <div className="map-section">
            <Map endpoint="http://localhost:5001/objects" />
          </div>
        </div>

        {/* Deuxième paire : Liste des objets dangereux et carte */}
        <div className="pair-section">
          <div className="object-list">
            <h2>⚠️ Dangerous Object List</h2>
            <Alert />
          </div>
          <div className="map-section">
            <Map endpoint="http://localhost:5001/alerts" />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;