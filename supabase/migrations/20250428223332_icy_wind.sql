-- Top 10 most polluted cities by average AQI
SELECT city, country, AVG(aqi) as avg_aqi
FROM air_quality
GROUP BY city, country
ORDER BY avg_aqi DESC
LIMIT 10;

-- Monthly average pollution levels by city
SELECT 
    city,
    strftime('%Y-%m', date) as month,
    AVG(pm25) as avg_pm25,
    AVG(pm10) as avg_pm10,
    AVG(no2) as avg_no2,
    AVG(o3) as avg_o3,
    AVG(co) as avg_co,
    AVG(aqi) as avg_aqi
FROM air_quality
GROUP BY city, month
ORDER BY city, month;

-- Cities exceeding WHO guidelines for PM2.5 (10 μg/m³ annual mean)
SELECT 
    city,
    country,
    AVG(pm25) as avg_pm25
FROM air_quality
GROUP BY city, country
HAVING avg_pm25 > 10
ORDER BY avg_pm25 DESC;

-- Seasonal analysis of air quality
SELECT 
    city,
    CASE 
        WHEN strftime('%m', date) IN ('12', '01', '02') THEN 'Winter'
        WHEN strftime('%m', date) IN ('03', '04', '05') THEN 'Spring'
        WHEN strftime('%m', date) IN ('06', '07', '08') THEN 'Summer'
        ELSE 'Fall'
    END as season,
    AVG(aqi) as avg_aqi
FROM air_quality
GROUP BY city, season
ORDER BY city, 
    CASE season
        WHEN 'Winter' THEN 1
        WHEN 'Spring' THEN 2
        WHEN 'Summer' THEN 3
        WHEN 'Fall' THEN 4
    END;