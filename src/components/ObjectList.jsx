// filepath: /home/katia/Kafka/frontend/src/components/ObjectList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ObjectList = () => {
  const [objects, setObjects] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5001/objects')
      .then(response => setObjects(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h2>Space Objects</h2>
      <ul>
        {objects.map(obj => (
          <li key={obj.id}>
            {obj.type} - Speed: {obj.vitesse} - Size: {obj.taille}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ObjectList;