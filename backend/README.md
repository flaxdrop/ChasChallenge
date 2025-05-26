# ChasChallenge_Backend

Backend for our Chas Challenge

## Start the server in development mode

### Environment Variables

1. Create a file named ".env" in /backend/.env
2. Add the following:

- PORT=3000
- DATABASE_URL='YOUR_DATABASE_URL'
- JWT_SECRET='YOUR_JWT_SECRET'
- NODE_ENV=dev / deploy
- UNSAFE_ALLOW_MISSING_AUTHENTICATION=YES / NO

See [docs/env.md](docs/env.md) for all env options.

### Installation

- Run in a separate terminal:

1. cd backend
2. npm install
3. npm run dev

The API will now be running at: http://localhost:3000

### API also available at: https://chaschallenge-backend.onrender.com/

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

## Folder Structure

### src/:

#### config/:

- `index.js` - Handles environment variables and configuration

#### controllers/:

- Controller files for handling business logic (users, sensors, etc.)

#### middleware/:

- Middleware for authentication and authorization

#### routes/:

- `measurementsRoutes.js` - Handles all measurement-related endpoints
- `sensorsRoutes.js` - Handles sensor management endpoints
- `protectedRoutes.js` - Routes protected by authentication
- `apiDocs.js` - API documentation (Swagger)
- `adminRoutes.js` - Admin-specific endpoints
- `publicRoutes.js` - Publicly accessible routes
- `userRoutes.js` - User-related endpoints

#### utils/:

- `measurementsService.js` - Service for handling measurement data
- `sensors.js` - Service for handling sensor data
- `db.js` - Database connection and management
- `sqlHelpers.js` - Helper functions for SQL queries

#### server.js:

- Main file to start the server and define middleware and routes
