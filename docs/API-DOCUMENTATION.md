## För frontend

### Miljövariabel

- Skapa filen ".env" i /backend/_här_, lägg till texten: PORT=3000

- Kör i en separat terminal från frontend:

1. cd .\backend
2. npm install
3. npm run dev

API:t körs nu på: http://localhost:3000

### Tillgängliga endpoints

#### GET /all

- Hämtar samtliga mätvärden.

#### GET /all/:id

- Hämtar ett mätvärde med angivet ID.

#### GET /measurements

- Hämtar temperatur, luftfuktighet och tryck.

#### GET /measurements/:id

- Hämtar mätvärden för ett specifikt ID.

#### GET /measurements/temperature

- Endast temperaturvärden.

#### GET /measurements/humidity

- Endast luftfuktighetsvärden.

#### GET /measurements/pressure

- Endast tryckvärden.

#### GET /measurements/:type/:id

- Hämtar mätvärden för ett specifikt ID baserat på mättyp.

#### GET /airquality

- Hämtar alla luftkvalitetsvärden (AQI, TVOC, eCO2).

#### GET /airquality/:id

- Hämtar luftkvalitetsdata för ett specifikt ID.

#### GET /airquality/aqi

- Endast AQI-värden.

#### GET /airquality/tvoc

- Endast TVOC-värden.

#### GET /airquality/eco2

- Endast eCO2-värden.

#### GET /airquality/:type/:id

- Hämtar mätvärden för ett specifikt ID baserat på mättyp.
