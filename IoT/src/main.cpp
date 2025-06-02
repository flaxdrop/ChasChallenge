/**
 * @file main.cpp
 * @author SyntaxSquad (https://github.com/flaxdrop/ChasChallenge)
 * @brief Huvud dokumentet i projektet, filen som innehåller setup() och loop() för Arduino Mikrokontroller
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

// Ditt WiFi-nätverk
/**
 * @brief Namnet på Wifi nätverket som programmet försöker ansluta sig till.
 *
 * Värdet "hidden_ssid" som den kopierar hittar man i secret.h
 *
 */
const char* ssid = hidden_ssid;
/**
 * @brief Lösenordet på Wifi nätverket som programmet försöker ansluta sig till.
 *
 * Värdet "hidden_password" som den kopierar hittar man i secret.h
 *
 */
const char* password = hidden_password;

// Serverinställningar
/**
 * @brief Namnet på backend servern som koden ansluter sig till.
 *
 * Detta är adressen som används för att ansluta till Chas Challenge-backend-API:et.
 * Den används av nätverksmodulen för att skicka och ta emot data.
 */
const char* serverHost = "chaschallenge-backend.onrender.com"; // Ersätt med din server IP
/**
 * @brief Portnummer som används för att ansluta till backend-servern.
 *
 * Standardporten för HTTPS (443) används för att skicka och ta emot data
 * via en säker anslutning till Chas Challenge-backend.
 */
const int serverPort = 443;
/**
 * @brief Sökvägen till endpointen på backend-servern för mätdata.
 *
 * Används av klienten för att skicka eller hämta mätvärden via API:et.
 * Kombineras vanligtvis med serverHost och serverPort för att bygga hela URL:en.
 */
const char* serverPath = "/measurements";
/**
 * @brief Pin-nummer för den röda LED:en på trafikljusmodulen.
 *
 * Standard-värde är D5 på mikrokontrollen.
 */
const int redLedPin = 5;
/**
 * @brief Pin-nummer för den gula LED:en på trafikljusmodulen.
 *
 * Standard-värde är D6 på mikrokontrollen.
 */
const int yellowLedPin = 6;
/**
 * @brief Pin-nummer för den gröna LED:en på trafikljusmodulen.
 *
 * Standard-värde är D7 på mikrokontrollen.
 */
const int greenLedPin = 7;
/**
 * @brief Objekt av BME280-klassen för att läsa temperatur, luftfuktighet och lufttryck.
 *
 * Används för att hämta miljödata inomhus.
 */
BME280 mySensor;
/**
 * @brief ENS160-sensor för luftkvalitetsanalys (AQI, TVOC, eCO2).
 *
 * Används för att indikera luftkvalitet och kompensera med temperatur/humidity.
 */
SparkFun_ENS160 myENS;
/**
 * @brief SSL-krypterad WiFi-klient för HTTPS-kommunikation.
 *
 * Används av HttpClient för att säkert kommunicera med backend-servern.
 */
WiFiSSLClient wifi;
/**
 * @brief HTTP-klient som skickar data till ChasChallenge-backend via POST-request.
 *
 * Använder WiFiSSLClient som transportlager och skickar JSON-data till servern.
 */
HttpClient client = HttpClient(wifi, serverHost, serverPort);
/**
 * @brief Initialiserar systemet och ansluter till sensorer och WiFi.
 *
 * Utför följande steg:
 * - Startar seriekommunikation
 * - Konfigurerar I2C-bussen
 * - Initierar LED-pinnar för luftkvalitetsindikering
 * - Ansluter till WiFi
 * - Initierar sensorerna BME280, ENS160 och SPS30
 */
void setup()
{
    Serial.begin(115200); //Startar Serial monitor 
    Wire1.begin(); // Initierar sekundär I2C-buss (Wire1) som används av BME280 och ENS160 

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
        while (1)
            ;
    }

    if (!myENS.begin(Wire1))
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
/**
 * @brief Huvudloop för att samla in, behandla och skicka mätdata.
 *
 * Utför följande steg i varje iteration:
 * - Läser temperatur, luftfuktighet och lufttryck från BME280
 * - Justerar temperaturkompensation för ENS160
 * - Hämtar luftkvalitetsvärden (AQI, TVOC, eCO2) från ENS160
 * - Styr LED-indikatorerna baserat på AQI
 * - Läser partikeldata från SPS30 om tillgängligt
 * - Formaterar och skickar JSON-payload via en HTTP POST-request
 */
void loop()
{
    /**
     * @brief Lagrar värdet från readTempC() från BME280 klassen
     *
     * Samverkar med String json.
     */
    float temperature = mySensor.readTempC();
    /**
     * @brief Lagrar värdet från readFloatHumidity() från BME280 klassen
     *
     * Samverkar med String json.
     */
    float humidity = mySensor.readFloatHumidity();
    /**
     * @brief Lagrar värdet från readFloatPressure() från BME280 klassen
     *
     * Samverkar med String json.
     */
    float pressure = mySensor.readFloatPressure();

    myENS.setTempCompensation(temperature);
    // myENS.setHumidityCompensation(humidity); // Kommenterad om funktionen ger error

    /**
     * @brief Lagrar värdet från getAQI() från SparkFun_ENS160 klassen
     *
     * Samverkar med String json.
     */
    int aqi = myENS.getAQI();
    /**
     * @brief Lagrar värdet från getTVOC() från SparkFun_ENS160 klassen
     *
     * Samverkar med String json.
     */
    int tvoc = myENS.getTVOC();
    /**
     * @brief Lagrar värdet från getECO2() från SparkFun_ENS160 klassen
     *
     * Samverkar med String json.
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
     * @brief Strukt för att lagra mätdata från SPS30-partikelsensorn.
     *
     * Innehåller information om masskoncentration (μg/m³),
     * antal partiklar per volymenhet, och typisk partikelstorlek.
     * Fylls med data om sps30_read_measurement() lyckas.
     */
    struct sps30_measurement particulates;
    /**
     * @brief Indikerar om SPS30-sensorn har ny mätdata att hämta.
     *
     * Hämtas från sps30_read_data_ready(). Om värdet är 1, finns ny data.
     */
    uint16_t data_ready;
    /**
     * @brief Flagga som anger om giltig SPS30-data kunde hämtas.
     *
     * Sätts till true om både:
     * - sensorn har ny data (data_ready = 1)
     * - och mätdata kunde läsas utan fel (sps30_read_measurement() == 0)
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
            Serial.println("Kunde inte läsa SPS30-data.");
        }
    }

    /**
     * @brief JSON-sträng som innehåller alla insamlade sensorvärden.
     *
     * Byggs upp i loop() och används som payload i POST-förfrågan till backend-servern.
     * Innehåller temperatur, luftfuktighet, tryck, luftkvalitet (AQI, TVOC, eCO2)
     * samt partikeldensiteter om tillgängligt.
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

    /**
     * @brief HTTP-statuskod som returneras av backend-servern efter POST-förfrågan.
     *
     * Exempel: 200 (OK), 400 (Bad Request), 500 (Server Error) osv.
     * Används för att kontrollera om dataskick lyckades.
     */
    int statusCode = client.responseStatusCode();
    /**
     * @brief Svarskroppen från backend-servern i textformat.
     *
     * Innehåller eventuellt felmeddelanden eller bekräftelser från API:et.
     * Används för felsökning och loggning.
     */
    String response = client.responseBody();

    Serial.print("Svar från server: ");
    Serial.println(statusCode);
    Serial.println(response);

    delay(10000); // Vänta 10 sekunder
}
