## ENV

All options:

```
PORT=3000
DATABASE_URL=postgresql://<address>
JWT_SECRET=your_jwt_secret_here
NODE_ENV=deploy or dev
UNSAFE_ALLOW_MISSING_AUTHENTICATION=NO
```

### PORT

The port the server runs on. Default is 3000.

### DATABASE_URL

The address to the database. Should start with postgresql: and contain the information needed to connect.

### JWT_SECRET

A secret required for JWT authentication to work.

### NODE_ENV

Can be either dev or deploy. Specifies which mode the server should run in. Functionality is the same in both, but dev allows the UNSAFE option to be used. Default is deploy.

### UNSAFE_ALLOW_MISSING_AUTHENTICATION

Values: YES or NO. Default is NO. Anything other than YES (in uppercase) disables the feature.

Allows requests without an authentication header to be executed. The user role is set to admin. Intended for gradually introducing authentication during development. Should not be used in production.

Requests with an Authorization header and JWT token are still validated and can be denied.
