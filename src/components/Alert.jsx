import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Alert = () => {
    const [alerts, setAlerts] = useState([]);

    useEffect(() => {
        // Fonction pour récupérer les données
        const fetchAlerts = () => {
            axios.get('http://localhost:5001/alerts')
                .then(response => setAlerts(response.data))
                .catch(error => console.error('Error fetching alerts:', error));
        };

        // Appeler la fonction immédiatement
        fetchAlerts();

        // Configurer un intervalle pour rafraîchir les données toutes les 5 secondes
        const interval = setInterval(fetchAlerts, 5000);

        // Nettoyer l'intervalle lorsque le composant est démonté
        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <h2>Alerts</h2>
            {alerts.length > 0 ? (
                <div style={{ color: 'red' }}>
                    <strong>Dangerous Objects Detected!</strong>
                    <ul>
                        {alerts.map((alert, index) => (
                            <li key={`${alert.id}-${index}`}>
                                {alert.type} - Speed: {alert.vitesse} - Size: {alert.taille}
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p>No threats detected.</p>
            )}
        </div>
    );
};

export default Alert;