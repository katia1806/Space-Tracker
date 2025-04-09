from kafka import KafkaProducer
import json
import time
import random

producer = KafkaProducer(
    bootstrap_servers='localhost:9092',
    value_serializer=lambda v: json.dumps(v).encode('utf-8')
)

types = ['astéroïde', 'météorite', 'comète']

while True:
    data = {
        "id": f"meteor_{random.randint(10000,99999)}",
        "timestamp": int(time.time()),
        "position": {
            "x": round(random.uniform(-180, 180), 6),  # Longitude : entre -180 et 180
            "y": round(random.uniform(-90, 90), 6),   # Latitude : entre -90 et 90
            "z": round(random.uniform(100, 800), 2)   # Altitude ou autre dimension
        },
        "vitesse": round(random.uniform(10, 50), 2),
        "taille": round(random.uniform(5, 30), 2),
        "type": random.choice(types)
    }

    producer.send('space_data', value=data)
    print(f"Sent: {data}")
    time.sleep(2)