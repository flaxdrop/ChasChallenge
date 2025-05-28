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

API also available at: https://chaschallenge-backend.onrender.com/

### Available endpoints

- https://chaschallenge-backend.onrender.com/api-docs

## Folder Structure

### src/:

#### config/:

- `index.js` - Handles environment variables and configuration

#### controllers/:

- `usersController.js` - Handles user-related business logic
- `tokenController.js` - Handles token-related logic
- `sensorsController.js` - Handles sensor-related business logic

#### middleware/:

- `checkUserExists.js` - Middleware to check if a user exists
- `validateRegisterInput.js` - Middleware to validate registration input
- `auth/` - Authentication-related middleware:
  - `signOut.js` - Handles user sign out
  - `authenticateJWT.js` - JWT authentication middleware
  - `authorizeRole.js` - Role-based authorization middleware
  - `validateUserLogin.js` - Validates user login

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
- `clearOldBlacklistRecords.js` - Utility to clear old blacklist records
- `users.js` - Utility functions for users

#### scripts/:

- `runCleanup.js` - Script to run cleanup tasks

#### jobs/:

- `blacklistCleanup.js` - Job for cleaning up blacklist records

#### server.js:

- Main file to start the server and define middleware and routes
