from flask import Flask, jsonify, request
from flask_cors import CORS
from sqlalchemy import create_engine, text
from datetime import datetime
import pandas as pd
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# Database connection
engine = create_engine('sqlite:///../../air_quality.db')

@app.route('/api/cities', methods=['GET'])
def get_cities():
    try:
        query = text("""
            SELECT DISTINCT city, country
            FROM air_quality
            ORDER BY city
        """)
        
        with engine.connect() as conn:
            result = conn.execute(query)
            cities = [{'city': row[0], 'country': row[1]} for row in result]
            return jsonify(cities)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/city/<city_name>', methods=['GET'])
def get_city_data(city_name):
    try:
        query = text("""
            SELECT *
            FROM air_quality
            WHERE city = :city
            ORDER BY date DESC
            LIMIT 30
        """)
        
        with engine.connect() as conn:
            result = conn.execute(query, {'city': city_name})
            columns = result.keys()
            data = [dict(zip(columns, row)) for row in result]
            return jsonify(data)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/compare', methods=['GET'])
def compare_cities():
    try:
        city1 = request.args.get('city1')
        city2 = request.args.get('city2')
        
        if not city1 or not city2:
            return jsonify({'error': 'Both cities are required'}), 400
        
        query = text("""
            SELECT *
            FROM air_quality
            WHERE city IN (:city1, :city2)
            AND date >= date('now', '-30 days')
            ORDER BY date DESC
        """)
        
        with engine.connect() as conn:
            result = conn.execute(query, {'city1': city1, 'city2': city2})
            columns = result.keys()
            data = [dict(zip(columns, row)) for row in result]
            
            # Separate data by city
            city1_data = [d for d in data if d['city'] == city1]
            city2_data = [d for d in data if d['city'] == city2]
            
            return jsonify({
                'city1': city1_data,
                'city2': city2_data
            })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/top-polluted', methods=['GET'])
def get_top_polluted():
    try:
        query = text("""
            SELECT city, country, AVG(aqi) as avg_aqi
            FROM air_quality
            GROUP BY city, country
            ORDER BY avg_aqi DESC
            LIMIT 10
        """)
        
        with engine.connect() as conn:
            result = conn.execute(query)
            data = [{'city': row[0], 'country': row[1], 'avg_aqi': float(row[2])} for row in result]
            return jsonify(data)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)