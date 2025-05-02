#include <Wire.h>
#include "SparkFunBME280.h"
#include "SparkFunENS160.h"
#include <ArduinoJson.h> //ladda ner

#if defined(ESP8266)
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#elif defined(ESP32)
#include <WiFi.h>
#include <HTTPClient.h>
#endif
#include <WiFiClient.h>

// WiFi creds
const char *ssid = "YOUR_WIFI_SSID";
const char *password = "YOUR_WIFI_PASSWORD";

// Express.js server
const char *server_url = "http://YOUR_SERVER_IP:3000/api/sensor-data";

// Sensor object
BME280 bme;
SparkFunENS160 ens160;

// Variabler för att lagra data
float temperature, humidity, pressure;
uint8_t aqi;
uint16_t tvoc, eco2;
String air_quality_text;

// Timing variabler
unsigned long lastSensorReadTime = 0;
unsigned long lastDataSendTime = 0;
const long sensorReadInterval = 5000; // Read sensors every 5 seconds
const long dataSendInterval = 60000;  // Send data every 60 seconds (1 minute)

// Device id
String device_id = "arduino_sensor_1"; // You can set this to whatever you want

void setup()
{
  Serial.begin(115200);
  while (!Serial)
  {
    // wait for connection
  }

  Serial.println("SparkFun ENS160/BME280 Express.js Data Sender");

  // Setup WiFi
  setupWifi();

  Wire.begin();

  // Init BME280
  if (bme.beginI2C() == false)
  {
    Serial.println("BME280 sensor did not respond. Check wiring.");
    while (1)
      ; // Freeze
  }

  // Init ENS160
  if (ens160.begin() == false)
  {
    Serial.println("ENS160 sensor did not respond. Check wiring.");
    while (1)
      ; // Freeze
  }

  // Set up the ENS160
  ens160.setOperatingMode(ENS160_STANDARD);

  Serial.println("Both sensors initialized successfully!");
}

void loop()
{
  // check WiFi connection
  if (WiFi.status() != WL_CONNECTED)
  {
    setupWifi();
  }

  // Read sensor data
  if (millis() - lastSensorReadTime >= sensorReadInterval)
  {
    readSensorData();
    printSensorData(); // Print to Serial for debugging
    lastSensorReadTime = millis();
  }

  // Send data to Express.js server
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
  // Read BME280 data
  temperature = bme.readTempC();
  humidity = bme.readFloatHumidity();
  pressure = bme.readFloatPressure() / 100.0F; // Convert to hPa

  // Send temperature and humidity to ENS160 for compensation
  ens160.setTempCompensation(temperature);
  ens160.setHumidityCompensation(humidity);

  // Give the ENS160 time to use the new temp and humidity data
  delay(50);

  // Check if ENS160 data is available and valid
  if (ens160.checkDataStatus() && ens160.dataAvailable())
  {
    // Read air quality metrics from ENS160
    aqi = ens160.getAQI();   // Air Quality Index
    tvoc = ens160.getTVOC(); // Total Volatile Organic Compounds (ppb)
    eco2 = ens160.getECO2(); // Equivalent CO2 (ppm)

    // Get text description of air quality
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

  // BME280 readings
  Serial.print("Temperature: ");
  Serial.print(temperature, 1);
  Serial.println(" °C");

  Serial.print("Humidity: ");
  Serial.print(humidity, 1);
  Serial.println(" %");

  Serial.print("Pressure: ");
  Serial.print(pressure, 1);
  Serial.println(" hPa");

  // ENS160 readings
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
  // Check WiFi connection status
  if (WiFi.status() == WL_CONNECTED)
  {
    WiFiClient client;
    HTTPClient http;

    Serial.print("Connecting to server: ");
    Serial.println(server_url);

    // Start HTTP connection
    http.begin(client, server_url);
    http.addHeader("Content-Type", "application/json");

    // Create JSON document
    StaticJsonDocument<256> jsonDoc;

    // Add data to JSON document
    jsonDoc["device_id"] = device_id;
    jsonDoc["temperature"] = temperature;
    jsonDoc["humidity"] = humidity;
    jsonDoc["pressure"] = pressure;
    jsonDoc["aqi"] = aqi;
    jsonDoc["air_quality"] = air_quality_text;
    jsonDoc["tvoc"] = tvoc;
    jsonDoc["eco2"] = eco2;
    jsonDoc["timestamp"] = millis();

    // Serialize JSON to string
    String jsonString;
    serializeJson(jsonDoc, jsonString);

    // Send HTTP POST request
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

    // Free
    http.end();
  }
  else
  {
    Serial.println("WiFi Disconnected");
  }
}
