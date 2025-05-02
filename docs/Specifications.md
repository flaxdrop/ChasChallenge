# Programvarukravsspecifikation (SRS) - AirAware

## 1. Inledning

### 1.1 Syfte
AirAware är en smart luftkvalitetsmonitor som mäter och analyserar luftkvaliteten i realtid. Systemet består av en IoT-enhet baserad på Arduino som samlar in miljödata och skickar den till en molnbaserad backend. Användare kan interagera med systemet genom en mobilapp byggd i React Native.

### 1.2 Målgrupp
Denna kravspecifikation riktar sig till utvecklingsteamet (SyntaxSquad), projektledare och andra intressenter som behöver en tydlig beskrivning av systemets funktioner och tekniska krav.

### 1.3 Systemöversikt
AirAware består av tre huvudkomponenter:
- **Hårdvara:** Arduino-baserad IoT-enhet med sensorer.
- **Backend:** Node.js-server med en databas (MongoDB/PostgreSQL) för lagring och analys.
- **Frontend:** Mobilapp i React Native för att visa data och ge notifieringar.

## 2. Funktionella krav

### 2.1 Sensordata
- Systemet ska kunna mäta och lagra temperatur, luftfuktighet, luftpartiklar (PM2.5, PM10), CO2-halter och VOC-nivåer.
- Data ska samlas in kontinuerligt och skickas till backend för bearbetning.
- Användare ska kunna se realtidsdata i appen.

### 2.2 Användarhantering
- Användare ska kunna registrera och logga in med e-post och lösenord.
- Roller: Admin och vanliga användare.

### 2.3 Notifieringar
- Systemet ska skicka push-notiser vid kritiska luftkvalitetsnivåer.
- Användare ska kunna anpassa sina notifieringsinställningar.

### 2.4 Historisk data och analys
- Användare ska kunna se historiska mätningar och analysera trender.
- Data ska kunna visas i grafer och tabeller.

## 3. Icke-funktionella krav

### 3.1 Prestanda
- Systemet ska kunna hantera minst 1000 samtidiga användare.
- Sensordata ska uppdateras med max 5 sekunders fördröjning.

### 3.2 Skalbarhet
- Backend ska vara byggt för att enkelt kunna utökas vid behov.
- Databasen ska optimeras för stora datamängder.

### 3.4 Kompatibilitet
- Mobilappen ska fungera på både iOS och Android.
- Backend ska vara kompatibel med både MongoDB och PostgreSQL.

## 4. Systemarkitektur

### 4.1 Hårdvarukomponenter
- Arduino Uno Rev 4

### 4.2 Programvarustack
- **Frontend:** React Native
- **Backend:** Node.js med Express
- **Databas:** MongoDB/PostgreSQL
- **Hårdvarunära programmering:** C++ (Arduino IDE)

## 5. Begränsningar
- Sensornoggrannhet beror på fysiska faktorer som temperatur och luftfuktighet.
- Systemet kräver internetuppkoppling för att fungera optimalt.

## 6. Framtida utveckling
- Integrering med smarta hem-system (t.ex. Google Home, Apple HomeKit).
- AI-baserad analys för förutsägelse av luftkvalitet.
- API för tredjepartsintegrationer.

---
Detta dokument beskriver de grundläggande kraven för AirAware och kan uppdateras allteftersom projektet utvecklas.


