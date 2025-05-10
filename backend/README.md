# ChasChallenge_Backend

Backend for our Chas Challenge

## Installation

### Miljövariabel

- Skapa filen ".env" i /backend/_här_, lägg till texten: PORT=3000, samt URL för databas.

- Kör i en separat terminal:

1. cd .\backend
2. npm install
3. npm run dev

API:t körs nu på: http://localhost:3000

### API även på: https://chaschallenge-backend.onrender.com/

### Tillgängliga endpoints

Alla endpoints stödjer query parameter `?limit=INT` för att begränsa antalet returnerade mätningar.

#### GET /measurements

- Hämtar samtliga mätvärden

#### GET /measurements/:types

- Hämtar specifika typer av mätningar
- Parametrar:
  - `types`: kommaseparerade typer (t.ex. temperature,humidity,aqi)
- Tillgängliga typer:
  - temperature
  - humidity
  - pressure
  - aqi
  - tvoc
  - eco2

#### GET /BME280

- Hämtar temperatur, luftfuktighet och tryck

#### GET /ENS160

- Hämtar alla luftkvalitetsvärden (AQI, TVOC, eCO2)

## Mappstruktur

### src/:

#### config/:

- `index.js` - Hanterar miljövariabler och konfiguration

#### routes/:

- `measurementsRoutes.js` - Hanterar alla mätvärden
- `bme280Routes.js` - Hanterar BME280-sensorn (temperatur, luftfuktighet, tryck)
- `ens160Routes.js` - Hanterar ENS160-sensorn (luftkvalitet)
- `addDataRoutes.js` - Hanterar datainsamling
- `apiRoutes.js` - Huvudrutter för API:et
- `api-docs` - API dokumentation

#### utils/:

- `measurementsService.js` - Service för att hantera mätvärden
- `db.js` - Databashantering

#### server.js:

- Huvudfilen för att starta servern och definiera middleware och rutter
