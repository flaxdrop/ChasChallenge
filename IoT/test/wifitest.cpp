#include <WiFiS3.h>
#include <ArduinoHttpClient.h>
#include <Wire.h>
#include <sps30.h>
#include <SparkFunBME280.h>
#include <SparkFun_ENS160.h>

const char *ssid = "YourWiFiName";
const char *password = "YourWiFiPassword";

const char *serverHost = "your-server-ip-or-domain";
const int serverPort = 80;
const char *serverPath = "/add-data";

BME280 mySensor;
SparkFun_ENS160 myENS;

void connectToWiFi()
{
    Serial.print("Connecting to WiFi...");

    if (WiFi.status() == WL_CONNECTED)
    {
        Serial.println("Already connected!");
        return;
    }

    WiFi.begin(ssid, password);

    int timeout = 20;
    while (WiFi.status() != WL_CONNECTED && timeout > 0)
    {
        delay(1000);
        Serial.print(".");
        timeout--;
    }

    if (WiFi.status() == WL_CONNECTED)
    {
        Serial.println("\nWiFi connected!");
        Serial.print("IP address: ");
        Serial.println(WiFi.localIP());
    }
    else
    {
        Serial.println("\nWiFi connection failed!");
    }
}

void setup()
{
    Serial.begin(115200);
    while (!Serial)
    {
        ;
    }

    Wire.begin();

    connectToWiFi();

    if (!mySensor.beginI2C())
    {
        Serial.println("BME280 did not connect.");
        while (1)
            ;
    }

    if (!myENS.begin())
    {
        Serial.println("ENS160 did not connect.");
        while (1)
            ;
    }

    myENS.setOperatingMode(SFE_ENS160_STANDARD);

    sensirion_i2c_init();
    if (sps30_probe() != 0 || sps30_start_measurement() < 0)
    {
        Serial.println("SPS30 could not start.");
        while (1)
            ;
    }

    Serial.println("All sensors initialized!");
}

void loop()
{
    if (WiFi.status() != WL_CONNECTED)
    {
        Serial.println("WiFi disconnected. Reconnecting...");
        connectToWiFi();
    }

    float temperature = mySensor.readTempC();
    float humidity = mySensor.readFloatHumidity();
    float pressure = mySensor.readFloatPressure();

    myENS.setTempCompensation(temperature);
    myENS.setHumidityCompensation(humidity);

    int aqi = myENS.getAQI();
    int tvoc = myENS.getTVOC();
    int eco2 = myENS.getECO2();

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

    if (WiFi.status() == WL_CONNECTED)
    {
        WiFiClient wifi;
        HttpClient client = HttpClient(wifi, serverHost, serverPort);

        Serial.println("Making HTTP POST request...");
        client.beginRequest();
        client.post(serverPath);
        client.sendHeader("Content-Type", "application/json");
        client.sendHeader("Content-Length", json.length());
        client.beginBody();
        client.print(json);
        client.endRequest();

        int statusCode = client.responseStatusCode();
        String response = client.responseBody();

        Serial.print("Status code: ");
        Serial.println(statusCode);
        Serial.print("Response: ");
        Serial.println(response);
    }

    delay(10000); // Wait 10 seconds
}
