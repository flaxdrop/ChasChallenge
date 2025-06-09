#ifndef TRAFFICLIGHT_H
#define TRAFFICLIGHT_H
#include <Arduino.h>

#define MQ2_PIN A0    // MQ-2 sensor on analog pin A0
#define RED_LED A3    // Red LED (bad air/gas)
#define GREEN_LED A1  // Green LED (good air)
#define YELLOW_LED A2 // Yellow LED (low level bad air/gas)

void setup()
{
    pinMode(RED_LED, OUTPUT);
    pinMode(GREEN_LED, OUTPUT);
    Serial.begin(9600);
}

void loop()
{
    float sensorValue = analogRead(MQ2_PIN);
    Serial.print("\nSensor value: ");
    Serial.print(sensorValue);

    // Dangerous level
    if (sensorValue > 450)
    {
        digitalWrite(RED_LED, HIGH);
        digitalWrite(GREEN_LED, LOW);
        digitalWrite(YELLOW_LED, LOW);
        Serial.println(" | High level gas detected!");
    }
    // Medium level
    else if (sensorValue > 378)
    {
        digitalWrite(YELLOW_LED, HIGH);
        digitalWrite(RED_LED, LOW);
        digitalWrite(GREEN_LED, LOW);
        Serial.println(" | Low level gas detected!");
    }
    // Safe level
    else
    {
        digitalWrite(RED_LED, LOW);
        digitalWrite(GREEN_LED, HIGH);
        digitalWrite(YELLOW_LED, LOW);
        Serial.println(" | No gas detected!");
    }
    delay(1000); // Wait one second before next reading
}

#endif
