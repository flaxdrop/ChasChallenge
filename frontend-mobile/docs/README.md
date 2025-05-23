# AirAware - mobile application

## Project description and features
    This is a mobile app that presents environment data from sensors connected to an arduino unit via Next.js backend.

## Figma design
[Figma Prototype Link](https://www.figma.com/design/zgqiK0v3QNgXFoYyZLTjyT/AirAware?node-id=0-1&p=f&t=86vQwL5EpQnTgC2I-0)

## Installation

## How to run the app with Expo Go:

Skapa en .env-fil i /frontend-mobile/.
Lägg till "EXPO_PUBLIC_RENDER_URL=https://chaschallenge-backend.onrender.com" i den.

Ladda ner appen Expo Go från en appstore,
Gå in i main branchen på repot och skriv "cd frontend-mobile" i terminalen,
i terminalen: npm install,
i terminalen: npx expo start,

Öppna upp expo go på mobilen och scanna QR-koden som dyker upp i terminalen. Ifall expo inte kommer åt appen, prova att starta med "npx expo start --tunnel"

## Required dependencies

## Project folder structure
```plaintext
frontend-mobile/
|- assets/
|- components/          # Reusable components
|- docs/                # Documentation
|- screens/             # Screen components
|- tests/               # Test files for the application
|- App.js               # Main application
|- app.json             # Project settings
|- index.js             # ---
|- package-lock.json    # Locked dependencies for npm
|- package.json         # Project dependencies
