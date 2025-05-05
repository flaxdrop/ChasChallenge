#include <WiFi.h>
#include <HTTPClient.h>
#include <Wire.h>
#include <sps30.h>
#include <SparkFunBME280.h>
#include <SparkFun_ENS160.h>
#include <WiFiManager.h>

const char *serverUrl = "http://<SERVER_IP>/add-data";

BME280 mySensor;
SparkFun_ENS160 myENS;

void setup()
{
    Serial.begin(115200);
    Wire.begin();

    // Initialize WiFiManager
    WiFiManager wifiManager;

    // On first boot or if connection fails, create an AP named "AirQualitySensor"
    // User connects to this AP and configures WiFi through a captive portal
    wifiManager.autoConnect("AirQualitySensor");

    // After this point, WiFi is connected
    Serial.println("WiFi connected!");

    if (!mySensor.beginI2C())
    {
        Serial.println("BME280 anslöt inte.");
        while (1)
            ;
    }

    if (!myENS.begin())
    {
        Serial.println("ENS160 anslöt inte.");
        while (1)
            ;
    }

    myENS.setOperatingMode(SFE_ENS160_STANDARD);
    sensirion_i2c_init();
    if (sps30_probe() != 0 || sps30_start_measurement() < 0)
    {
        Serial.println("SPS30 kunde inte starta.");
        while (1)
            ;
    }
}

void loop()
{
    // Läs sensorvärden
    float temperature = mySensor.readTempC();
    float humidity = mySensor.readFloatHumidity();
    float pressure = mySensor.readFloatPressure();

    // Apply temperature compensation to ENS160
    myENS.setTempCompensation(temperature);
    myENS.setHumidityCompensation(humidity);

    // Read air quality data
    int aqi = myENS.getAQI();
    int tvoc = myENS.getTVOC();
    int eco2 = myENS.getECO2();

    // Read particulate matter data
    struct sps30_measurement particulates;
    uint16_t data_ready;
    bool sps30_data_available = false;

    if (sps30_read_data_ready(&data_ready) == 0 && data_ready)
    {
        if (sps30_read_measurement(&particulates) == 0)
        {
            sps30_data_available = true;
        }
        else
        {
            Serial.println("Failed to read SPS30");
        }
    }

    // Skapa JSON-sträng
    String json = "{";
    json += "\"timestamp\":" + String(millis()) + ",";
    json += "\"temperature\":" + String(temperature, 2) + ",";
    json += "\"humidity\":" + String(humidity, 2) + ",";
    json += "\"pressure\":" + String(pressure, 2) + ",";
    json += "\"aqi\":" + String(aqi) + ",";
    json += "\"tvoc\":" + String(tvoc) + ",";
    json += "\"eco2\":" + String(eco2);
    json += ",\"pm1\":" + String(particulates.mc_1p0, 2);
    json += ",\"pm2_5\":" + String(particulates.mc_2p5, 2);
    json += ",\"pm10\":" + String(particulates.mc_10p0, 2);
    json += "}";

    // Skicka till server
    if (WiFi.status() == WL_CONNECTED)
    {
        HTTPClient http;
        http.begin(serverUrl);
        http.addHeader("Content-Type", "application/json");
        int httpResponseCode = http.POST(json);
        Serial.print("Svar från server: ");
        Serial.println(httpResponseCode);
        http.end();
    }

    delay(10000); // Vänta 10 sekunder
}
