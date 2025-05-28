## 2025-05-27 18:30
### Backend

#### Added: POST /logout endpoint
- Users can now sign out via `POST /logout`
- On sign-out, the JWT token is added to the database blacklist to prevent reuse

#### Updated: JWT authentication now checks blacklist
- JWT tokens are checked against the `blacklist` table before being accepted
- Blacklisted tokens are rejected with a 401 Unauthorized error

## 2025-05-23 
### Backend 
#### Authentication & Authorization
- Implemented user registration and login with password hashing (bcrypt)
- Added JWT authentication middleware to protect API routes
- Introduced role-based access control with middleware for admin and user roles
- Applied authorization selectively: public, authenticated, and admin-only endpoints
- Added .env option `UNSAFE_ALLOW_MISSING_AUTHENTICATION=YES` to bypass auth for dev/testing

#### API Routes & Refactoring
- Refactored sensor and measurement routes to support proper auth layers
#### Documentation
- Documented API endpoints with Swagger, including auth-related tags
