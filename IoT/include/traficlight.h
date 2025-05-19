#ifndef TRAFICLIGHT_H
#define TRAFICLIGHT_H
#include <Arduino.h>

#define MQ2_PIN A0    // MQ-2 sensor på analog pin A0
#define RED_LED A3    // Röd LED (dålig luft/gas)
#define GREEN_LED A1  // Grön LED (bra luft)
#define YELLOW_LED A2 // Yellow LED (låg nivå dålig luft/gas)

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

    //  Farligt värde
    if (sensorValue > 450)
    {
        digitalWrite(RED_LED, HIGH);
        digitalWrite(GREEN_LED, LOW);
        digitalWrite(YELLOW_LED, LOW);
        Serial.println(" | High level gas detected!");
    }
    // Mellan värde
    else if (sensorValue > 378)
    {
        digitalWrite(YELLOW_LED, HIGH);
        digitalWrite(RED_LED, LOW);
        digitalWrite(GREEN_LED, LOW);
        Serial.println(" | Low level gas detected!");
    }
    // Säkert värde
    else
    {
        digitalWrite(RED_LED, LOW);
        digitalWrite(GREEN_LED, HIGH);
        digitalWrite(YELLOW_LED, LOW);
        Serial.println(" | No gas detected!");
    }
    delay(1000); // Vänta en sekund innan nästa mätning
}

#endif