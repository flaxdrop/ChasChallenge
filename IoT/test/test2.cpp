#include <Arduino.h>
#include <Wire.h>
#include "SparkFunBME280.h"
#include "SparkFun_ENS160.h"
// prev main.cpp
BME280 bme;
SparkFun_ENS160 ens160;

// Function prototype for printAirQualityDescription
void printAirQualityDescription(uint8_t aqi);

void setup()
{
  Serial.begin(115200);
  while (!Serial)
  {
    // Wait for serial connection
  }

  Serial.println("SparkFun ENS160/BME280 Combo Sensor Example");

  Wire.begin();

  // Initialize BME280
  if (bme.beginI2C() == false)
  {
    Serial.println("BME280 sensor did not respond. Check wiring.");
    while (1)
      ; // Freeze
  }

  // Initialize ENS160
  if (ens160.begin() == false)
  {
    Serial.println("ENS160 sensor did not respond. Check wiring.");
    while (1)
      ; // Freeze
  }

  // Set up the ENS160 for standard operation
  ens160.setOperatingMode(0x02); // 0x02 corresponds to standard mode based on ENS160 documentation

  // For better air quality readings, we can provide temperature and humidity data from BME280
  Serial.println("Both sensors initialized successfully!");
}

void loop()
{
  // Read BME280 data
  float temperature = bme.readTempC();
  float humidity = bme.readFloatHumidity();
  float pressure = bme.readFloatPressure() / 100.0F; // Convert to hPa

  // Send temperature and humidity to ENS160 for compensation
  ens160.setTempCompensation(temperature);
  // Removed as 'setHumidityCompensation' is not a valid method for SparkFun_ENS160

  // Give the ENS160 time to use the new temp and humidity data
  delay(50);

  // Check if ENS160 data is available and valid
  if (ens160.checkDataStatus())
  {
    // Read air quality metrics from ENS160
    uint8_t aqi = ens160.getAQI();    // Air Quality Index
    uint16_t tvoc = ens160.getTVOC(); // Total Volatile Organic Compounds (ppb)
    uint16_t eco2 = ens160.getECO2(); // Equivalent CO2 (ppm)

    // Print all sensor readings
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
    Serial.println(aqi);
    printAirQualityDescription(aqi);

    Serial.print("TVOC: ");
    Serial.print(tvoc);
    Serial.println(" ppb");

    Serial.print("eCO2: ");
    Serial.print(eco2);
    Serial.println(" ppm");
  }

  delay(2000); // Update every 2 seconds
}

// Function to print descriptive AQI information
void printAirQualityDescription(uint8_t aqi)
{
  Serial.print("Air Quality: ");

  switch (aqi)
  {
  case 1:
    Serial.println("Excellent");
    break;
  case 2:
    Serial.println("Good");
    break;
  case 3:
    Serial.println("Moderate");
    break;
  case 4:
    Serial.println("Poor");
    break;
  case 5:
    Serial.println("Unhealthy");
    break;
  default:
    Serial.println("Invalid/Unknown");
  }
}