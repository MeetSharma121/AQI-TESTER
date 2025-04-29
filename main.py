import numpy as np
import pandas as pd
import sqlite3
from sqlalchemy import create_engine, text
import matplotlib.pyplot as plt
import seaborn as sns
from datetime import datetime

# Database connection
def create_connection():
    return sqlite3.connect('air_quality.db')

def init_database():
    conn = create_connection()
    cursor = conn.cursor()
    
    # Create air quality table
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS air_quality (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        city TEXT NOT NULL,
        country TEXT NOT NULL,
        date DATE NOT NULL,
        pm25 FLOAT,
        pm10 FLOAT,
        no2 FLOAT,
        o3 FLOAT,
        co FLOAT,
        aqi FLOAT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    ''')
    
    conn.commit()
    conn.close()

def load_sample_data():
    # Sample data generation
    dates = pd.date_range(start='2023-01-01', end='2023-12-31', freq='D')
    cities = [
        ('New York', 'USA'),
        ('London', 'UK'),
        ('Tokyo', 'Japan'),
        ('Beijing', 'China'),
        ('Delhi', 'India')
    ]
    
    data = []
    for city, country in cities:
        for date in dates:
            # Generate sample readings with some randomization
            data.append({
                'city': city,
                'country': country,
                'date': date.strftime('%Y-%m-%d'),
                'pm25': round(20 + np.random.normal(0, 5), 2),
                'pm10': round(40 + np.random.normal(0, 10), 2),
                'no2': round(30 + np.random.normal(0, 7), 2),
                'o3': round(25 + np.random.normal(0, 5), 2),
                'co': round(1 + np.random.normal(0, 0.2), 2),
                'aqi': round(50 + np.random.normal(0, 15), 2)
            })
    
    df = pd.DataFrame(data)
    
    # Save to database
    engine = create_engine('sqlite:///air_quality.db')
    df.to_sql('air_quality', engine, if_exists='replace', index=False)

def get_top_polluted_cities():
    conn = create_connection()
    query = '''
    SELECT city, country, AVG(aqi) as avg_aqi
    FROM air_quality
    GROUP BY city, country
    ORDER BY avg_aqi DESC
    LIMIT 10
    '''
    
    df = pd.read_sql_query(query, conn)
    conn.close()
    return df

def plot_pollution_trends():
    conn = create_connection()
    query = '''
    SELECT date, city, AVG(aqi) as avg_aqi
    FROM air_quality
    GROUP BY date, city
    ORDER BY date
    '''
    
    df = pd.read_sql_query(query, conn)
    conn.close()
    
    plt.figure(figsize=(12, 6))
    for city in df['city'].unique():
        city_data = df[df['city'] == city]
        plt.plot(pd.to_datetime(city_data['date']), city_data['avg_aqi'], label=city)
    
    plt.title('Air Quality Index Trends by City')
    plt.xlabel('Date')
    plt.ylabel('AQI')
    plt.legend()
    plt.xticks(rotation=45)
    plt.tight_layout()
    plt.savefig('pollution_trends.png')
    plt.close()

def analyze_pollutant_correlations():
    conn = create_connection()
    query = '''
    SELECT pm25, pm10, no2, o3, co
    FROM air_quality
    '''
    
    df = pd.read_sql_query(query, conn)
    conn.close()
    
    plt.figure(figsize=(10, 8))
    sns.heatmap(df.corr(), annot=True, cmap='coolwarm')
    plt.title('Pollutant Correlations')
    plt.tight_layout()
    plt.savefig('pollutant_correlations.png')
    plt.close()

def main():
    try:
        # Initialize database and load sample data
        print("Initializing database...")
        init_database()
        print("Loading sample data...")
        load_sample_data()
        
        # Generate analysis
        print("\nAnalyzing pollution data...")
        top_polluted = get_top_polluted_cities()
        print("\nTop 10 Most Polluted Cities:")
        print(top_polluted)
        
        # Generate visualizations
        print("\nGenerating visualizations...")
        plot_pollution_trends()
        analyze_pollutant_correlations()
        
        print("\nAnalysis complete! Check pollution_trends.png and pollutant_correlations.png for visualizations.")
    
    except Exception as e:
        print(f"An error occurred: {str(e)}")

if __name__ == "__main__":
    main()