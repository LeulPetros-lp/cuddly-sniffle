#include <Adafruit_Sensor.h>
#include <DHT.h>
#include <DHT_U.h>

#define DHTPIN 5       // DHT sensor connected to digital pin 5
#define DHTTYPE DHT11  // Change to DHT22 if using it
#define SOIL_MOISTURE_PIN A6  // Soil moisture sensor connected to A6

int ldrPin1 = A0;  // First LDR connected to Analog Pin A0
int ldrPin2 = A3;  // Second LDR connected to Analog Pin A3

DHT dht(DHTPIN, DHTTYPE);

void setup() {
  Serial.begin(9600);
  dht.begin();
}

void loop() {
  // Read Temperature & Humidity
  float temperature = dht.readTemperature();
  float humidity = dht.readHumidity();

  // Read Light Levels from Both LDRs
  int lightValue1 = analogRead(ldrPin1);
  int lightValue2 = analogRead(ldrPin2);

  // Remap and constrain the LDR values to always be between 80-100
  float lightPercent1 = constrain(map(lightValue1, 0, 1023, 80, 100), 80, 100);
  float lightPercent2 = constrain(map(lightValue2, 0, 1023, 80, 100), 80, 100);

  // Calculate Average Light Value
  float avgLightPercent = (lightPercent1 + lightPercent2) / 2;

  // Read Soil Moisture Sensor (Analog)
  int soilMoistureValue = analogRead(SOIL_MOISTURE_PIN);
  float soilMoisturePercent = map(soilMoistureValue, 1023, 0, 0, 100);  // Convert to %

  // Send data as JSON to the Serial Port
  Serial.print("{");
  Serial.print("\"temperature\":");
  Serial.print(temperature);
  Serial.print(",\"humidity\":");
  Serial.print(humidity);
  Serial.print(",\"light1\":");
  Serial.print(lightPercent1);
  Serial.print(",\"light2\":");
  Serial.print(lightPercent2);
  Serial.print(",\"avgLight\":");
  Serial.print(avgLightPercent);
  Serial.print(",\"soilMoisture\":");
  Serial.print(soilMoisturePercent);
  Serial.println("}");

  delay(60000); 
}
