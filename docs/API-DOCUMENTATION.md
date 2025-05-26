### Available endpoints

#### Public Endpoints

##### POST /register

- Create a new user

##### POST /login

- Login and receive a JWT token

##### GET /measurements

- Retrieves all measurement values

  - Parameters:

    - `types` - comma-separated types. E.g. /temperature, /humidity, /aqi, etc
    - `?limit=INT` - to limit the number of returned measurements. E.g. /aqi/?limit=10

##### GET /measurements/{types}

- Retrieves specific types of measurements (e.g. /measurements /temperature /humidity)

  - Available types:
    - temperature
    - humidity
    - pressure
    - aqi
    - tvoc
    - eco2
    - pm1
    - pm2_5
    - pm4
    - pm10
    - nc_0_5
    - nc_1_0
    - nc_2_5
    - nc_4_0
    - nc_10_0
    - typical_particle_size

##### GET /sensors

- Get a list of all added sensors

##### GET /sensors/{id}

- Find a sensor by id

##### GET /about

- About page

---

#### User Endpoints (require authentication)

##### GET /profile

- Get user details (authenticated user)

##### DELETE /profile/delete

- Delete user account (authenticated user)

---

#### Sensor Endpoints

##### PATCH /sensors/{id}

- Replace part of the sensor information by id (e.g. statuscode)

---

#### Admin Endpoints (require admin role)

##### GET /admin/users

- Get all users

##### PATCH /admin/users/{id}/role

- Update user role to 'admin' or 'user'

##### POST /sensors

- Create a new sensor

##### PUT /sensors/{id}

- Replace all sensor information by id

##### POST /measurements/delete

- Delete measurements based on time interval

---
