const mongoose = require("mongoose");

// Define the schema for the sensor data
const sensorDataSchema = new mongoose.Schema({
  timestamp: {
    type: Date,
    required: true,
    default: Date.now, // Automatically sets the current date and time
  },
  temperature: {
    type: Number,
    required: true,
  },
  humidity: {
    type: Number,
    required: true,
  },
  light1: {
    type: Number,
    required: true,
  },
  light2: {
    type: Number,
    required: true,
  },
  avgLight: {
    type: Number,
    required: true,
  },
  soilMoisture: {
    type: Number,
    required: true,
 },
});

const SensorData = mongoose.model("SensorData", sensorDataSchema);

module.exports = SensorData;
