## Gruppnamn : SyntaxSquad
## Deltagare : 1. Alexander Arvidson 2. John Collinder 3. Robert Bagunda 4. Jesper Olsson 5. Benjamin Stenlund 6. Emanuela Aseidu 7. Erik Torres Puente
## Kodnamn för produkten : AirAware

- [Introduktion](#introduktion)
- [Val av teknologi och arkitektur](#val-av-teknologi-och-arkitektur)
- [Teamstruktur och ansvarsområden](#teamstruktur-och-ansvarsområden)
- [Minimikrav för slutprodukten](#minimikrav-för-slutprodukten)
- [Tidsplan och milstolpar](#tidsplan-och-milstolpar)
- [Problemhantering](#problemhantering)
- [Lista av hårdvara som kan behövas, Framförallt sensorer](#lista-av-hårdvara-som-kan-behövas-framförallt-sensorer)

### Introduktion : I dagens samhälle blir luftkvalitet en allt viktigare aspekt av vår hälsa och välmående. Dålig inomhusluft kan påverka vår koncentration, produktivitet och långsiktiga hälsa, och därför är det av stor vikt att vi har möjlighet att mäta och övervaka luftkvaliteten där vi spenderar mest tid – i hemmet och på kontoret.

Vårt projekt syftar till att utveckla en smart produkt som kontinuerligt övervakar luftkvaliteten och ger användaren realtidsinformation om olika miljöfaktorer, såsom koldioxidnivåer, flyktiga organiska föreningar (VOC), partikelkoncentrationer (PM2.5 och PM10), temperatur och luftfuktighet. Genom att använda en kombination av sensorer och en användarvänlig app eller webbgränssnitt, kan användaren få detaljerad insikt i den inomhusluft de andas och vidta åtgärder för att förbättra miljön när det behövs.

Vår produkt kommer att vara enkel att använda och installera, och syftet är att skapa en hälsosammare och mer produktiv inomhusmiljö. Vi tror att detta verktyg kan hjälpa både privatpersoner och kontor att ta kontroll över sin inomhusmiljö, vilket leder till bättre luftkvalitet, ökad trivsel och hälsa.

Denna produktplan beskriver de tekniska specifikationerna, användarflödet och de resurser som krävs för att utveckla vår luftkvalitetsmonitor, från sensorval och hårdvarudesign till apputveckling och marknadsföring.

## Val av teknologi och arkitektur: (exempel)
- Frontend – Användargränssnitt Mobilapp : React Native
- Backend – Server och API : Node.js
- IoT – Sensorer, Mikrokontroller och Kommunikation : Arduino
- Databas- och API-struktur : MongoDB, PostgreSQL.

## Teamstruktur och ansvarsområden. Mål och funktioner per klass
Frontend (Frontendutvecklare)
● Mobilapp för användare
○ Dashboard som visar realtidsdata om luftkvalitet, temperatur och luftfuktighet.
○ Notifikationer vid dålig luftkvalitet eller hög luftfuktighet (ex. risk för mögel).
○ Manuell styrning av ventilationen och val av önskade luftkvalitetsinställningar.
○ Historisk data och trendanalys för att identifiera luftkvalitetsmönster.
○ Integrering med smarta hem-system (ex. Google Home, Home Assistant).

Backend (Fullstackutvecklare)
● Datainsamling och analys:
○ Insamling av data från IoT-sensorer som mäter luftkvalitet och
klimatparametrar.
○ Algoritmer för att analysera luftkvalitet och generera rekommendationer.
○ Lagring av historiska mätvärden för att analysera luftkvalitetsförändringar.
○ Realtidsuppdateringar via WebSockets för smidig dataöverföring till appen.
● Säkerhet och systemintegration
○ Autentisering av användare för personlig konfiguration.
○ API för att styra smart ventilation baserat på användarens inställningar.
○ Integration med externa system såsom väderdata för att justera ventilation vid
externt höga föroreningar.

Inbyggda system (Systemutvecklare)
● IoT-sensorer och smart kommunikation:
○ Sensorer för luftkvalitet (CO2, partiklar, VOC), temperatur och luftfuktighet.
○ Kommunikation via WiFi, Bluetooth eller Zigbee för att interagera med
mobilappen.
○ Möjlighet att koppla till befintliga smarta hem-system (ex. Google Home,
Apple HomeKit).
○ Låg strömförbrukning och energieffektiv design för batteridriven drift.
● Automatiserad ventilationskontroll:
○ Luftflödereglering baserat på sensordata.
○ Integration med ventilationen i hemmet för att förbättra luftflödet.
○ Failsafe-lösning för att säkerställa att systemet fungerar även vid
nätverksbortfall.


## Minimikrav för slutprodukten
För att slutprodukten ska vara fullt funktionell och användbar bör de minimikrav som ställs inkludera:

- Sensorövervakning av luftkvalitet (CO2, VOC, PM2.5/PM10) samt temperatur och luftfuktighet.
- Real-time datauppdatering och visning via en användarvänlig webb- eller mobilapp.
- Larmfunktioner och varningar baserat på användardefinierade tröskelvärden.
- Databaslagring och historik för att visa data över tid.
- Säker dataöverföring och användarautentisering vid behov.
- Genom att uppfylla dessa krav kommer er produkt att vara användbar, pålitlig och lättanvänd för att mäta och övervaka luftkvaliteten i hemmet eller på kontoret.

## Tidsplan och milstolpar
- Vecka 1: Planering, krav och design.
- Vecka 2: Hårdvaruuppbyggnad och prototyp.
- Vecka 3: Mjukvaruutveckling (app/webb).
- Vecka 4: Integration och testning.
- Vecka 5: Förbättringar och felsökning.
- Vecka 6: Sluttestning och optimering.
- Vecka 7: Marknadsföring och presentation.
- Vecka 8: Dokumentation och avslutning.

## Problemhantering
Alla ska vara medvetna att saker kommer gå fel, och det viktigaste är att försöka möta problemen på rätt sätt. Så länge alla försöker sitt bästa så kommer saker att lösa sig. Kommunikation är viktigast.


## Lista av hårdvara som kan behövas, Framförallt sensorer.
1. CO2-sensor – För att mäta koldioxidkoncentration.
2. VOC-sensor – För att mäta flyktiga organiska föreningar.
3. PM-sensor – För att mäta partiklar i luften (PM2.5 och PM10).
4. Temperatur- och fuktighetssensor – För att mäta och ge kontext till luftens fysiska egenskaper.
5. Ozon-sensor – För att mäta ozon (O₃) koncentration.
6. Lufttryckssensor – För att mäta trycket, vilket kan påverka ventilationen.
7. NO2-sensor – För att mäta kvävedioxid i luften.
8. DHT11 temperatur- och fuktighetssensormodul
9. Ljudsensormodul
10. GY-68 BMP180 barometer- och temperatursensormodul

# Teknologi är framförallt Arudino.

# Verktyg kommer framförallt vara : Discord, Github, Slack, TinkerCAD, VS Code.
