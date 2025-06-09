#include <Wire.h>
#include "SparkFunBME280.h"
#include "SparkFunENS160.h"
#include <ArduinoJson.h> //download 

#if defined(ESP8266)
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#elif defined(ESP32)
#include <WiFi.h>
#include <HTTPClient.h>
#endif
#include <WiFiClient.h>

// WiFi credentials
const char *ssid = "YOUR_WIFI_SSID";
const char *password = "YOUR_WIFI_PASSWORD";

// Express.js server URL
const char *server_url = "http://YOUR_SERVER_IP:3000/api/sensor-data";

// Sensor objects
BME280 bme;
SparkFunENS160 ens160;

// Variables to store sensor data
float temperature, humidity, pressure;
uint8_t aqi;
uint16_t tvoc, eco2;
String air_quality_text;

// Timing variables
unsigned long lastSensorReadTime = 0;
unsigned long lastDataSendTime = 0;
const long sensorReadInterval = 5000; // Read sensors every 5 seconds
const long dataSendInterval = 60000;  // Send data every 60 seconds (1 minute)

// Device ID
String device_id = "arduino_sensor_1"; // Can be set to any identifier you want

void setup()
{
  Serial.begin(115200);
  while (!Serial)
  {
    // Wait for Serial connection
  }

  Serial.println("SparkFun ENS160/BME280 Express.js Data Sender");

  // Initialize WiFi connection
  setupWifi();

  Wire.begin();

  // Initialize BME280 sensor
  if (bme.beginI2C() == false)
  {
    Serial.println("BME280 sensor did not respond. Check wiring.");
    while (1)
      ; // Halt execution
  }

  // Initialize ENS160 sensor
  if (ens160.begin() == false)
  {
    Serial.println("ENS160 sensor did not respond. Check wiring.");
    while (1)
      ; // Halt execution
  }

  // Configure ENS160 operating mode
  ens160.setOperatingMode(ENS160_STANDARD);

  Serial.println("Both sensors initialized successfully!");
}

void loop()
{
  // Reconnect WiFi if disconnected
  if (WiFi.status() != WL_CONNECTED)
  {
    setupWifi();
  }

  // Read sensor data at defined intervals
  if (millis() - lastSensorReadTime >= sensorReadInterval)
  {
    readSensorData();
    printSensorData(); // Output sensor values to Serial for debugging
    lastSensorReadTime = millis();
  }

  // Send collected data to the Express.js server at defined intervals
  if (millis() - lastDataSendTime >= dataSendInterval)
  {
    sendDataToServer();
    lastDataSendTime = millis();
  }
}

void setupWifi()
{
  delay(10);
  Serial.println();
  Serial.print("Connecting to WiFi: ");
  Serial.println(ssid);

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED)
  {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("WiFi connected");
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());
}

void readSensorData()
{
  // Read environmental data from BME280 sensor
  temperature = bme.readTempC();
  humidity = bme.readFloatHumidity();
  pressure = bme.readFloatPressure() / 100.0F; // Convert pressure to hPa

  // Provide temperature and humidity compensation data to ENS160 sensor
  ens160.setTempCompensation(temperature);
  ens160.setHumidityCompensation(humidity);

  // Allow ENS160 sensor time to adjust to new compensation data
  delay(50);

  // Check if ENS160 data is valid and ready to be read
  if (ens160.checkDataStatus() && ens160.dataAvailable())
  {
    // Read air quality measurements from ENS160
    aqi = ens160.getAQI();   // Air Quality Index
    tvoc = ens160.getTVOC(); // Total Volatile Organic Compounds (ppb)
    eco2 = ens160.getECO2(); // Equivalent CO2 concentration (ppm)

    // Convert AQI numeric value to descriptive text
    air_quality_text = getAirQualityText(aqi);
  }
  else
  {
    Serial.println("ENS160 data not available");
    aqi = 0;
    tvoc = 0;
    eco2 = 0;
    air_quality_text = "Unknown";
  }
}

String getAirQualityText(uint8_t aqi)
{
  switch (aqi)
  {
  case 1:
    return "Excellent";
  case 2:
    return "Good";
  case 3:
    return "Moderate";
  case 4:
    return "Poor";
  case 5:
    return "Unhealthy";
  default:
    return "Unknown";
  }
}

void printSensorData()
{
  Serial.println("\n----- Sensor Readings -----");

  // Print BME280 sensor data
  Serial.print("Temperature: ");
  Serial.print(temperature, 1);
  Serial.println(" °C");

  Serial.print("Humidity: ");
  Serial.print(humidity, 1);
  Serial.println(" %");

  Serial.print("Pressure: ");
  Serial.print(pressure, 1);
  Serial.println(" hPa");

  // Print ENS160 air quality data
  Serial.print("Air Quality Index: ");
  Serial.print(aqi);
  Serial.print(" (");
  Serial.print(air_quality_text);
  Serial.println(")");

  Serial.print("TVOC: ");
  Serial.print(tvoc);
  Serial.println(" ppb");

  Serial.print("eCO2: ");
  Serial.print(eco2);
  Serial.println(" ppm");
}

void sendDataToServer()
{
  // Verify WiFi connection status before sending data
  if (WiFi.status() == WL_CONNECTED)
  {
    WiFiClient client;
    HTTPClient http;

    Serial.print("Connecting to server: ");
    Serial.println(server_url);

    // Initialize HTTP connection
    http.begin(client, server_url);
    http.addHeader("Content-Type", "application/json");

    // Prepare JSON document with sensor data
    StaticJsonDocument<256> jsonDoc;

    jsonDoc["device_id"] = device_id;
    jsonDoc["temperature"] = temperature;
    jsonDoc["humidity"] = humidity;
    jsonDoc["pressure"] = pressure;
    jsonDoc["aqi"] = aqi;
    jsonDoc["air_quality"] = air_quality_text;
    jsonDoc["tvoc"] = tvoc;
    jsonDoc["eco2"] = eco2;
    jsonDoc["timestamp"] = millis();

    // Convert JSON document to string
    String jsonString;
    serializeJson(jsonDoc, jsonString);

    // Send HTTP POST request with JSON payload
    int httpResponseCode = http.POST(jsonString);

    if (httpResponseCode > 0)
    {
      String response = http.getString();
      Serial.print("HTTP Response code: ");
      Serial.println(httpResponseCode);
      Serial.println("Response: " + response);
    }
    else
    {
      Serial.print("Error on sending POST: ");
      Serial.println(httpResponseCode);
    }

    // End HTTP connection
    http.end();
  }
  else
  {
    Serial.println("WiFi Disconnected");
  }
}
