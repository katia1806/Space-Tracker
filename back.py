from flask import Flask, jsonify
import pandas as pd
import os 
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

PARQUET_PATH = "/tmp/dangerous_objects"
@app.route('/objects', methods=['GET'])
def get_objects():
    try:
        # Liste tous les fichiers Parquet dans le répertoire des objets
        files = [os.path.join("/tmp/objects", f) for f in os.listdir("/tmp/objects") if f.endswith('.parquet')]
        print("Files being read for objects:", files)  # Debug log
        
        # Lire et concaténer les fichiers Parquet
        df = pd.concat(pd.read_parquet(f) for f in files)
        objects = df.to_dict(orient='records')
        return jsonify(objects)
    except Exception as e:
        print("Error in /objects:", str(e))  # Log the error
        return jsonify({"error": str(e)}), 500
    
@app.route('/alerts', methods=['GET'])
def get_alerts():
    try:
        # Liste tous les fichiers Parquet dans le répertoire des objets dangereux
        files = [os.path.join("/tmp/dangerous_objects", f) for f in os.listdir("/tmp/dangerous_objects") if f.endswith('.parquet')]
        print("Files being read for alerts:", files)  # Debug log
        
        # Lire et concaténer les fichiers Parquet
        df = pd.concat(pd.read_parquet(f) for f in files)
        alerts = df.to_dict(orient='records')
        return jsonify(alerts)
    except Exception as e:
        print("Error in /alerts:", str(e))  # Log the error
        return jsonify({"error": str(e)}), 500
    
@app.route('/', methods=['GET'])
def home():
    return "Welcome to the Space Object Tracker API! Use /objects or /alerts."

if __name__ == '__main__':
    app.run(debug=True, port=5001)