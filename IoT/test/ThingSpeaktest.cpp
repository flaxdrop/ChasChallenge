

/*
Step 1: Set Up ThingSpeak Account
Create a free account at ThingSpeak.com
Create a new channel
Set up fields for your sensor data:
Field 1: Temperature
Field 2: Humidity
Field 3: Pressure
Field 4: AQI
Field 5: TVOC
Field 6: ECO2
Field 7: PM1.0
Field 8: PM2.5
Additional fields for PM10 can be added in a second channel if needed
Step 2: Install ThingSpeak Library
In your PlatformIO project, add the ThingSpeak library to your platformio.ini:

mathworks/ThingSpeak@^2.0.0

step 3
Log in to your ThingSpeak account
Open your channel
Go to the "API Keys" tab
Copy the "Channel ID" and "Write API Key"
Replace the placeholders in the code with your actual values:
unsigned long channelID
const char *writeAPIKey
*/

#include <WiFiS3.h>
#include <ThingSpeak.h>
#include <Wire.h>
#include <sps30.h>
#include <SparkFunBME280.h>
#include <SparkFun_ENS160.h>

// WiFi credentials
const char *ssid = "YourWiFiName";
const char *password = "YourWiFiPassword";

// ThingSpeak settings
unsigned long channelID = 0000000;              // REPLACE WITH YOUR CHANNEL ID
const char *writeAPIKey = "YOUR_WRITE_API_KEY"; // REPLACE WITH YOUR WRITE API KEY

// Initialize sensors
BME280 mySensor;
SparkFun_ENS160 myENS;
WiFiClient client;

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

    // Initialize ThingSpeak
    ThingSpeak.begin(client);

    // Initialize BME280
    if (!mySensor.beginI2C())
    {
        Serial.println("BME280 did not connect.");
        while (1)
            ;
    }

    // Initialize ENS160
    if (!myENS.begin())
    {
        Serial.println("ENS160 did not connect.");
        while (1)
            ;
    }
    myENS.setOperatingMode(SFE_ENS160_STANDARD);

    // Initialize SPS30
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
    // Check WiFi connection
    if (WiFi.status() != WL_CONNECTED)
    {
        Serial.println("WiFi disconnected. Reconnecting...");
        connectToWiFi();
    }

    // Read sensor data
    float temperature = mySensor.readTempC();
    float humidity = mySensor.readFloatHumidity();
    float pressure = mySensor.readFloatPressure() / 100.0; // Convert to hPa

    // Set temperature compensation for better air quality readings
    myENS.setTempCompensation(temperature);
    myENS.setHumidityCompensation(humidity);

    // Read air quality data
    int aqi = myENS.getAQI();
    int tvoc = myENS.getTVOC();
    int eco2 = myENS.getECO2();

    // Read particulate matter data
    struct sps30_measurement particulates;
    uint16_t data_ready;
    float pm1 = 0, pm2_5 = 0, pm10 = 0;

    if (sps30_read_data_ready(&data_ready) == 0 && data_ready)
    {
        if (sps30_read_measurement(&particulates) == 0)
        {
            pm1 = particulates.mc_1p0;
            pm2_5 = particulates.mc_2p5;
            pm10 = particulates.mc_10p0;
        }
        else
        {
            Serial.println("Failed to read SPS30");
        }
    }

    // Print sensor data to serial
    Serial.println("-------------------------------------");
    Serial.print("Temperature: ");
    Serial.print(temperature);
    Serial.println(" °C");
    Serial.print("Humidity: ");
    Serial.print(humidity);
    Serial.println(" %");
    Serial.print("Pressure: ");
    Serial.print(pressure);
    Serial.println(" hPa");
    Serial.print("Air Quality Index: ");
    Serial.println(aqi);
    Serial.print("TVOC: ");
    Serial.print(tvoc);
    Serial.println(" ppb");
    Serial.print("eCO2: ");
    Serial.print(eco2);
    Serial.println(" ppm");
    Serial.print("PM1.0: ");
    Serial.print(pm1);
    Serial.println(" μg/m³");
    Serial.print("PM2.5: ");
    Serial.print(pm2_5);
    Serial.println(" μg/m³");
    Serial.print("PM10: ");
    Serial.print(pm10);
    Serial.println(" μg/m³");

    // Set the fields with our values
    ThingSpeak.setField(1, temperature);
    ThingSpeak.setField(2, humidity);
    ThingSpeak.setField(3, pressure);
    ThingSpeak.setField(4, aqi);
    ThingSpeak.setField(5, tvoc);
    ThingSpeak.setField(6, eco2);
    ThingSpeak.setField(7, pm1);
    ThingSpeak.setField(8, pm2_5);

    // Additional PM10 data can be sent to a second channel if needed
    // or you can alternate between different sets of data

    // Write to ThingSpeak
    int status = ThingSpeak.writeFields(channelID, writeAPIKey);

    if (status == 200)
    {
        Serial.println("ThingSpeak update successful");
    }
    else
    {
        Serial.print("ThingSpeak error: ");
        Serial.println(status);
    }

    // ThingSpeak free accounts have a 15-second update limit
    delay(15000);
}
/*


ThingSpeak has a built-in feature called "ThingSpeak React" that can trigger an action when new data is received:

Set up a React:

Go to Apps → ThingHTTP
Create a new ThingHTTP app
Configure it to make HTTP requests to your server:
Name: ForwardToMyServer
URL: http://your-server-domain.com/api/data
Method: POST
Body: Custom content using ThingSpeak variables (example below)
Save the ThingHTTP app
Create React Trigger:

Go to Apps → React
Create a new React
Configure the React to:
Check for new data in your channel
When new data is added, trigger the ThingHTTP app
Set the frequency (can be every update)
ThingHTTP Body Example:

{
  "timestamp": [[TimeStamp]],
  "temperature": [[Channel.Field1]],
  "humidity": [[Channel.Field2]],
  "pressure": [[Channel.Field3]],
  "aqi": [[Channel.Field4]],
  "tvoc": [[Channel.Field5]],
  "eco2": [[Channel.Field6]],
  "pm1": [[Channel.Field7]],
  "pm2_5": [[Channel.Field8]]
}


*/