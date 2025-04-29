const mongoose = require('mongoose');

const airQualitySchema = new mongoose.Schema({
  city: {
    type: String,
    required: true,
    trim: true
  },
  country: {
    type: String,
    required: true,
    trim: true
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  measurements: {
    aqi: {
      type: Number,
      required: true
    },
    pm25: Number,
    pm10: Number,
    no2: Number,
    o3: Number,
    co: Number
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

// Create index for geospatial queries
airQualitySchema.index({ location: '2dsphere' });

module.exports = mongoose.model('AirQuality', airQualitySchema);