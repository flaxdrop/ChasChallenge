#include <WiFiS3.h>
//#include <WiFiClient.h>
#include <WiFiSSLClient.h>
#include <ArduinoHttpClient.h>
#include <Wire.h>
#include <sps30.h>
#include <SparkFunBME280.h>
#include <SparkFun_ENS160.h>
#include <secret.h>

// Ditt WiFi-nätverk
const char* ssid = hidden_ssid;
const char* password = hidden_password;

// Serverinställningar
const char* serverHost = "chaschallenge-backend.onrender.com";  // Ersätt med din server IP
const int serverPort = 443;
const char* serverPath = "/measurements";

const int redLedPin = 5;    
const int yellowLedPin = 6; 
const int greenLedPin = 7;  
BME280 mySensor;
SparkFun_ENS160 myENS;
WiFiSSLClient wifi;
HttpClient client = HttpClient(wifi, serverHost, serverPort);

void setup()
{
    Serial.begin(115200);
    Wire1.begin();

    pinMode(redLedPin, OUTPUT);
    pinMode(yellowLedPin, OUTPUT);
    pinMode(greenLedPin, OUTPUT);

    digitalWrite(redLedPin, LOW);
    digitalWrite(yellowLedPin, LOW);
    digitalWrite(greenLedPin, LOW);

    // Anslut till WiFi
    Serial.print("Ansluter till WiFi...");
    while (WiFi.begin(ssid, password) != WL_CONNECTED)
    {
        delay(1000);
        Serial.print(".");
    }
    Serial.println("\nWiFi ansluten!");

    if (!mySensor.beginI2C(Wire1))
    {
        Serial.println("BME280 anslöt inte.");
        while (1);
    }

    if (!myENS.begin(Wire1))
    {
        Serial.println("ENS160 anslöt inte.");
        while (1);
    }

    myENS.setOperatingMode(SFE_ENS160_STANDARD);

    sensirion_i2c_init();
    if (sps30_probe() != 0 || sps30_start_measurement() < 0)
    {
        Serial.println("SPS30 kunde inte starta.");
        while (1);
    }
}

void loop()
{
    float temperature = mySensor.readTempC();
    float humidity = mySensor.readFloatHumidity();
    float pressure = mySensor.readFloatPressure();

    myENS.setTempCompensation(temperature);
    // myENS.setHumidityCompensation(humidity); // Kommenterad om funktionen ger error

    int aqi = myENS.getAQI();
    int tvoc = myENS.getTVOC();
    int eco2 = myENS.getECO2();

    if (aqi <= 2)
    {
        // Good air quality
        digitalWrite(greenLedPin, HIGH);
        digitalWrite(yellowLedPin, LOW);
        digitalWrite(redLedPin, LOW);
    }
    else if (aqi = 3)
    {
        // Moderate air quality
        digitalWrite(greenLedPin, LOW);
        digitalWrite(yellowLedPin, HIGH);
        digitalWrite(redLedPin, LOW);
    }
    else
    {
        // Poor air quality
        digitalWrite(greenLedPin, LOW);
        digitalWrite(yellowLedPin, LOW);
        digitalWrite(redLedPin, HIGH);
    }

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
            Serial.println("Kunde inte läsa SPS30-data.");
        }
    }

    String json = "{";
    json += "\"temperature\":" + String(temperature, 2) + ",";
    json += "\"humidity\":" + String(humidity, 2) + ",";
    json += "\"pressure\":" + String((int)pressure) + ",";
    json += "\"aqi\":" + String(aqi) + ",";
    json += "\"tvoc\":" + String(tvoc) + ",";
    json += "\"eco2\":" + String(eco2);

    if (sps30_data_available)
    {
        json += ",\"pm1\":" + String(particulates.mc_1p0, 2);
        json += ",\"pm2_5\":" + String(particulates.mc_2p5, 2);
        json += ",\"pm4\":" + String(particulates.mc_4p0, 2);
        json += ",\"pm10\":" + String(particulates.mc_10p0, 2);

        json += ",\"nc_0_5\":" + String(particulates.nc_0p5, 2);
        json += ",\"nc_1_0\":" + String(particulates.nc_1p0, 2);
        json += ",\"nc_2_5\":" + String(particulates.nc_2p5, 2);
        json += ",\"nc_4_0\":" + String(particulates.nc_4p0, 2);
        json += ",\"nc_10_0\":" + String(particulates.nc_10p0, 2);

        json += ",\"typical_particle_size\":" + String(particulates.typical_particle_size, 2);
    }

    json += "}";

    Serial.println("Payload som skickas:");
    Serial.println(json);

    // Skicka POST-request
    Serial.println("Skickar data till server...");
    client.beginRequest();
    client.post(serverPath);
    client.sendHeader("Content-Type", "application/json");
    client.sendHeader("Content-Length", json.length());
    client.beginBody();
    client.print(json);
    client.endRequest();

    int statusCode = client.responseStatusCode();
    String response = client.responseBody();

    Serial.print("Svar från server: ");
    Serial.println(statusCode);
    Serial.println(response);

    delay(10000); // Vänta 10 sekunder
}

