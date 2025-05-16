#ifndef TRAFICLIGHT_H
#define TRAFICLIGHT_H
#include <Arduino.h>

#define MQ2_PIN A0   // MQ-2 sensor på analog pin A0
#define RED_LED A3   // Röd LED (dålig luft/gas)
#define GREEN_LED A1 // Grön LED (bra luft)

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

    if (sensorValue > 450)
    { // Om gasnivån är hög
        digitalWrite(RED_LED, HIGH);
        digitalWrite(GREEN_LED, LOW);
        Serial.println(" | Gas detected!");
    }
    else
    { // Ingen farlig gas
        digitalWrite(RED_LED, LOW);
        digitalWrite(GREEN_LED, HIGH);
    }

    delay(1000); // Vänta en sekund innan nästa mätning
}

#endif