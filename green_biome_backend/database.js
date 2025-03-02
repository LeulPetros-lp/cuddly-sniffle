import sqlite3 from 'sqlite3';
import path from 'path';

// Initialize the SQLite database
const db = new sqlite3.Database(path.resolve('sensor_data.db'), (err) => {
  if (err) {
    console.error('❌ Failed to connect to SQLite database:', err);
  } else {
    console.log('✅ SQLite database connected successfully');
  }
});

// Create a table for storing sensor data
const createTable = () => {
  db.run(
    `CREATE TABLE IF NOT EXISTS sensor_data (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      temperature REAL,
      humidity REAL,
      light1 INTEGER,
      light2 INTEGER,
      avgLight INTEGER,
      soilMoisture INTEGER,
      timestamp TEXT
    )`,
    (err) => {
      if (err) {
        console.error('❌ Error creating table:', err);
      } else {
        console.log('✅ Sensor data table created successfully');
      }
    }
  );
};

// Call the function to create the table if not already created
createTable();

// Function to insert sensor data with a timestamp
const insertSensorData = (data) => {
  const query = `
    INSERT INTO sensor_data (temperature, humidity, light1, light2, avgLight, soilMoisture, timestamp)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  const params = [
    data.temperature,
    data.humidity,
    data.light1,
    data.light2,
    data.avgLight,
    data.soilMoisture,
    new Date().toISOString(),  // Store the timestamp at the moment of insertion
  ];

  db.run(query, params, (err) => {
    if (err) {
      console.error('❌ Error inserting sensor data:', err);
    } else {
      console.log('✅ Sensor data inserted with timestamp');
    }
  });
};

// Function to get the latest sensor data from the database (with timestamps)
const getLatestData = (limit = 5, callback) => {
  const query = `SELECT * FROM sensor_data ORDER BY timestamp DESC LIMIT ?`;
  db.all(query, [limit], (err, rows) => {
    if (err) {
      console.error('❌ Error fetching data:', err);
      callback([]);
    } else {
      callback(rows);
    }
  });
};

export { insertSensorData, getLatestData };
