/**
 * @file TraficLight.h
 * @brief Styr en trafikljusliknande indikator med en MQ-2 gassensor och lysdioder.
 */

#ifndef TRAFICLIGHT_H
#define TRAFICLIGHT_H

#include <Arduino.h>

/// @brief MQ-2 sensor på analog pin A0
#define MQ2_PIN A0

/// @brief Röd LED (indikerar farligt gasvärde)
#define RED_LED A3

/// @brief Grön LED (indikerar säkert luftvärde)
#define GREEN_LED A1

/// @brief Gul LED (indikerar ett lågt nivå farligt gasvärde)
#define YELLOW_LED A2

/**
 * @brief Initierar sensorer och seriell kommunikation.
 */
void setup()
{
    pinMode(RED_LED, OUTPUT);
    pinMode(GREEN_LED, OUTPUT);
    pinMode(YELLOW_LED, OUTPUT);
    Serial.begin(9600);
}

/**
 * @brief Loop som läser av sensorns värde och styr lysdioderna baserat på gasnivån.
 */
void loop()
{
    float sensorValue = analogRead(MQ2_PIN);
    Serial.print("\nSensor value: ");
    Serial.print(sensorValue);

    /**
     * @brief Styr lysdioderna baserat på det uppmätta sensorvärdet.
     *
     * Om värdet är >450 aktiveras röd LED (hög gasnivå).
     * Om värdet är >378 aktiveras gul LED (låg gasnivå).
     * Annars aktiveras grön LED (säker luft).
     */
    if (sensorValue > 450)
    {
        digitalWrite(RED_LED, HIGH);
        digitalWrite(GREEN_LED, LOW);
        digitalWrite(YELLOW_LED, LOW);
        Serial.println(" | High level gas detected!");
    }
    else if (sensorValue > 378)
    {
        digitalWrite(YELLOW_LED, HIGH);
        digitalWrite(RED_LED, LOW);
        digitalWrite(GREEN_LED, LOW);
        Serial.println(" | Low level gas detected!");
    }
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
