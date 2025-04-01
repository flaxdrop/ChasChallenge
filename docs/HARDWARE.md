# Hardware

I detta dokument hittar du all hårdvara som används i projekten, samt en kort förklaring av deras funktion.

## Hårdvaru-lista:

### Mikrokontroller:
* Arduino UNO REV 4 WiFi

### Sensorer:
* SparkFun ENS160/BME280 Environmental Combo Breakout
* SPS30 Particulate Matter (PM) sensor
* MQ2 Gas sensor

### Ytterligare komponenter:
* LED-trafikljusmodul 


## Förklaring av hårdvara:

### Arduino UNO REV 4 WiFi
En mikrokontroller från Arduino. Används för att programmera de olika komponenterna, styra deras beteende samt förse de med ström. Har bland annat inbyggd WiFi funktionalitet, så väl som en QWIIC-anslutning.

För ytterligare information kan du besöka Arduinos hemsida. [Länk till Arduino UNO REV 4 WiFi hos Arduino](https://docs.arduino.cc/hardware/uno-r4-wifi/)

## Sensorer:

### SparkFun ENS160/BME280 Environmental Combo Breakout
Komponenten är egentligen en kombination av två olika sensorer, *ENS160* och *BME280*.

#### ENS160
* Beräknar luftkvaliteten inomhus med standardiserade skalan *AQI (Air Quality Index)* från 5 till 1, därav 1 innebär bästa luftkvaliteten.
* Läser av *TVOC (Total Volatile Organic Compounds)* i form av måttet *ppb (Parts Per Billion)*, ju lägre ppb värdet desto färre VOC (Volatile Organic Compounds) finns i luften. 
* Utifrån ppb värdet av TVOC beräknas även *eCO2 (equivalent Carbon Dioxide)*, som är uppskattade mängden koldioxid i luften.
* Utöver att läsa av TVOC producerar även ENS160s *MOX (Metal Oxide)* sensorer råa värden i *ohms (Ω)*, som kan användas för att exemepelvis räkna ut andra värden i kombination med andra sensorer.

#### BME280
* Räknar ut lufttryck genom *hPa* eller *Pa (hectoPascal / Pascal)*.
* Beräknar Temperatur i *°C (Celcius)*, med en räckvid mellan -40°C och +85°C.
* Luftens fuktighet beräknas i *RH (Relative humidity)*, som sträcker sig mellan 0-100%.

### SPS30 Particulate Matter (PM) sensor
Mäter *PM (Particulate Matter)* koncentrationen i luften genom laserbaserad ljusspridning.
PM består av ett flertal kategorier baserat på storlek i *µm (Mikrometer). 

SPS30 Upptäcker och avläser följande PM.
#### PM1.0
* Partiklar med ett mått av ≤ 1 µm.
* Består av ultrafina partiklar såsom de från avgaser.

#### PM2.5 
* Partiklar med ett mått av ≤ 2.5 µm.
* Består av exempelvis rök, sot, mindre pollen.

#### PM4.0
* Partiklar med ett mått av ≤ 4 µm.
* Kan bestå av större eller mindre material från övriga PM kategorier, exempelvis sot eller damm.

#### PM10
* Partiklar med ett mått av ≤ 10 µm.
* Består av bland annat damm, större sporer eller pollen.

För varje PM kategori räknar SPS30 sensor ut ett *masskoncentration* och *partikelantal* värde.

#### Masskoncentration
* Måttvärdet är *mikrogram per kubikmeter (µg/m³)*.
* Masskoncentrationen informerar om den sammanlagda vikten av partiklar inom en kvadratmeter volym luft. 
* Desto högre masskoncentrations värde, desto fler partiklar finns i utrymmet. 

#### Partikelantal 
* Måttvärdet är *antal partiklar per kubikcentimeter (#/cm³)*. **NOTE:** # är en fortkortning av *antal partiklar*.   
* Informerar om tätheten och antalet partiklar inom ett utrymme, men inte deras storlek.

