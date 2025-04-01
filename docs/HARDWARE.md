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

För ytterligare information kan du besöka Arduinos hemsida. (Länk till Arduino UNO REV 4 WiFi hos Arduino)[https://docs.arduino.cc/hardware/uno-r4-wifi/]

## Sensorer:

### SparkFun ENS160/BME280 Environmental Combo Breakout
Komponenten är egentligen en kombination av två olika sensorer, *ENS160* och *BME280*.

#### ENS160
* Beräknar luftkvaliteten inomhus med standardiserade skalan *AQI (Air Quality Index)* från 5 till 1, därav 1 innebär bästa luftkvaliteten.
* Läser av *TVOC (Total Volatile Organic Compounds)* i form av måttet *ppb (Parts Per Billion)*, ju lägre ppb värdet desto färre VOC (Volatile Organic Compounds) finns i luften. 
* Utifrån ppb värdet av TVOC beräknas även *eCO2 (equivalent Carbon Dioxide)*, som är uppskattade mängden koldioxid i luften.
