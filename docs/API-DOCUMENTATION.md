## För frontend

### Miljövariabel

- Skapa filen ".env" i /backend/_här_, lägg till texten:

```
PORT=3000
DATABASE_URL='[postgress-db-urlhere]'
NODE_ENV=dev
UNSAFE_ALLOW_MISSING_AUTHENTICATION=YES
```

- Kör i en separat terminal från frontend:

1. cd .\backend
2. npm install
3. npm run dev

API:t körs nu på: http://localhost:3000

### Available endpoints on Swagger

When the server is running, navigate to url /api-docs
