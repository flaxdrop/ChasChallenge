## ENV
Alla alternativ:
```
PORT=3000
DATABASE_URL= postgresql://-adress
JWT_SECRET= JWT secret här.
NODE_ENV=deploy eller dev
UNSAFE_ALLOW_MISSING_AUTHENTICATION=NO
```

### PORT
Port servern körs på. Förval 3000.
### DATABASE_URL
Adress till databasen. En address som börjar med postgresql: och innehåller informationen för att ansluta.
### JWT_SECRET
En hemlighet som behövs för att jwt autentisering ska fungera.
### NODE_ENV
Kan vara dev eller deploy. Säger vilket läge servern sa köras i. Funktionaliteten är samma i båda, med dev tillåter alternativ med UNSAFE att användas. Förval deploy.
### UNSAFE_ALLOW_MISSING_AUTHENTICATION
Värden: YES NO. Förval NO. Allt annat än YES med stora bokstäver slår av funktionen. 

Tillåter requests helt utan authentizaion header att utföras. User roll sätts till admin. Till för att kunna införa autentisering stegvis under utvecklingsarbetet. Bör ej användas i produktion.

Requests med Authorization header och jwt-token valideras fortfarande och kan nekas.
