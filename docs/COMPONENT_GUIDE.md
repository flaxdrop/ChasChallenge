# Component Guide

Här kan du hitta korta beskrivningar och länkar till resurser över viktiga variabler, funktioner eller klasser som tillhör de olika komponenterna. 

## BME280

### Funktioner

Detta bibliotek gör det möjligt för användaren att:

- Läsa av tryck i Pa  
- Läsa av temperatur i °C  
- Läsa av luftfuktighet i %RH  

### Matematiska funktioner

Biblioteket innehåller även följande matematiska funktioner baserade på ovanstående:

- Läsa av temperatur i °F  
- Läsa av höjd i meter  
- Läsa av höjd i fot

### Informationskällor

- [BME280 - Datablad (PDF)](https://www.electrokit.com/upload/product/41020/41020823/BST-BME280_DS001-10.pdf)  
- [SparkFun BME280 Arduino-bibliotek (GitHub)](https://github.com/sparkfun/SparkFun_BME280_Arduino_Library)

## ENS160


## SPS30
Sensorhårdvara (SPS30)

SPS är en finpartikelsenor från sensirion som använder laserspridning för att mäta PM1.0, PM2.5, PM4 och PM10 i realtid.

- Sensorkomponenter och Funktioner

Komponent / Funktion	Beskrivning
- start_measurement()	Startar en aktiv mätcykel
- stop_measurement()	Stoppar mätningen
- read_data()	Hämtar partikeldata från sensorn
- get_serial_number()	Returnerar unikt serienummer
- perform_fan_cleaning()	Initierar rengöring av sensorfläkten
- heck_data_ready()	Kontrollerar om ny data finns tillgänglig

### Informationskällor
- SPS30 - Datablad (PDF) https://eu.mouser.com/datasheet/2/682/Sensirion_PM_Sensors_Datasheet_SPS30-3539491.pdf

- SPS30 - bibliotek https://github.com/Sensirion/arduino-sps

## MQ2


