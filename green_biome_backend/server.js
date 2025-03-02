import express from 'express';
import cors from 'cors';
import { SerialPort, ReadlineParser } from 'serialport';
import { insertSensorData, getLatestData } from './database.js'; // Import the SQLite functions

const app = express();
const port = 1234;
app.use(cors());

// ✅ Arduino Serial Port Setup
const arduinoPort = new SerialPort({
  path: "/dev/cu.usbmodem1401", // Update with your port path
  baudRate: 9600,
});

const parser = arduinoPort.pipe(new ReadlineParser({ delimiter: "\n" }));

// ✅ Handle Incoming Data from Arduino
parser.on("data", async (data) => {
  try {
    console.log("📥 Raw Data from Arduino:", data);
    
    // Check if data is a valid JSON string
    if (!data.trim().startsWith("{") || !data.trim().endsWith("}")) {
      throw new Error("Invalid JSON format received");
    }
    
    // Replace 'nan' with null or another value
    const sanitizedData = data.trim().replace(/nan/g, 'null');
    const jsonData = JSON.parse(sanitizedData);

    // Insert the sensor data with timestamp into the SQLite database
    insertSensorData(jsonData);
  } catch (error) {
    console.error("❌ Error parsing JSON or saving data:", error.message);
  }
});


const getFakeData = () => ({
  temperature: 25,
  humidity: 60,
  light1: 100,
  light2: 150,
  avgLight: 125,
  soilMoisture: 40,
  timestamp: new Date().toISOString(),
});

// ✅ API Endpoints
const fetchData = async (res, field) => {
  try {
    getLatestData(5, (data) => {
      if (data.length === 0) throw new Error("No data found");
      res.json(data.map(item => ({
        [field]: item[field],
        timestamp: item.timestamp,  // Include the timestamp in the response
      })));
    });
  } catch (error) {
    console.error(`❌ Error fetching ${field} data:`, error.message);
    res.json([{ [field]: getFakeData()[field], timestamp: new Date().toISOString() }]);
  }
};

app.get("/temperature", (req, res) => fetchData(res, "temperature"));
app.get("/humidity", (req, res) => fetchData(res, "humidity"));
app.get("/soilMoisture", (req, res) => fetchData(res, "soilMoisture"));
app.get("/light", async (req, res) => {
  try {
    getLatestData(5, (data) => {
      if (data.length === 0) throw new Error("No data found");
      res.json(data.map(item => ({
        light1: item.light1,
        light2: item.light2,
        avgLight: item.avgLight,
        timestamp: item.timestamp,  // Include the timestamp in the response
      })));
    });
  } catch (error) {
    console.error("❌ Error fetching light data:", error.message);
    res.json([{ ...getFakeData(), timestamp: new Date().toISOString() }]);
  }
});

app.get("/generalReport", async (req, res) => {
  try {
    getLatestData(10, (data) => {
      if (data.length === 0) throw new Error("No data found");
      res.json(data.map(item => ({
        ...item,  // Include all fields from the row
        timestamp: item.timestamp,  // Include the timestamp in the response
      })));
    });
  } catch (error) {
    console.error("❌ Error fetching general report:", error.message);
    res.json([{ ...getFakeData(), timestamp: new Date().toISOString() }]);
  }
});

// ✅ Start Server
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
