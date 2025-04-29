const express = require('express');
const router = express.Router();
const AirQuality = require('../models/AirQuality');

// Get latest air quality data for all cities
router.get('/cities', async (req, res) => {
  try {
    const airQualityData = await AirQuality.aggregate([
      { $sort: { timestamp: -1 } },
      {
        $group: {
          _id: '$city',
          latestData: { $first: '$$ROOT' }
        }
      },
      { $replaceRoot: { newRoot: '$latestData' } }
    ]);
    res.json(airQualityData);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching air quality data', error: error.message });
  }
});

// Get historical data for a specific city
router.get('/cities/:city/history', async (req, res) => {
  try {
    const { city } = req.params;
    const { days = 7 } = req.query;
    
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - parseInt(days));

    const historicalData = await AirQuality.find({
      city: city,
      timestamp: { $gte: startDate }
    }).sort({ timestamp: 1 });

    res.json(historicalData);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching historical data', error: error.message });
  }
});

// Get most polluted cities
router.get('/most-polluted', async (req, res) => {
  try {
    const { limit = 10 } = req.query;
    
    const pollutedCities = await AirQuality.aggregate([
      { $sort: { timestamp: -1 } },
      {
        $group: {
          _id: '$city',
          latestData: { $first: '$$ROOT' }
        }
      },
      { $replaceRoot: { newRoot: '$latestData' } },
      { $sort: { 'measurements.aqi': -1 } },
      { $limit: parseInt(limit) }
    ]);

    res.json(pollutedCities);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching polluted cities', error: error.message });
  }
});

// Get cleanest cities
router.get('/cleanest', async (req, res) => {
  try {
    const { limit = 10 } = req.query;
    
    const cleanestCities = await AirQuality.aggregate([
      { $sort: { timestamp: -1 } },
      {
        $group: {
          _id: '$city',
          latestData: { $first: '$$ROOT' }
        }
      },
      { $replaceRoot: { newRoot: '$latestData' } },
      { $sort: { 'measurements.aqi': 1 } },
      { $limit: parseInt(limit) }
    ]);

    res.json(cleanestCities);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cleanest cities', error: error.message });
  }
});

module.exports = router;