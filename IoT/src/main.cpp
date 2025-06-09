/**
 * @file main.cpp
 * @author SyntaxSquad (https://github.com/flaxdrop/ChasChallenge)
 * @brief Main file of the project containing setup() and loop() for Arduino microcontroller
 * @version 0.1
 * @date 2025-05-30
 *
 * @copyright Copyright (c) 2025
 *
 */
#include <WiFiS3.h>
#include <WiFiSSLClient.h>
#include <ArduinoHttpClient.h>
#include <Wire.h>
#include <sps30.h>
#include <SparkFunBME280.h>
#include <SparkFun_ENS160.h>
#include <secret.h>

// Your WiFi network
/**
 * @brief The name of the WiFi network the program attempts to connect to.
 *
 * The value "hidden_ssid" is retrieved from secret.h
 */
const char* ssid = hidden_ssid;
/**
 * @brief The password of the WiFi network the program attempts to connect to.
 *
 * The value "hidden_password" is retrieved from secret.h
 */
const char* password = hidden_password;

// Server settings
/**
 * @brief Hostname of the backend server that the code connects to.
 *
 * This is the address used to connect to the Chas Challenge backend API.
 * It is used by the networking module to send and receive data.
 */
const char* serverHost = "chaschallenge-backend.onrender.com"; // Replace with your server IP
/**
 * @brief Port number used to connect to the backend server.
 *
 * The default port for HTTPS (443) is used to send and receive data
 * via a secure connection to the Chas Challenge backend.
 */
const int serverPort = 443;
/**
 * @brief Endpoint path on the backend server for measurement data.
 *
 * Used by the client to send or retrieve measurements via the API.
 * Typically combined with serverHost and serverPort to construct the full URL.
 */
const char* serverPath = "/measurements";
/**
 * @brief Pin number for the red LED on the traffic light module.
 *
 * Default value is D5 on the microcontroller.
 */
const int redLedPin = 5;
/**
 * @brief Pin number for the yellow LED on the traffic light module.
 *
 * Default value is D6 on the microcontroller.
 */
const int yellowLedPin = 6;
/**
 * @brief Pin number for the green LED on the traffic light module.
 *
 * Default value is D7 on the microcontroller.
 */
const int greenLedPin = 7;
/**
 * @brief Object of the BME280 class for reading temperature, humidity, and air pressure.
 *
 * Used to collect indoor environmental data.
 */
BME280 mySensor;
/**
 * @brief ENS160 sensor for air quality analysis (AQI, TVOC, eCO2).
 *
 * Used to indicate air quality and compensate using temperature/humidity data.
 */
SparkFun_ENS160 myENS;
/**
 * @brief SSL-encrypted WiFi client for HTTPS communication.
 *
 * Used by HttpClient to securely communicate with the backend server.
 */
WiFiSSLClient wifi;
/**
 * @brief HTTP client that sends data to the Chas Challenge backend via a POST request.
 *
 * Uses WiFiSSLClient as the transport layer and sends JSON data to the server.
 */
HttpClient client = HttpClient(wifi, serverHost, serverPort);
/**
 * @brief Initializes the system and connects to sensors and WiFi.
 *
 * Executes the following steps:
 * - Starts serial communication
 * - Configures the I2C bus
 * - Initializes LED pins for air quality indication
 * - Connects to WiFi
 * - Initializes the BME280, ENS160, and SPS30 sensors
 */
void setup()
{
    Serial.begin(115200); // Start Serial monitor
    Wire1.begin(); // Initialize secondary I2C bus (Wire1) used by BME280 and ENS160

    pinMode(redLedPin, OUTPUT);
    pinMode(yellowLedPin, OUTPUT);
    pinMode(greenLedPin, OUTPUT);

    digitalWrite(redLedPin, LOW);
    digitalWrite(yellowLedPin, LOW);
    digitalWrite(greenLedPin, LOW);

    // Connect to WiFi
    Serial.print("Connecting to WiFi...");
    while (WiFi.begin(ssid, password) != WL_CONNECTED)
    {
        delay(1000);
        Serial.print(".");
    }
    Serial.println("\nWiFi connected!");

    if (!mySensor.beginI2C(Wire1))
    {
        Serial.println("BME280 failed to connect.");
        while (1);
    }

    if (!myENS.begin(Wire1))
    {
        Serial.println("ENS160 failed to connect.");
        while (1);
    }

    myENS.setOperatingMode(SFE_ENS160_STANDARD);

    sensirion_i2c_init();
    if (sps30_probe() != 0 || sps30_start_measurement() < 0)
    {
        Serial.println("SPS30 could not start.");
        while (1);
    }
}
/**
 * @brief Main loop for collecting, processing, and sending measurement data.
 *
 * Each iteration performs the following steps:
 * - Reads temperature, humidity, and pressure from BME280
 * - Applies temperature compensation to ENS160
 * - Retrieves air quality values (AQI, TVOC, eCO2) from ENS160
 * - Controls LED indicators based on AQI
 * - Reads particle data from SPS30 if available
 * - Formats and sends JSON payload via HTTP POST request
 */
void loop()
{
    /**
     * @brief Stores value from readTempC() of BME280 class
     *
     * Used in building the JSON string.
     */
    float temperature = mySensor.readTempC();
    /**
     * @brief Stores value from readFloatHumidity() of BME280 class
     *
     * Used in building the JSON string.
     */
    float humidity = mySensor.readFloatHumidity();
    /**
     * @brief Stores value from readFloatPressure() of BME280 class
     *
     * Used in building the JSON string.
     */
    float pressure = mySensor.readFloatPressure();

    myENS.setTempCompensation(temperature);
    // myENS.setHumidityCompensation(humidity); // Uncomment if supported and no error

    /**
     * @brief Stores value from getAQI() of SparkFun_ENS160 class
     *
     * Used in building the JSON string.
     */
    int aqi = myENS.getAQI();
    /**
     * @brief Stores value from getTVOC() of SparkFun_ENS160 class
     *
     * Used in building the JSON string.
     */
    int tvoc = myENS.getTVOC();
    /**
     * @brief Stores value from getECO2() of SparkFun_ENS160 class
     *
     * Used in building the JSON string.
     */
    int eco2 = myENS.getECO2();

    if (aqi <= 2)
    {
        // Good air quality
        digitalWrite(greenLedPin, HIGH);
        digitalWrite(yellowLedPin, LOW);
        digitalWrite(redLedPin, LOW);
    }
    else if (aqi == 3)
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

    /**
     * @brief Struct to store measurement data from the SPS30 particle sensor.
     *
     * Contains mass concentration (μg/m³),
     * particle count per volume, and typical particle size.
     * Populated if sps30_read_measurement() succeeds.
     */
    struct sps30_measurement particulates;
    /**
     * @brief Indicates if new data is available from the SPS30 sensor.
     *
     * Retrieved from sps30_read_data_ready(). If value is 1, new data is available.
     */
    uint16_t data_ready;
    /**
     * @brief Flag indicating if valid SPS30 data was read.
     *
     * Set to true if both:
     * - the sensor has new data (data_ready = 1), and
     * - measurement was read successfully (sps30_read_measurement() == 0)
     */
    bool sps30_data_available = false;

    if (sps30_read_data_ready(&data_ready) == 0 && data_ready)
    {
        if (sps30_read_measurement(&particulates) == 0)
        {
            sps30_data_available = true;
        }
        else
        {
            Serial.println("Failed to read SPS30 data.");
        }
    }

    /**
     * @brief JSON string containing all collected sensor data.
     *
     * Constructed in loop() and used as the payload in the POST request to the backend server.
     * Includes temperature, humidity, pressure, air quality (AQI, TVOC, eCO2),
     * and particle densities if available.
     */
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

    Serial.println("Payload to be sent:");
    Serial.println(json);

    // Send POST request
    Serial.println("Sending data to server...");
    client.beginRequest();
    client.post(serverPath);
    client.sendHeader("Content-Type", "application/json");
    client.sendHeader("Content-Length", json.length());
    client.beginBody();
    client.print(json);
    client.endRequest();

    /**
     * @brief HTTP status code returned by the backend server after the POST request.
     *
     * Example: 200 (OK), 400 (Bad Request), 500 (Server Error), etc.
     * Used to verify if the data submission was successful.
     */
    int statusCode = client.responseStatusCode();
    /**
     * @brief Response body from the backend server in text format.
     *
     * May contain error messages or confirmations from the API.
     * Used for debugging and logging.
     */
    String response = client.responseBody();

    Serial.print("Response from server: ");
    Serial.println(statusCode);
    Serial.println(response);

    delay(10000); // Wait 10 seconds
}
